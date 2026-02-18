
// @ts-nocheck
'use client';
import React, { useRef, useEffect, Children, type ReactNode } from 'react';

// DeckSwipe.js - minimal, dependency-free ES module
class DeckSwipe {
  container: HTMLElement;
  opts: any;
  cards: HTMLElement[] = [];
  dragging: boolean = false;
  pointerId: number | null = null;
  startX: number = 0;
  startY: number = 0;
  translateX: number = 0;
  translateY: number = 0;
  activeCard: HTMLElement | null = null;
  _lastX: number = 0;
  _lastY: number = 0;
  _pointerDown: any;
  _pointerMove: any;
  _pointerUp: any;

  constructor(container: string | HTMLElement, options: any = {}) {
    // container: DOM element or selector
    this.container =
      typeof container === "string"
        ? document.querySelector(container)
        : container;
    if (!this.container) throw new Error("DeckSwipe: container not found");

    const defaults = {
      visible: 3,                // how many cards to style (top n)
      spacing: 16,               // px offset between stacked cards
      scaleStep: 0.04,           // scale reduction per deeper card
      dimStep: 0.12,             // darkness overlay opacity per deeper card
      dragThreshold: 0.25,      // fraction of width to trigger swipe
      animationDuration: 300,    // ms for spring back and move animations
      easing: "cubic-bezier(.22,.9,.35,1)", // animation easing
      rotation: 10,              // max rotation degrees while dragging
      onSwipe: null,             // callback(cardEl, direction) direction: 'left'|'right'|'up'|'down'
      axis: "x",                 // 'x' horizontal or 'y' vertical primary swipe
      preserveOrder: true,       // if true the swiped card moves to back; if false removed
      loop: true                 // when preserveOrder true, loop cards
    };

    this.opts = Object.assign({}, defaults, options);
    this._init();
  }

  static init(container, options) {
    return new DeckSwipe(container, options);
  }

  _init() {
    this.cards = Array.from(this.container.children);
    this.container.style.position = this.container.style.position || "relative";
    this.container.style.touchAction = "none"; // enable pointer dragging
    this._applyStackStyles();
    this._bindEvents();
  }

  _applyStackStyles() {
    const { visible, spacing, scaleStep, dimStep } = this.opts;
    this.cards.forEach((card, i) => {
      const idx = i;
      card.style.position = "absolute";
      card.style.left = 0;
      card.style.top = 0;
      card.style.width = "100%";
      card.style.height = "100%";
      card.style.cursor = idx === 0 ? "grab" : "default";
      card.style.userSelect = "none";
      const depth = Math.min(idx, visible - 1);
      const translateY = depth * spacing;
      const scale = 1 - depth * scaleStep;
      const dim = Math.min(1, depth * dimStep);
      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      card.style.zIndex = String(1000 - idx);
      card.style.transition = `transform ${this.opts.animationDuration}ms ${this.opts.easing}, opacity ${this.opts.animationDuration}ms ${this.opts.easing}`;
      card.dataset.dsIndex = idx;
      // overlay for dimming (create if not exists)
      if (!card.querySelector(".ds-dim")) {
        const o = document.createElement("div");
        o.className = "ds-dim";
        Object.assign(o.style, {
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          background: "black",
          opacity: dim,
          pointerEvents: "none",
          borderRadius: getComputedStyle(card).borderRadius || "0"
        });
        card.appendChild(o);
      } else {
        card.querySelector(".ds-dim").style.opacity = dim;
      }
    });
  }

  _bindEvents() {
    this._pointerDown = this._onPointerDown.bind(this);
    this._pointerMove = this._onPointerMove.bind(this);
    this._pointerUp = this._onPointerUp.bind(this);
    this.container.addEventListener("pointerdown", this._pointerDown);
    // keep track of pointer capturing on the top card
  }

  _onPointerDown(e) {
    const top = this.cards[0];
    if (!top) return;
    // ensure we only drag the top card
    if (!this.container.contains(e.target) || !top.contains(e.target) && e.target !== top) {
      // allow dragging if target is inside the top card
      return;
    }
    e.preventDefault();
    this.dragging = true;
    this.pointerId = e.pointerId;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this._lastX = this.startX;
    this._lastY = this.startY;
    this.translateX = 0;
    this.translateY = 0;
    top.setPointerCapture(this.pointerId);
    top.style.transition = ""; // immediate while dragging
    top.style.cursor = "grabbing";
    this.activeCard = top;
    this.container.addEventListener("pointermove", this._pointerMove);
    this.container.addEventListener("pointerup", this._pointerUp);
    this.container.addEventListener("pointercancel", this._pointerUp);
  }

