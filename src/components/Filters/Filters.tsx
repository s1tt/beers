import styles from './Filters.module.css';
interface IFilters {
  handleFavoriteList: () => void;
  isFavoriteList: boolean;
}

const Filters = ({ handleFavoriteList, isFavoriteList }: IFilters) => {
  return (
    <div className={styles.filter}>
      <button
        className={isFavoriteList ? styles.favFilterActive : ''}
        onClick={handleFavoriteList}
      >
        Favorites Only
      </button>
    </div>
  );
};

export default Filters;
