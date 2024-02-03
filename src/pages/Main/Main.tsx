import { useEffect, useState } from 'react';
import BeersList from '../../components/BeersList/BeersList';
import Filters from '../../components/Filters/Filters';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useGetBeersQuery, useLazyGetBeersQuery } from '../../redux';
import Loader from '../../ui/Loader/Loader';

const Main = () => {
  const [isFavoriteList, setIsFavoriteList] = useState(false);
  const { favorites, searchQueryGlobal, beerList } = useAppSelector(
    store => store.beers
  );

  const [searchPage, setSearchPage] = useState(1);
  const [favoritePage, setFavoritePage] = useState(1);

  const { isFetching: isBeersFetching, isError } = useGetBeersQuery({
    searchPage: 1
  });

  const [
    lazyGetBeers,
    {
      data: newBeers,
      isFetching: isNewBeersFetching,
      isError: isNewBeersFetchingError
    }
  ] = useLazyGetBeersQuery();

  useEffect(() => {
    if (searchPage !== 1) {
      lazyGetBeers({
        searchPage,
        beer_name: searchQueryGlobal ? searchQueryGlobal : undefined
      });
    }
  }, [searchPage, lazyGetBeers, searchQueryGlobal]);

  useEffect(() => {
    setSearchPage(1);
  }, [searchQueryGlobal]);

  const handleFavoriteList = () => {
    setIsFavoriteList(prev => !prev);
    setSearchPage(1);
    setFavoritePage(1);
  };

  if (isError || isNewBeersFetchingError) {
    return <h2>Error</h2>;
  }

  return (
    <>
      <Filters
        handleFavoriteList={handleFavoriteList}
        isFavoriteList={isFavoriteList}
      />
      <BeersList
        beers={isFavoriteList ? favorites : beerList}
        page={isFavoriteList ? favoritePage : searchPage}
        setPage={isFavoriteList ? setFavoritePage : setSearchPage}
        isFetching={isBeersFetching}
        isNewListEmpty={!newBeers?.length}
        isFavoriteList={isFavoriteList}
      />
      {isNewBeersFetching && <Loader />}
    </>
  );
};

export default Main;
