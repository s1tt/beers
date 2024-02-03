import { Link } from 'react-router-dom';
import { Beer } from '../../types/beer';
import Loader from '../../ui/Loader/Loader';
import styles from './Dropdown.module.css';

interface IDropdown {
  isLoading: boolean;
  data: Beer[];
  setSearchQuery: (query: string) => void;
}

const Dropdown = ({ isLoading, data, setSearchQuery }: IDropdown) => {
  const clickHandler = () => {
    setSearchQuery('');
  };
  return (
    <ul className={styles.dropdown}>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : data.length ? (
        data?.map(item => (
          <li className={styles.dropDownItem} key={item.id}>
            <Link
              className={styles.dropDownItemLink}
              to={`/beers/${item.id}`}
              onClick={clickHandler}
            >
              {item.name}
            </Link>
          </li>
        ))
      ) : (
        <p className={styles.notFOund}>Nothing found :(</p>
      )}
    </ul>
  );
};

export default Dropdown;