  _onPointerMove(e) {
    if (!this.dragging || e.pointerId !== this.pointerId) return;
    e.preventDefault();
    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;
    this.translateX = dx;
    this.translateY = dy;

    const axis = this.opts.axis;
    const primary = axis === "x" ? dx : dy;
    const size = axis === "x" ? this.container.clientWidth : this.container.clientHeight;
    const progress = Math.max(-1, Math.min(1, primary / size));
    // rotation depends on primary drag and horizontal movement
    const rot = (dx / this.container.clientWidth) * this.opts.rotation;
    // apply transform to top card
    const tx = this.translateX;
    const ty = this.translateY;
    this.activeCard.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg) scale(1.02)`;
    // lighten/shift the underlying stack slightly based on progress
    this._styleStackDuringDrag(Math.abs(progress));
    this._lastX = e.clientX;
    this._lastY = e.clientY;
  }

  _styleStackDuringDrag(progress) {
    // subtle lift/scale of next cards while dragging
    const { spacing, scaleStep } = this.opts;
    for (let i = 1; i < Math.min(this.cards.length, this.opts.visible); i++) {
      const card = this.cards[i];
      const depth = i;
      const translateY = (depth - progress * 0.6) * spacing;
      const scale = 1 - (depth - progress * 0.6) * scaleStep;
      card.style.transition = `transform ${this.opts.animationDuration}ms ${this.opts.easing}`;
      card.style.transform = `translate3d(0, ${translateY}px,0) scale(${scale})`;
    }
  }

  _onPointerUp(e) {
    if (!this.dragging || e.pointerId !== this.pointerId) return;
    this.dragging = false;
    try { this.activeCard.releasePointerCapture(this.pointerId); } catch (err) { }
    this.container.removeEventListener("pointermove", this._pointerMove);
    this.container.removeEventListener("pointerup", this._pointerUp);
    this.container.removeEventListener("pointercancel", this._pointerUp);

    const axis = this.opts.axis;
    const primary = axis === "x" ? this.translateX : this.translateY;
    const size = axis === "x" ? this.container.clientWidth : this.container.clientHeight;
    const fraction = primary / size;
    const absFraction = Math.abs(fraction);

    const direction = (axis === "x" ? (fraction > 0 ? "right" : "left") : (fraction > 0 ? "down" : "up"));

    if (absFraction > this.opts.dragThreshold) {
      // swipe out
      this._swipeOut(this.activeCard, direction);
    } else {
      // snap back
      this._snapBack(this.activeCard);
    }
    this.activeCard.style.cursor = "grab";
    this.activeCard = null;
  }

  _swipeOut(card, direction) {
    const dist = Math.max(this.container.clientWidth, this.container.clientHeight) * 1.5;
    let tx = 0, ty = 0;
    switch (direction) {
      case "left": tx = -dist; ty = this.translateY * 0.3; break;
      case "right": tx = dist; ty = this.translateY * 0.3; break;
      case "up": ty = -dist; tx = this.translateX * 0.3; break;
      case "down": ty = dist; tx = this.translateX * 0.3; break;
    }
    card.style.transition = `transform ${this.opts.animationDuration}ms ${this.opts.easing}, opacity ${this.opts.animationDuration}ms ${this.opts.easing}`;
    card.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${(tx / this.container.clientWidth) * this.opts.rotation}deg)`;
    card.style.opacity = "0";

    // After animation, move card to back or remove
    setTimeout(() => {
      if (this.opts.preserveOrder && this.opts.loop) {
        // move first element to end of container and reapply stack
        this.container.appendChild(card);
        card.style.opacity = "1";
        card.style.transition = "";
        card.style.transform = "";
        // reorder internal array
        this.cards.push(this.cards.shift());
      } else if (this.opts.preserveOrder && !this.opts.loop) {
        // push to end (stop looping)
        this.container.appendChild(card);
        this.cards.push(this.cards.shift());
      } else {
        // remove card
        this.container.removeChild(card);
        this.cards.shift();
      }
      this._applyStackStyles();
      if (typeof this.opts.onSwipe === "function") {
        this.opts.onSwipe(card, direction);
      }
    }, this.opts.animationDuration + 10);
  }

  _snapBack(card) {
    card.style.transition = `transform ${this.opts.animationDuration}ms ${this.opts.easing}`;
    card.style.transform = "";
    card.style.opacity = "1";
    // restore stack positions
    setTimeout(() => this._applyStackStyles(), this.opts.animationDuration + 10);
  }

  // programmatic control
  next(direction = this.opts.axis === "x" ? "left" : "up") {
    const top = this.cards[0];
    if (!top) return;
    this._swipeOut(top, direction);
  }

  destroy() {
    this.container.removeEventListener("pointerdown", this._pointerDown);
    this.container.removeEventListener("pointermove", this._pointerMove);
    this.container.removeEventListener("pointerup", this._pointerUp);
    // reset styles
    this.cards.forEach(card => {
      card.style.position = "";
      card.style.transform = "";
      card.style.transition = "";
      card.style.zIndex = "";
      const dim = card.querySelector(".ds-dim");
      if (dim) dim.remove();
    });
  }
}

interface DeckSwipeComponentProps {
  children: ReactNode;
  options?: any;
  className?: string;
}


export function DeckSwipeComponent({ children, options }: DeckSwipeComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childCount = Children.count(children);

  useEffect(() => {
    let deckSwipeInstance: DeckSwipe | null = null;
    const styleEl = document.head.querySelector('[data-deckswipe-style]');

    // Only initialize if the container and children are ready.
    if (containerRef.current && childCount > 0) {
      if (!styleEl) {
        const newStyleEl = document.createElement('style');
        newStyleEl.setAttribute('data-deckswipe-style', 'true');
        newStyleEl.innerHTML = `.deck-container { position: relative; height: 450px; }`;
        document.head.appendChild(newStyleEl);
      }

      deckSwipeInstance = new DeckSwipe(containerRef.current, options);
    }

    // Cleanup on unmount
    return () => {
      if (deckSwipeInstance) {
        deckSwipeInstance.destroy();
      }
    };
    // Re-run the effect if the number of children changes.
  }, [childCount, options]);

  return (
    <div ref={containerRef} className="deck-container">
      {children}
    </div>
  );
}

