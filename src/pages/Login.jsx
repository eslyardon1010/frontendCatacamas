import Logo from '../assets/logo.png'
import Input from '../components/Input'
// Hooks
import { useState } from 'react'
// Modulos
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
// Utils
import { validarEmail } from '../utils/validaciones'
// Redux
import { useDispatch } from 'react-redux'
import {
	SET_USUARIO,
	SET_CITAS,
	SET_CITAS_CLIENTES,
	SET_CLIENTES,
	SET_CITAS_BARBERO
} from '../redux/usuarioSlice'

const Login = () => {
	// Const
	const navigate = useNavigate()
	const dispatch = useDispatch()

	// useState
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const onClickLogin = async e => {
		e.preventDefault()
		if (!validarCampos()) return false
		if (!validarEmail(email)) return false
		try {
			setEmail(email.toLowerCase().trim())
			setPassword(password.trim())
			let res = await axios.post("https://backend-production-3de4.up.railway.app/login", {
				email,
				password,
			})
			const idUsuario = res.data.idUsuario
			const idRol = res.data.idRol
			if (res.data != '') {
				const { isConfirmed } = await Swal.fire(
					'Sesión iniciada',
					'Iniciaste sesión correctamente',
					'success'
				)
				if (isConfirmed) {
					// * * * * * * * * * *
					localStorage.setItem('idToken', idUsuario) //almacenamos el token
					dispatch(SET_USUARIO(res.data))

					// Obtenemos los datos de nuestras citas cuando somos clientes
					if (idRol == 1) {
						try {
							res = await axios.get(
								'https://backend-production-3de4.up.railway.app/cliente/citas/' + idUsuario
							)
							dispatch(SET_CITAS(res.data))
						} catch (error) {
							console.log(error)
						}
					}

					// Obtenemos nuestras citas cuando somos barberos
					if (idRol == 2) {
						try {
							res = await axios.get('https://backend-production-3de4.up.railway.app/barbero/citas/' + idUsuario)
							dispatch(SET_CITAS_BARBERO(res.data))
						} catch (error) {
							console.log(error);
						}
					}

					// Obtenemos todos los clientes de la barberia
					if (idRol >= 2) {
						try {
							res = await axios.get('https://backend-production-3de4.up.railway.app/clientes')
							dispatch(SET_CLIENTES(res.data))
						} catch (error) {
							console.log(error)
						}
					}

					// Obtenemos las citas de todos los clientes
					if (idRol == 3) {
						// Cargamos las citas
						res = await axios.get('https://backend-production-3de4.up.railway.app/citas')
						dispatch(SET_CITAS_CLIENTES(res.data)) // actualizamos las citas de los clientes
					}
				}
			} else {
				Swal.fire(
					'Error',
					'Las credenciales ingresadas son incorrectas',
					'error'
				)
			}
		} catch (error) {
			Swal.fire('Error', error.name + ': ' + error.message, 'error')
		}
	}

	const validarCampos = () => {
		if (email != '' && password != '') return true
		Swal.fire(
			'Campos vacios',
			'No puedes dejar campos vacíos, intentalo de nuevo',
			'warning'
		)
		return false
	}

	return (
		<div>
			<h1>
				HOLA MUNDO
			</h1>
		</div>
		/* */
	)
}

export default Login
