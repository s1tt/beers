import { Suspense, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useFavorite } from '../../hooks/useFavorite';
import { useImagePlaceholder } from '../../hooks/useImagePlaceholder';
import { Beer } from '../../types/beer';
import Loader from '../../ui/Loader/Loader';
import { setBeerColor } from '../../utils/setBeerColor';
import styles from './BeerCard.module.css';
import Icon from '/src/assets/favorite.svg?react';
interface IBeerCard {
  beer: Beer;
}

const BeerCard = forwardRef<HTMLElement, IBeerCard>(({ beer }, ref) => {
  const { addToFavoriteHandler, removeFromFavoriteHandler, isFavorite } =
    useFavorite(beer);
  const { isImageLoad, setIsImageLoad } = useImagePlaceholder();

  return (
    <article className={styles.card} ref={ref}>
      <Suspense fallback={'Loading...'}>
        <Link to={`/beers/${beer.id}`} className={styles.link}>
          <button
            className={styles.favoriteBtn}
            onClick={
              isFavorite ? removeFromFavoriteHandler : addToFavoriteHandler
            }
          >
            <Icon
              className={`${styles.favoriteIco} ${
                isFavorite ? styles.favoriteIcoActive : ''
              }`}
            />
          </button>
          <div className={styles.imgWrapper}>
            {!isImageLoad && <Loader />}
            <img
              className={`${styles.img} ${
                !isImageLoad ? styles.nonVisible : ''
              }`}
              src={beer.image_url}
              alt={beer.name}
              onLoad={() => setIsImageLoad(true)}
            />
          </div>
          <h2 className={styles.title}>{beer.name}</h2>
          <p className={styles.tag}>{beer.tagline}</p>
          <div className={styles.description}>
            <p>IBU: {beer.ibu}</p>
            <p>ABV: {beer.abv}%</p>
            <p>
              Color:
              <span
                className={styles.beerColor}
                style={{ backgroundColor: setBeerColor(beer.ebc) }}
              ></span>
            </p>
          </div>
        </Link>
      </Suspense>
    </article>
  );
});

export default BeerCard;
