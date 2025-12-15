import React, { useRef, useState } from "react";

const Subscribe = () => {
  const [error, setError] = useState('');
  const [data, setData] = useState('');

  const form = useRef(null);
  const input = useRef(null);

  async function subscribe(e) {
    e.preventDefault();

    if (!form.current.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      form.current.classList.add('was-validated');
      return;
    }
    const url = 'https://pets.xn--80ahdri7a.site/api/subscription';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'email': data })
      })

      if (!response.ok) {
        console.log(response.status)
        return;
      }

      if (response.status === 204) {
        input.current.setCustomValidity('');
        form.current.classList.add('was-validated');
      }
    } catch (error) {
      console.log(error)
      setError('Ошибка сервера', error)
    }
  }

  function handleChange(e) {
    form.current.classList.remove('was-validated');
    setData(e.target.value);
  }

  return (<>
    {!error && (
      <form ref={form} onSubmit={subscribe} className="needs-validation mx-auto px-3 py-5" noValidate style={{ maxWidth: '800px' }}>
        <div className="mb-3">
          <h2 htmlFor="exampleInputEmail1" className="form-label text-center">Подписаться на новости</h2>
          <input ref={input} onChange={handleChange} value={data} type="email" required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div className="invalid-feedback">
            Неправильный формат email
          </div>
          <div className="valid-feedback">
            Вы успешно подписались
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Подписаться</button>
      </form>)}
    {error && (
      <div className="alert alert-danger mx-3" role="alert">
        {/* Ошибка сервера, попробуйте обновить страницу */}
        {error}
      </div>
    )}
  </>
  )
}

export default Subscribe