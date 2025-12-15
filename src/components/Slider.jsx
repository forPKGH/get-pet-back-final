import React, { useEffect, useState } from "react";

const Slider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null)

  useEffect(() => { getData() }, []);

  async function getData() {
    const url = 'https://pets.xn--80ahdri7a.site/api/pets/slider';
    try {
      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok) {
        console.log(result);
        setIsLoading(false);
        setError('Ошибка сервера');
        return;
      }
      setData(result.data.pets);
    } catch {
      setIsLoading(false);
      setError('Ошибка сервера');
    }

    setIsLoading(false);
  }

  return (<>
    {
      isLoading && (
        <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
          <div className="spinner-border text-secondary " role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      )
    }
    {
      !isLoading && !error && data && (
        <div id="carouselExampleCaptions" className="carousel carousel-dark slide bg-light">
          <div className="carousel-indicators">
            {
              data.map((item, index) =>
                <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={`${index === 0 ? 'active' : ''}`} />
              )
            }
          </div>
          <div className="carousel-inner object-fit-contain py-3" style={{ height: '400px' }}>
            <div className="h-100 object-fit-contain">
              {
                data.map((item, index) =>
                  <div key={index} className={`h-100 carousel-item ${index === 0 ? 'active' : ''}`}>
                    <div className="d-flex justify-content-center h-100">
                      <img src={`https://pets.xn--80ahdri7a.site${item?.image}`} className="d-block h-100" alt={`${item?.kind}`} />
                      <div className="carousel-caption d-none d-md-block rounded-3" style={{ backgroundColor: '#FFFFFF80' }}>
                        <h5>Нашёлся питомец: {item?.kind}</h5>
                        <p className="my-0">{item?.description}</p>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon text-color-dark" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>)
    }
  </>
  )
}

export default Slider