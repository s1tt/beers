import { useParams } from 'react-router-dom';
import { useFavorite } from '../../hooks/useFavorite';
import { useImagePlaceholder } from '../../hooks/useImagePlaceholder';
import { useGetBeerQuery } from '../../redux';
import Loader from '../../ui/Loader/Loader';
import styles from './BeerDetails.module.css';

const BeerDetails = () => {
  const { id } = useParams();
  const { isImageLoad, setIsImageLoad } = useImagePlaceholder();
  const { data: beer, isLoading, isError } = useGetBeerQuery(id);
  const { addToFavoriteHandler, removeFromFavoriteHandler, isFavorite } =
    useFavorite(beer);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h2>Error</h2>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.imgWrapper}>
        {!isImageLoad && <Loader />}
        <img
          className={`${styles.img} ${!isImageLoad ? styles.nonVisible : ''}`}
          src={beer?.image_url}
          alt={beer?.name}
          onLoad={() => setIsImageLoad(true)}
        />
      </div>

      <div className={styles.details}>
        <button
          onClick={
            isFavorite ? removeFromFavoriteHandler : addToFavoriteHandler
          }
        >
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
        <h2>{beer?.name}</h2>
        <i>{beer?.tagline}</i>
        <p>{beer?.description}</p>
        <p>
          <strong>ABV: </strong>
          {beer?.abv}
        </p>
        <p>
          <strong>IBU: </strong>
          {beer?.ibu}
        </p>
        <p>
          <strong>PH: </strong>
          {beer?.abv}
        </p>
        <p>
          <strong>Volume: </strong>
          {beer?.volume.value} {beer?.volume.unit}
        </p>
        <div className={styles.table}>
          <p className={styles.tableTitle}>
            <strong>Ingredients:</strong>
          </p>
          <div className={styles.tableContent}>
            <p>
              <strong>Malt:</strong>
            </p>
            <ul>
              {beer?.ingredients.malt.map(malt => (
                <li key={malt.name}>
                  {malt.name}: {malt.amount.value} {malt.amount.unit}
                </li>
              ))}
            </ul>
            <p>
              <strong>Hops:</strong>
            </p>
            <ul>
              {beer?.ingredients.hops.map((hop, index) => (
                <li
                  key={
                    hop.name +
                    hop.amount.value +
                    hop.amount.unit +
                    hop.add +
                    index
                  }
                >
                  {hop.name}: {hop.amount.value} {hop.amount.unit} / When add:{' '}
                  {hop.add}
                </li>
              ))}
            </ul>
            <p>
              <strong>Yeast: </strong>
              {beer?.ingredients.yeast}
            </p>
          </div>
        </div>
        <div>
          <p>
            <strong>Food pairing:</strong>
          </p>
          <ul>
            {beer?.food_pairing.map(food => (
              <li key={food}>
                <a
                  href={`https://www.google.com/search?q=${food}`}
                  target='_blank'
                >
                  {food}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>
            <strong>Brewers Tips: </strong>
            {beer?.brewers_tips}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeerDetails;
