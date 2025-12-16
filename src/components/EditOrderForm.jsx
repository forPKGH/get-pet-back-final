import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const EditOrderForm = () => {
  const [formData, setFormData] = useState(
    {
      'photo1': null,
      'photo2': null,
      'photo3': null,
      'kind': '',
      'mark': '',
      'description': ''
    }
  )

  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  function createFormDataToSend(formData, register) {
    const formDataToSend = new FormData();

    formDataToSend.append('kind', formData.kind);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('mark', formData.mark);

    if (formData.photo1 instanceof File) formDataToSend.append('photo1', formData.photo1);
    if (formData.photo2 instanceof File) formDataToSend.append('photo2', formData.photo2);
    if (formData.photo3 instanceof File) formDataToSend.append('photo3', formData.photo3);

    return formDataToSend;
  }

  async function edit(e) {
    e.preventDefault();


    if (!e.target.checkValidity()) {
      e.target.classList.add('was-validated');
      return;
    }

    const formDataToSend = createFormDataToSend(formData);

    const url = `https://pets.xn--80ahdri7a.site/api/pets/${id}`;
    const token = localStorage.getItem('token');
    console.log(url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formDataToSend
    })

    const data = await response.json();
    if (!response.ok) {
      if (response.status === 422) {
        console.log(data);
        return;
      }
      if (response.status === 403) {
        setError('Невозможно отредактировать неактуальное объявление');
        return;
      }
      setError('Ошибка сервера');
      return;
    }
    setShowModal(true);
    setFormData(
      {
        'photo1': null,
        'photo2': null,
        'photo3': null,
        'kind': '',
        'mark': '',
        'description': ''
      }
    )

    console.log(data);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    e.target.setCustomValidity('')
  }

  function handleFileChange(e) {
    const { name } = e.target;
    const file = e.target.files[0];

    if (file) {
      if (!file.type.includes('png')) {
        e.target.setCustomValidity('error');
        return;
      } else {
        e.target.setCustomValidity('');
      }

      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: null
      }));
    }
  }

  return (<>
    <form onSubmit={edit} className="row g-3 needs-validation px-3 py-5 mx-auto" style={{ maxWidth: '800px' }} noValidate>
      <div className="col-md-12">
        <label htmlFor="validationCustom03" className="form-label">Вид животного</label>
        <input value={formData.kind} onChange={handleChange} name="kind" type="text" className="form-control" id="validationCustom03" required />
        <div className="invalid-feedback">
          Обязательное поле
        </div>
      </div>
      <div className="col-md-12">
        <label htmlFor="photo1" className="form-label">Фото 1*</label>
        <input onChange={handleFileChange} name="photo1" type="file" accept=".png" className="form-control" id="photo1" required />
        <div className="invalid-feedback">
          Обязательное поле, изображение может быть только в PNG
        </div>
      </div>
      <div className="col-md-12">
        <label htmlFor="photo2" className="form-label">Фото 2</label>
        <input onChange={handleFileChange} name="photo2" type="file" accept=".png" className="form-control" id="photo2" />
        <div className="invalid-feedback">
          Изображение может быть только в PNG
        </div>
      </div>
      <div className="col-md-12">
        <label htmlFor="photo3" className="form-label">Фото 3</label>
        <input onChange={handleFileChange} name="photo3" type="file" accept=".png, image/png" className="form-control" id="photo3" />
        <div className="invalid-feedback">
          Изображение может быть только в PNG
        </div>
      </div>
      <div className="col-md-12">
        <label htmlFor="validationCustom03" className="form-label">Марка</label>
        <input value={formData.mark} onChange={handleChange} name="mark" type="text" className="form-control" id="validationCustom03" />
      </div>
      <div className="col-md-12">
        <label htmlFor="validationCustom03" className="form-label">Описание*</label>
        <textarea value={formData.description} onChange={handleChange} name="description" className="form-control" id="validationCustom03" required />
        <div className="invalid-feedback">
          Обязательное поле
        </div>
      </div>
      <div className="col-12">
        {
          error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )
        }
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} style={{ display: showModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between">
                <button className="btn" onClick={() => navigate('/profile')} aria-label="Close" ><img width='24' height='24' src="/images/close-x.svg" alt="Закрыть" /></button>
              </div>
              <div className="modal-body">
                <p>Объявление изменено</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
                  onClick={() => navigate('/profile')}>Закрыть</button>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-dark" type="submit">Изменить объявление</button>
        <Link to="/profile" className="btn btn-dark" type="button">Отмена</Link>
      </div>
    </form >
  </>
  )
}

export default EditOrderForm