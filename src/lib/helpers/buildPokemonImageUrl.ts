// Official artwork PNG hosted by PokeAPI on GitHub
export const buildPokemonImageUrl = (
  id: number | null | undefined,
): string | undefined => {
  if (!id) return undefined;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};
