import React, { useReducer, useRef, useState } from "react";

const AddOrderForm = () => {
  const [formData, setFormData] = useState(
    {
      'name': '',
      'phone': '',
      'email': '',
      'password': '',
      'password_confirmation': '',
      'confirm': 0,
      'photo1': null,
      'photo2': null,
      'photo3': null,
      'kind': '',
      'mark': '',
      'district': '',
      'description': ''
    }
  )

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [register, setRegister] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const registerCheckBox = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordConfirmRef = useRef(null);

  function createFormDataToSend(formData, register) {
    const formDataToSend = new FormData();

    formDataToSend.append('name', formData.name);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('kind', formData.kind);
    formDataToSend.append('district', formData.district);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('mark', formData.mark);
    formDataToSend.append('confirm', formData.confirm.toString());

    if (formData.photo1 instanceof File) formDataToSend.append('photo1', formData.photo1);
    if (formData.photo2 instanceof File) formDataToSend.append('photo2', formData.photo2);
    if (formData.photo3 instanceof File) formDataToSend.append('photo3', formData.photo3);

    if (register) {
      formDataToSend.append('password', formData.password);
      formDataToSend.append('password_confirmation', formData.password_confirmation);
    }

    return formDataToSend;
  }

  async function add(e) {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      inputPasswordConfirmRef.current.setCustomValidity('Error');
    }

    if (!e.target.checkValidity()) {
      e.target.classList.add('was-validated');
      return;
    }

    const formDataToSend = createFormDataToSend(formData, register);

    const url = 'https://pets.xn--80ahdri7a.site/api/pets';
    const response = await fetch(url, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      body: formDataToSend
    })

    const data = await response.json();
    if (!response.ok) {
      if (response.status === 422) {
        inputEmailRef.current.setCustomValidity('Error')
        console.log(data);
        return;
      }
      setError('Ошибка сервера');
      return;
    }
    setShowModal(true);
    setFormData(
      {
        'name': '',
        'phone': '',
        'email': '',
        'password': '',
        'password_confirmation': '',
        'confirm': 0,
        'photo1': null,
        'photo2': null,
        'photo3': null,
        'kind': '',
        'mark': '',
        'district': '',
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

  function handleCheckboxChange(e) {
    e.target.checked ?
      setFormData(prev => ({ ...prev, 'confirm': 1 }))
      : setFormData(prev => ({ ...prev, 'confirm': 0 }))
  }

  return (<>
    <form onSubmit={add} className="row g-3 needs-validation px-3 py-5 mx-auto" style={{ maxWidth: '800px' }} noValidate>
      <div className="col-md-12">
        <label htmlFor="validationCustom03" className="form-label">Имя*</label>
        <input value={formData.name} onChange={handleChange} name="name" pattern="[А-ЯЁа-яё\- ]+" type="text" className="form-control" id="validationCustom03" required />
        <div className="invalid-feedback">
          Обязательное поле или введены недопустимые символы. Разрешена кариллица, пробел, дефис
        </div>
      </div>
      <div className="col-md-12">
        <label htmlFor="validationCustom03" className="form-label">Номер телефона*</label>
        <input value={formData.phone} onChange={handleChange} name="phone" pattern="[\d+]+" type="text" className="form-control" id="validationCustom03" required />
        <div className="invalid-feedback">
          Обязательное поле или неверный формат номера телефона
        </div>
      </div>
      <div className="col-md-12">
        <label htmlFor="validationCustom03" className="form-label">Email*</label>
        <input value={formData.email} onChange={handleChange} ref={inputEmailRef} name="email" type="email" className="form-control" id="validationCustom03" required />
        <div className="invalid-feedback">
          Обязательное поле, неверный формат email или этот email занят
        </div>
      </div>
      <div className="col-md-12">
        <input ref={registerCheckBox} onChange={(e) => { setRegister(e.target.checked ? true : false) }} checked={register} className="form-check-input me-1" type="checkbox" id="firstCheckbox" />
        <label className="form-check-label" htmlFor="firstCheckbox">Прикрепить аккаунт / Зарегистрироваться</label>
      </div>
      <div style={{ display: register ? 'block' : 'none' }}>
        <div className="col-12">
          <label htmlFor="password" className="form-label">Пароль*</label>
          <div className="input-group mb-3">
            <input name="password" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{7,}$" onChange={handleChange} value={register ? formData.password : ''} type={showPassword ? 'text' : 'password'} className="form-control" id="password" required={register} />
            <button onClick={() => setShowPassword(!showPassword)} className="input-group-text" type="button">{showPassword ? '🐵' : '🙈'}</button>
            <div className="invalid-feedback">
              Обязательное поле, должен содержать заглавную, строчную букву и цифру, длина не менее 7 символов
            </div>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="passwordСonfirm" className="form-label">Подтвердите пароль*</label>
          <div className="input-group mb-3">
            <input ref={inputPasswordConfirmRef} name="password_confirmation" onChange={handleChange} value={register ? formData.password_confirmation : ''} type={showConfirmPassword ? 'text' : 'password'} className="form-control" id="password_confirmation" required={register} />
            <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="input-group-text" type="button">{showConfirmPassword ? '🐵' : '🙈'}</button>
            <div className="invalid-feedback">
              Пароли не совпадают или подтверждение не введено
            </div>
          </div>
        </div>
      </div>
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
        <label htmlFor="validationCustom03" className="form-label">Район*</label>
        <input value={formData.district} onChange={handleChange} name="district" type="text" className="form-control" id="validationCustom03" required />
        <div className="invalid-feedback">
          Обязательное поле
        </div>
      </div>
      <div className="col-md-12">
        <label htmlFor="validationCustom03" className="form-label">Описание*</label>
        <textarea value={formData.description} onChange={handleChange} name="description" className="form-control" id="validationCustom03" required />
        <div className="invalid-feedback">
          Обязательное поле
        </div>
      </div>
      <div className="col-12">
        <div className="form-check">
          <input onChange={handleCheckboxChange} value={formData.confirm} className='form-check-input' type="checkbox" name="confirm" id="confirm" required />
          <label className="form-check-label" htmlFor="invalidCheck">
            Согласен(а) на обработку персональных данных в соответствии с Политикой конфиденциальности*
          </label>
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
                <button className="btn" onClick={() => window.location.reload()} aria-label="Close" ><img width='24' height='24' src="/images/close-x.svg" alt="Закрыть" /></button>
              </div>
              <div className="modal-body">
                <p>Объявление добавлено</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
                  onClick={() => window.location.reload()}>Закрыть</button>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-dark" type="submit">Submit form</button>
      </div>
    </form >
  </>
  )
}

export default AddOrderForm