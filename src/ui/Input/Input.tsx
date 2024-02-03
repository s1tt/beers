import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  id: string;
  setSearchQuery: (searchQuery: string) => void;
}

const Input = ({ type = 'text', id, setSearchQuery, ...props }: IInput) => {
  return (
    <label className={styles.label} htmlFor={id}>
      <input
        className={styles.input}
        type={type}
        id={id}
        onChange={e => setSearchQuery(e.target.value)}
        {...props}
      />
    </label>
  );
};

export default Input;
