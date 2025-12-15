import React, { useRef, useState } from "react";
import { Link } from "react-router";

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		'name': '',
		'phone': '',
		'email': '',
		'password': '',
		'password_confirmation': '',
		'confirm': 0
	});
	const [serverError, setServerError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const inputEmailRef = useRef(null);
	const inputPasswordConfirmRef = useRef(null);
	const form = useRef(null);

	function handleChange(e) {
		const { type, name, value, checked } = e.target;
		const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;

		setFormData(prev => ({
			...prev,
			[name]: newValue,
		}))

		if (name === 'password_confirmation') {
			if (formData.password !== newValue) {
				inputPasswordConfirmRef.current.setCustomValidity('error')
			} else {
				inputPasswordConfirmRef.current.setCustomValidity('')
			}
		}

		if (name === 'email') {
			inputEmailRef.current.setCustomValidity('')
		}
	}

	async function register(e) {
		e.preventDefault();

		const form = e.target;

		if (formData.password !== formData.password_confirmation || formData.password_confirmation === '') {
			inputPasswordConfirmRef.current.setCustomValidity('error')
		} else {
			inputPasswordConfirmRef.current.setCustomValidity('')
		}

		if (!form.checkValidity()) {
			form.classList.add('was-validated');
			return;
		}

		const url = 'https://pets.xn--80ahdri7a.site/api/register';

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.status === 204) {
				setShowModal(true);
				return
			};

			const result = await response.json();
			console.log(result);
			if (!response.ok) {
				if (response.status === 422) {
					form.classList.add('was-validated');
					if (result.error.errors.email && result.error.errors.email.length > 0) {
						inputEmailRef.current.setCustomValidity('error')
						return
					}
				}
			}
		}
		catch (error) {
			setServerError(`Ошибка сервера: ${error}`);
		}
	}

	return (
		<>
			<form onSubmit={register} style={{ maxWidth: '800px' }} className="row g-3 needs-validation px-3 mx-auto my-5" noValidate ref={form}>
				<div className="col-12">
					<label htmlFor="name" className="form-label">Имя*</label>
					<input pattern="[А-ЯЁа-яё \-]+" onChange={handleChange} value={formData.name} placeholder="Иван Иван-Иванович" type="text" className="form-control" name="name" id="name" required />

					<div className="invalid-feedback">
						Обязательное поле, допускается кириллица, пробел, дефис
					</div>
				</div>
				<div className="col-12">
					<label htmlFor="phone" className="form-label">Номер телефона*</label>
					<input pattern="[\d+]+" onChange={handleChange} value={formData.phone} placeholder="89999999999" type="text" className="form-control" name="phone" id="phone" required />

					<div className="invalid-feedback">
						Обязательное поле, цифры, +
					</div>
				</div>
				<div className="col-12">
					<label htmlFor="email" className="form-label">Email*</label>
					<input
						onChange={handleChange}
						value={formData.email}
						placeholder="example@mail.ru"
						type="email"
						pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
						className='form-control'
						name="email"
						id="email"
						required
						ref={inputEmailRef} />

					<div className="invalid-feedback">
						Неверный формат email или такой email уже занят
					</div>
				</div>
				<div className="col-12">
					<label htmlFor="password" className="form-label">Пароль*</label>
					<div className="input-group mb-3">
						<input pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{7,}$" onChange={handleChange} value={formData.password} type={showPassword ? 'text' : 'password'} className="form-control" name="password" id="password" required />
						<button onClick={() => setShowPassword(!showPassword)} className="input-group-text" id="basic-addon1" type="button">{showPassword ? '🐵' : '🙈'}</button>

						<div className="invalid-feedback">
							Обязательное поле, должен содержать заглавную, строчную букву и цифру, длина не менее 7 символов
						</div>
					</div>
				</div>
				<div className="col-12">
					<label htmlFor="passwordСonfirm" className="form-label">Подтвердите пароль*</label>
					<div className="input-group mb-3">
						<input onChange={handleChange} value={formData.password_confirmation} type={showConfirmPassword ? 'text' : 'password'} className="form-control" name="password_confirmation" id="password_confirmation" ref={inputPasswordConfirmRef} />
						<button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="input-group-text" id="basic-addon1" type="button">{showConfirmPassword ? '🐵' : '🙈'}</button>
						<div className="invalid-feedback">
							Пароли не совпадают
						</div>
					</div>
				</div>

				<div className="col-12">
					<div className="form-check">
						<input onChange={handleChange} value={formData.confirm} className='form-check-input' type="checkbox" name="confirm" id="confirm" required />
						<label className="form-check-label" htmlFor="invalidCheck">
							Согласен(а) на обработку персональных данных в соответствии с Политикой конфиденциальности*
						</label>
					</div>
				</div>
				{
					serverError && (
						<div className="alert alert-danger" role="alert">
							{serverError}
						</div>
					)
				}
				<div className="col-12 d-flex justify-content-between w-100">
					<button className="btn btn-dark" type="submit">Зарегистрироваться</button>
					<Link to="/login">Войти</Link>
				</div>
			</form>

			<div className={`modal fade ${showModal ? 'show d-block' : ''}`} style={{ display: showModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header d-flex justify-content-between">
							<h5 className="modal-title">Вы зарегистрированы</h5>
							<button className="btn" onClick={() => window.location.reload()} aria-label="Close" ><img width='24' height='24' src="/images/close-x.svg" alt="Закрыть"/></button>
						</div>
						<div className="modal-body">
							<p>Вы успешно зарегистрировались! Войдите в аккаунт</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary"
								onClick={() => window.location.reload()}>Закрыть</button>
							<Link to="/login" type="button" className="btn btn-primary">Войти</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default RegisterForm