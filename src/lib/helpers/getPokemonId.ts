// Extracts the numeric id from "https://pokeapi.co/api/v2/pokemon/{id}/"
export const getPokemonIdFromUrl = (url: string): number | null => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
};
