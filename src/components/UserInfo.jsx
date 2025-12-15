import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EmailChangable from "./EmailChangable";
import PhoneChangable from "./PhoneChangable";

const UserInfo = () => {
  const [userData, setUserData] = useState({
    'email': '',
    'id': 0,
    'name': '',
    'ordersCount': '',
    'petsCount': '',
    'phone': '',
    'registrationDate': ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function getUserData() {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const url = 'https://pets.xn--80ahdri7a.site/api/users';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        setError('Ошибка сервера');
      }

      const result = await response.json();
      setUserData(result);
    }
    catch {
      setError('Ошибка сервера');
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (<div style={{ maxWidth: '400px', minWidth: 'max-content' }} className="mx-3 my-3">
    {!error &&
      (
        <div className="card">
          <div className="card-header">
            {userData.name}
          </div>
          <div className="list-group list-group-flush">
            <EmailChangable valueProps={userData.email}/>
            <PhoneChangable valueProps={userData.phone}/>
          </div>
          <div className="card-footer">
            <div className="text-body-secondary">id: {userData.id} </div>
            <div className="text-body-secondary">Объявлений: {userData.ordersCount}</div>
            <div className="text-body-secondary">Животных: {userData.petsCount} </div>
            <div className="text-body-secondary">Дней на портале: {Math.floor((new Date() - new Date(userData.registrationDate)) / 1000 / 60 / 60 / 24)}</div>
          </div>
        </div>
      )
    }
    {
      error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )
    }
  </div>
  )
}

export default UserInfo