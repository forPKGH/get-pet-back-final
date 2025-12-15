import React, { useState } from "react";
import ResultContainer from "./ResultContainer";
import PetPage from "./PetPage";

const Search = () => {

  const [district, setDistrict] = useState('');
  const [kind, setKind] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState([]);
  const [isTried, setIsTried] = useState(false);

  async function findOrders(e) {
    e.preventDefault();
    const url = 'https://pets.xn--80ahdri7a.site/api/search/order'
    const query = `?district=${district}&kind=${kind}`
    try {
      const response = await fetch(`${url}${query}`, { method: 'GET' })
      if (!response.ok) { console.log(response.status); return; }
      const result = await response.json();
      setIsTried(true);
      setResult(result);
    } catch (error) {
      setError('Ошибка сервера')
    }
  }

  return (<>
    <div className="px-3">
      <form onSubmit={findOrders} className="mx-auto w-100 my-3" noValidate>
        <div className="d-flex gap-2 justify-content-center flex-wrap">
          <div className="flex-grow-1" style={{ minWidth: '280px' }}>
            <label htmlFor="district" className="form-label">Район</label>
            <input onChange={(e) => setDistrict(e.target.value)} value={district} type="text" className="form-control" id="district" />
          </div>
          <div className="flex-grow-1" style={{ minWidth: '280px' }}>
            <label htmlFor="kind" className="form-label">Питомец</label>
            <input onChange={(e) => setKind(e.target.value)} value={kind} type="text" className="form-control" id="kind" />
          </div>
        </div>
        <button type="submit" className="btn btn-dark w-100 my-2">Найти</button>
      </form>
    </div>
    {result && (<ResultContainer results={result?.data?.orders || []} isTried={isTried} />)}

    {
      error && (
        <div className="alert alert-danger mx-3 my-3" role="alert">
          {error}
        </div>
      )
    }
  </>);
}

export default Search;