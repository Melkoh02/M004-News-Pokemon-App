export type NewsCardProps = {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  linkUrl?: string;
  sourceName?: string;
  author?: string | null;
  publishedAt?: string;
  onPress?: () => void;
};
