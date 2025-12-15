import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ImageSlider from "./ImageSlider";

const PetPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getData() {
    const url = `https://pets.xn--80ahdri7a.site/api/pets/${id}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();

      if (!response.ok) {
        return;
      }
      setData(result.data.pet);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError('Ошибка сервера');
      setIsLoading(false);
    }
  }

  useEffect(() => { getData() }, []);

  return (
    <div className="d-block" tabIndex="-1">
        <div className="px-3">
          {
            !error && (<ImageSlider images={data?.photos} isLoading={isLoading} />)
          }
          <div className="modal-body">
            <h6 className="modal-title">{data?.kind}</h6>
            <h6 className="text-secondary">Район: {data?.district}</h6>
            <p>{data?.description}</p>
            <h6>Автор: {data?.name}</h6>
            <a href={`mailto:${data?.email}`}>{data?.email}</a><br/>
            <a href={`tel:${data?.phone}`}>{data?.phone}</a>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <span className="text-secondary">{data?.mark}</span>
            <span className="text-secondary">{data?.date}</span>
          </div>
        </div>
    </div>
  )
}

export default PetPage