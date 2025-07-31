/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

const CountryList = ({ cities, isLoading }) => {
  const countries = cities.reduce((acc, curr) => {
    if (!acc.find((item) => item.countryName === curr.country)) {
      return [...acc, { countryName: curr.country, emoji: curr.emoji }];
    } else return acc;
  }, []);

  if (isLoading) return <Spinner />;

  if (!countries.length)
    return (
      <Message message="Add your first city by clicking on your city on the map" />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.countryName} country={country} />
      ))}
    </ul>
  );
};

export default CountryList;
