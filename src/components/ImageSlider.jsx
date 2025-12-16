import React from "react";

const imageSlider = ({ images, isLoading }) => {
  return (<>
    {
      isLoading && (
        <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
          <div className="spinner-border text-secondary " role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      )
    }
    {
      !isLoading && (
        <div id="carouselExampleIndicators" className="carousel slide bg-light" style={{ height: '300px', margin: '0px, -16px' }}>
          <div className="carousel-indicators">
            {images.map((item, index) => {
              if (item !== null) return (
                <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} />
              )
            })}
          </div>
          <div className="carousel-inner h-100">
            {
              images.map((item, index) => {
                if (item !== null)
                  return (
                    <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}>
                      <div className="object-fit-contain h-100 d-flex justify-content-center align-items-center">
                        <img key={index} src={`https://pets.xn--80ahdri7a.site${item}`} className="d-block h-100" alt="Фото животного" />
                      </div>
                    </div>
                  )
              })
            }
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>)
    }
  </>
  )
}

export default imageSlider