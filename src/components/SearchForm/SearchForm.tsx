import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIco from '../../assets/search.svg?react';
import { useAppActions } from '../../hooks/useAppActions';
import { useDebounce } from '../../hooks/useDebounce';
import { useLazySearchBeersQuery } from '../../redux';
import Input from '../../ui/Input/Input';
import { MIN_SEARCH_LENGTH } from '../../utils/constants';
import Dropdown from '../Dropdown/Dropdown';
import styles from './SearchForm.module.css';

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setBeerList, setSearchQueryGlobal } = useAppActions();
  const debounced = useDebounce(searchQuery);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate();

  const [
    searchBeers,
    { data: searchedBeers = [], isFetching: isBeersLoading }
  ] = useLazySearchBeersQuery();

  useEffect(() => {
    if (debounced.length > 2) {
      searchBeers({
        searchPage: 1,
        beer_name: debounced
      });
    }
  }, [debounced, searchBeers]);

  useEffect(() => {
    setIsDropdownVisible(
      isInputFocused && debounced.length >= MIN_SEARCH_LENGTH
    );
  }, [debounced, isInputFocused]);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBeerList(searchedBeers ?? []);
    setSearchQuery('');
    setSearchQueryGlobal(debounced);
    navigate('/');
  };

  return (
    <form
      className={styles.form}
      onSubmit={e => submitForm(e)}
      onFocus={() => setIsInputFocused(true)}
      onBlur={() => setIsInputFocused(false)}
    >
      <div className={styles.inputWrapper}>
        <Input
          id='searchForm'
          placeholder='Search beer'
          value={searchQuery}
          setSearchQuery={setSearchQuery}
          type='search'
        />
        {isDropdownVisible && (
          <Dropdown
            isLoading={isBeersLoading}
            setSearchQuery={setSearchQuery}
            data={searchedBeers ?? []}
          />
        )}
      </div>

      <button
        type='submit'
        className={styles.submitBtn}
        disabled={isBeersLoading || debounced.length < MIN_SEARCH_LENGTH}
      >
        <SearchIco className={styles.submitIco} />
      </button>
    </form>
  );
};

export default SearchForm;
