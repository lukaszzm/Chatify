import styles from "./SearchBar.module.css";
import searchIcon from "../../../../assets/icons/search.svg";
import { SearchedUser } from "../SearchedUser";
import { Input, LoadingSpinner } from "../../../../components/UI";
import { useSearchBar } from "../../../../hooks/useSearchBar";

export const SearchBar = () => {
  const { setInputValue, inputRef, resetHandler, data, isFetching, isError } = useSearchBar();

  return (
    <div className={styles.container}>
      <div className={styles["search-wrapper"]}>
        <img src={searchIcon} alt="Search Icon." />
        <Input
          autoComplete="off"
          id="search"
          onChange={(e) => setInputValue(e.target.value)}
          type="search"
          placeholder="Search user"
          ref={inputRef}
        />
      </div>
      <div className={styles["results-wrapper"]}>
        {isFetching ? (
          <LoadingSpinner />
        ) : isError ? (
          <p>Something went wrong.</p>
        ) : data ? (
          data.length === 0 ? (
            <p>No results.</p>
          ) : (
            data.map(({ id, firstName, lastName, profileImage }) => (
              <SearchedUser
                key={id}
                id={id}
                firstName={firstName}
                lastName={lastName}
                profileImage={profileImage}
                onClick={resetHandler}
              />
            ))
          )
        ) : null}
      </div>
    </div>
  );
};
