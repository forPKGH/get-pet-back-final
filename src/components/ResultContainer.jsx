import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const ResultContainer = ({ results, isTried }) => {
  const container = useRef(null);
  const [toShow, setToShow] = useState(10);

  useEffect(() => {
    setToShow(10);
  }, [results]);

  useEffect(() => {
    container.current.scrollIntoView({ behavior: "smooth" })
  }, [toShow])

  return (<div className="px-3" ref={container}>
    {
      results.length !== 0 && <div className="alert alert-success" role="alert">
        Найдено {results.length} объявлений
      </div>
    }
    {
      isTried && results.length === 0 && <div className="alert alert-info" role="alert">
        Ничего не найдено
      </div>
    }
    <div className="row row-cols-1 row-cols-md-3 g-4 w-100 mx-auto my-3">
      {
        results?.map((item, index) => {
          if (index < toShow && index >= toShow - 10)
            return (
              <div key={index} className="col">
                <div className="card h-100">
                  <img style={{ maxHeight: '300px' }} src={`https://pets.xn--80ahdri7a.site/${item.photos}`} className="card-img-top h-100 object-fit-cover" alt={item.kind} />
                  <div className="card-body">
                    <h5 className="card-title">{item.kind}</h5>
                    <p className="card-text">{item.description}</p>
                    <h6 className="text-body-secondary">Район: {item.district}</h6><br />
                    <Link target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-3" to={`/pet/${item.id}`}>Подробнее</Link>
                  </div>
                  <div className="card-footer">
                    <small className="text-body-secondary">Автор: {item.name}</small><br />
                    <small className="text-body-secondary">Контакты: {item.phone}, {item.email}</small><br />
                    <small className="text-body-secondary">Дата: {item.date}</small>
                  </div>
                </div>
              </div>
            )
          else return ''
        }
        )
      }
    </div>
    <div className="d-flex gap-2">
      {
        toShow > 10 && (
          <button type="button" onClick={() => setToShow(toShow - 10)} className="btn btn-dark w-100 my-3">Назад</button>
        )
      }
      {
        results.length > toShow && (
          <button type="button" onClick={() => setToShow(toShow + 10)} className="btn btn-dark w-100 my-3">Дальше</button>
        )
      }
    </div>
  </div>
  )
}

export default ResultContainer