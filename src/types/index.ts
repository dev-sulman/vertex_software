export interface Project {
  title: string;
  category: string;
  imageUrl: string;
  link: string;
  aiHint?: string;
  description: string;
  gallery: { url: string; description: string }[];
}
