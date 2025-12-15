import React, { useEffect, useState } from "react";
import { data, Link } from "react-router";

const Recent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function getData() {
    const url = 'https://pets.xn--80ahdri7a.site/api/pets';
    try {
      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok) {
        setError('Ошибка сервера');
        console.log(result);
      }

      setData(result.data.orders);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="py-5">
      <h2 htmlFor="exampleInputEmail1" className="form-label text-center">Последние найденные животные</h2>
      {data && !error && (
        <div className="row row-cols-1 row-cols-md-3 g-4 w-100 mx-auto">
          {
            data.slice(0,6).sort((a,b) => (new Date(b.date) - new Date(a.date))).map((item, index) => (
              <div key={index} className="col" >
                <div className="card h-100">
                  <img src={`https://pets.xn--80ahdri7a.site${item.photo}`} className="card-img-top object-fit-contain" alt={`${item.kind}`} style={{ height: '200px' }} />
                  <div className="card-body">
                    <h5 className="card-title">{item.kind}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{item.district}</h6>
                    <p className="card-text">{item.description}</p>
                    <span className="me-1">{item.registred ? '✅' : '❔'}</span>
                    <a href={`tel:${item.phone}`} className="card-link">Иван: {item.phone}</a><br />
                    <Link className="btn btn-dark mt-3" to={`/pet/${item.id}`}>Подробнее</Link>
                  </div>
                  <div className="card-footer">
                    <small className="text-body-secondary">{item.mark} {item.date}</small>
                  </div>
                </div>
              </div>)
            )
          }
        </div >
      )}
    </div>
  )
}

export default Recent