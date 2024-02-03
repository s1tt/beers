import { useCallback, useEffect, useRef, useState } from 'react';
import { Beer } from '../../types/beer';
import { MAX_ELEMENTS_ON_THE_PAGE } from '../../utils/constants';
import BeerCard from '../BeerCard/BeerCard';
import styles from './BeersList.module.css';

interface IBeersList {
  beers: Beer[];
  isFetching: boolean;
  page: number;
  setPage: (page: number) => void;
  isNewListEmpty: boolean;
  isFavoriteList: boolean;
}

const BeersList = ({
  beers,
  page,
  setPage,
  isFetching,
  isNewListEmpty,
  isFavoriteList
}: IBeersList) => {
  const [hasNextPage, setHasNextPage] = useState(false);
  const targetCardRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (beers.length) {
      setHasNextPage(true);
    }
  }, [beers]);

  const lastCard = useCallback(
    (node: HTMLElement) => {
      if (isNewListEmpty && !isFavoriteList && page !== 1) return;
      if (!hasNextPage) return;
      if (!node) return;
      if (isFetching) return;
      if (targetCardRef.current) targetCardRef.current.disconnect();

      targetCardRef.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            setPage(page + 1);
            setHasNextPage(false);
          }
        },
        { threshold: 0.5 }
      );
      targetCardRef.current.observe(node);
    },
    [isFetching, hasNextPage, page, setPage, isNewListEmpty, isFavoriteList]
  );

  const getSlicedArrayOfBeers = () => {
    return beers.slice(0, MAX_ELEMENTS_ON_THE_PAGE * page);
  };

  if (!beers.length && !isFetching) {
    return <h2>Nothing found</h2>;
  }
  return (
    <div className={styles.list}>
      {getSlicedArrayOfBeers().map((beer, index) => (
        <BeerCard
          key={beer.id}
          beer={beer}
          ref={index === getSlicedArrayOfBeers().length - 1 ? lastCard : null}
        />
      ))}
    </div>
  );
};

export default BeersList;
