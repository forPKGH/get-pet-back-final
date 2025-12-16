import React, { useEffect, useState } from "react";
import ResultContainer from "../components/ResultContainer";
import { useParams, useSearchParams } from "react-router";

const SearchResultsPage = () => {
  const { query } = useParams();
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  async function getOrders() {
    const url = `https://pets.xn--80ahdri7a.site/api/search?query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if (!response.ok) {
      setError('Ошибка сервера');
      console.log(response.status);
      return;
    }
    
    const result = await response.json();
    setData(result.data.orders);
  }

  useEffect(() => {
    getOrders();
  }, [getOrders])

  return (
    <div className="px-3 py-5">
      <h2>Результаты поиска</h2>
      {!error && <ResultContainer results={data} isTried={true} />}
      {error &&
        <div class="alert alert-danger" role="alert">
          {error}
        </div>}
    </div>
  )
}

export default SearchResultsPage