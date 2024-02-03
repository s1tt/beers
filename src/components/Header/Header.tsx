import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyGetRandomBeerQuery } from '../../redux';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import styles from './Header.module.css';

const Header = () => {
  const [fetchRandomBeerId, { data: randomBeerId, isLoading, isError }] =
    useLazyGetRandomBeerQuery();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (shouldRedirect && randomBeerId && !isLoading && !isError) {
      navigate(`/beers/${randomBeerId}`);
      setShouldRedirect(false);
    }
  }, [shouldRedirect, randomBeerId, isLoading, isError, navigate]);

  const randomBeerHandler = async () => {
    await fetchRandomBeerId();
    setShouldRedirect(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>Punk API</h1>
        <Navigation />
      </div>
      <div className={styles.rightSide}>
        <button onClick={randomBeerHandler}>Get a random beer</button>
        <SearchForm />
      </div>
    </header>
  );
};

export default Header;
