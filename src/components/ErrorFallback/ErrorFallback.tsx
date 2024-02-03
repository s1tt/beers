import styles from './ErrorFallback.module.css';
interface IErrorFallback {
  error: Error;
  resetErrorBoundary: () => void;
}
const ErrorFallback = ({ error, resetErrorBoundary }: IErrorFallback) => (
  <div className={styles.container}>
    <h2>Something went wrong:</h2>
    <p>Error message: {error?.message}</p>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

export default ErrorFallback;
