import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

const PhoneChangable = ({valueProps}) => {
  const [value, setValue] = useState(valueProps);
  const [oldValue, setOldValue] = useState(valueProps);
  const [error, setError] = useState(null);

  useEffect(() => {
    setValue(valueProps);
    setOldValue(valueProps)
  }, [valueProps]);

  const navigate = useNavigate();

  const input = useRef(null);
  const form = useRef(null);

  async function changeEmail(e) {
    e.preventDefault();
    const url = 'https://pets.xn--80ahdri7a.site/api/users/phone';
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    if (!form.current.checkValidity()) {
      e.preventDefault()
      e.stopPropagation()
    }
    form.current.classList.add('was-validated')

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 'phone': value })
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        else if (response.status === 422) {
          input.current.setCustomValidity('Error');
          form.current.classList.add('was-validated');
          return;
        }
        else setError('Ошибка сервера');
      }
      input.current.setCustomValidity('');
      setError(null);
      setOldValue(value);
    } catch (error) {
      form.current.classList.remove('was-validated');
      setError('Ошибка сервера');
    }
  }

  function handleChange(e) {
    input.current.setCustomValidity('');
    setValue(e.target.value)
  }

  return (
    <>
      <form ref={form} onSubmit={changeEmail} className="row g-3 needs-validation" noValidate>
        <div className="input-group w-100">
          <input pattern="[\d+]+" ref={input} onChange={handleChange} style={{ borderRadius: '0px' }} className="form-control list-group-item" type="text" value={value} />
          <button type='submit' style={{ borderRadius: '0px' }} className="input-group-text" id="basic-addon1">{value === oldValue ? '✏️' : '✅'}</button>
          <div className="invalid-feedback">
            Неверный формат номера телефона
          </div>
        </div>
      </form>
      {
        error && (<div className="text-danger mx-3">
          {error}
        </div>
        )
      }
    </>
  )
}

export default PhoneChangable