import React, { useEffect, useState } from "react"
import { Link } from "react-router"

const Header = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [])

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">GetPetBack</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Главная</Link>
            </li>
            <li className="nav-item">
              <Link to="/search" className="nav-link active" aria-current="page">Поиск</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link active" aria-current="page">Профиль</Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link active" aria-current="page">Добавить объявление</Link>
            </li>
            {
              !token && (
                <li className="nav-item">
                  <Link to="/login" className="btn btn-dark ms-2">Войти</Link>
                </li>
              )
            }
            {
              token && (
                <li className="nav-item">
                  <button onClick={() => {localStorage.setItem('token', ''); window.location.reload()}} className="btn btn-dark ms-2">Выйти</button>
                </li>
              )
            }
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>

  )
}

export default Header