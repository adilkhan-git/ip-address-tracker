"use client";

import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = "at_sXAGTHdUoJ57533hX3YbhaxQLNKWj";

export default function Home() {
  const [ipAddress, setIpAddress] = useState("");
  const [countryData, setCountryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (ipAddress.trim() !== "") {
      setIsLoading(true);
      setError("");
      setCountryData(null); // Сброс данных о стране перед новым запросом
      try {
        const response = await axios.get(
          `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}&ipAddress=${ipAddress}`
        );
        setCountryData(response.data);
      } catch (error) {
        setError("Ошибка при получении данных о стране");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>IP Address Tracker</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Введите IP-адрес"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          className={styles.input}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className={styles.button}
        >
          Search
        </button>
      </div>
      {isLoading ? (
        <p className={styles.loading}>Loading data...</p>
      ) : (
        countryData && (
          <div className={styles.infoContainer}>
            <p className={styles.info}>IP address: {countryData.ip}</p>
            <p className={styles.info}>
              Country: {countryData.location.country}
            </p>
            <p className={styles.info}>City: {countryData.location.region}</p>
            <p className={styles.info}>
              TimeZone: {countryData.location.timezone}
            </p>
            <p className={styles.info}>ISP: {countryData.isp}</p>
          </div>
        )
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
