/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { emoji, cityName: name, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.name}>{name}</span>
      <time className={styles.date}>( {formatDate(date)} )</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
};

export default CityItem;
