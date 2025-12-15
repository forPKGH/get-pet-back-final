import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    'email': '',
    'password': ''
  });
  const [errors, setErrors] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    setErrors(null);
    const url = 'https://pets.xn--80ahdri7a.site/api/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrors({ 'server': ['Неправильный логин или пароль'] })
          return
        }
        else setErrors({ 'server': ['Ошибка сервера'] })
      }
      const result = await response.json();
      localStorage.setItem('token', result.data.token);
      navigate('/profile');
      window.location.reload();
    }
    catch (error) {
      setErrors({ 'server': ['Ошибка сервера'] })
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <>
      <form onSubmit={login} style={{ maxWidth: '800px' }} className="row g-3 needs-validation px-3 mx-auto my-5" noValidate>
        <div className="col-md-12">
          <label htmlFor="email" className="form-label">Email</label>
          <input pattern="[^\s@]+@[^\s@]+\.[^\s@]+" onChange={handleChange} value={formData.email} placeholder="example@mail.ru" type="email" className='form-control' name="email" id="email" required ref={emailInput} />
          <div className="invalid-feedback">
            Неверный формат email
          </div>
        </div>
        <div className="col-md-12">
          <label htmlFor="password" className="form-label">Пароль*</label>
          <div className="input-group mb-3">
            <input onChange={handleChange} value={formData.password} type={showPassword ? 'text' : 'password'} className='form-control' name="password" id="password" required ref={passwordInput} />
            <button onClick={() => setShowPassword(!showPassword)} className="input-group-text" id="basic-addon1" type="button">{showPassword ? '🐵' : '🙈'}</button>
            <div className="invalid-feedback">
              Пароль обязателен
            </div>
          </div>
        </div>
        {
          errors && errors.server && errors.server.length > 0 && (
            <div className="alert alert-danger" role="alert">
              {errors.server}
            </div>)
        }
        <div className="col-12 d-flex justify-content-between w-100">
          <button className="btn btn-dark" type="submit">Войти</button>
          <Link to="/register">Зарегистрироваться</Link>
        </div>
      </form>
    </>
  )
}

export default LoginForm