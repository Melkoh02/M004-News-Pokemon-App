// Official artwork PNG hosted by PokeAPI on GitHub
export const buildPokemonImageUrl = (
  id: number | null | undefined,
): string | null => {
  if (!id) return null;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};
