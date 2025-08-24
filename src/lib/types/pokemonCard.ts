export type PokemonCardProps = {
  id: number | null;
  title: string;
  description: string | null;
  url: string | null;
  onPress?: () => void;
};
