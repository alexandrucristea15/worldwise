/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ButtonBack from "./ButtonBack";
import { useURLPosition } from "../hooks/useURLPosition";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const { lat, lng } = useURLPosition();

  useEffect(() => {
    async function getCountry() {
      try {
        setIsLoadingGeocoding(true);
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        setCityName(data.locality);
        setCountry(data.countryName);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    getCountry();
  }, [lat, lng]);
  

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          disabled={isLoadingGeocoding}
        />
        {/* <span className={styles.flag}>{convertToEmoji(country)}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
