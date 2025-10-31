export interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
}

export interface CardListProps {
  results: Character[];
}
