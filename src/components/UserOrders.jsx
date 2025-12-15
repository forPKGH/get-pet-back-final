import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const UserOrders = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    const url = 'https://pets.xn--80ahdri7a.site/api/users/orders';
    const token = localStorage.getItem('token')
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        navigate('/login');
        return;
      }
      setError('Ошибка сервера');
      return;
    }
    setError(null);
    const data = await response.json();
    console.log(data);
    setData(data.data.orders);
  }

  async function deleteOrder(id) {
    const url = `https://pets.xn--80ahdri7a.site/api/users/orders/${id}`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if(!response.ok) {
      if (response.status === 401) {
        navigate('/login');
        return;
      }
      setError('Ошибка сервера');
      return;
    }

    setError(null);
    setData(prev => prev.filter(order => order.id !== id));
  }

  return (
    <>
      <div className="d-flex flex-column gap-2 p-3 w-100" style={{ maxWidth: '800px' }}>
        {data && data.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-header d-flex justify-content-between">
              id: {item.id}
              <button onClick={(() => {deleteOrder(item.id)})} type="button" className="btn-close"></button>
            </div>
            <div className="card-body d-flex gap-3 flex-wrap">
              <div className="object-fit-cover" style={{ minWidth: '80px' }}>
                <img height='100px' width='100px' src={`https://pets.xn--80ahdri7a.site${item.photos}`} className="card-img" alt={item.kind}></img>
              </div>
              <div>
                <h5 className="card-title">{item.kind}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">{item.district}</p>
                <div className="d-flex flex-wrap gap-2">
                  <Link to={`/pet/${item.id}`} target="_blank" rel="norefferer noopener" className="btn btn-dark h-100">Подробнее</Link>
                  <p className={`h-100 btn btn-${item.status === 'active' ? 'success' : item.status === 'wasFound' ? 'primary' : item.status === 'onModeration' ? 'info' : 'dark'}`}>{item.status}</p>
                </div>
              </div>
            </div>
            <div className="card-footer d-flex gap-2">
              {item.date} {item.mark}
            </div>
          </div>
        ))
        }
        {
          error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )
        }
      </div>
    </>
  )
}

export default UserOrders