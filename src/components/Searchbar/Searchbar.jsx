import { useState } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = evt => {
    setSearchInput(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchInput.trim() === '') {
      toast.error('Please enter a search request');
    }

    onSubmit({ searchInput });
    onFormReset();
  };

  const onFormReset = () => {
    setSearchInput('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button className={css.searchForm_button} type="submit">
          <span className={css.searchForm_button_label}>Search</span>
        </button>

        <input
          className={css.searchForm_input}
          type="text"
          name="search"
          value={searchInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearch}
        />
      </form>
    </header>
  );
}