'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.08, // Adjust for smoothness/responsiveness
            wheelMultiplier: 1.1,
            touchMultiplier: 1.5,
            smoothWheel: true,
            infinite: false,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Update session scroll position on mount
        const savedScrollPos = sessionStorage.getItem(`scrollPos-${pathname}`);
        if (savedScrollPos) {
            lenis.scrollTo(parseInt(savedScrollPos), { immediate: true });
        }

        return () => {
            lenis.destroy();
        };
    }, []);

    // Handle route changes
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return <>{children}</>;
}
