import { MouseEvent, useEffect, useState } from 'react';
import { Beer } from '../types/beer';
import { useAppActions } from './useAppActions';
import { useAppSelector } from './useAppSelector';

export const useFavorite = (beer: Beer | undefined) => {
  const { addToFavorite, removeFromFavorite } = useAppActions();
  const { favorites } = useAppSelector(state => state.beers);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (beer) {
      setIsFavorite(
        !!favorites.find(favoriteBeer => favoriteBeer.id === beer.id)
      );
    }
  }, [beer, favorites]);

  const addToFavoriteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (beer) {
      addToFavorite(beer);
      setIsFavorite(true);
    }
  };

  const removeFromFavoriteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (beer) {
      removeFromFavorite(beer);
      setIsFavorite(false);
    }
  };

  return {
    addToFavoriteHandler,
    removeFromFavoriteHandler,
    isFavorite
  };
};
