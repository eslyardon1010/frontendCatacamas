// Modulos
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	SET_USUARIO,
	SET_CITAS,
	SET_CITAS_CLIENTES,
	SET_CLIENTES,
	SET_CITAS_BARBERO,
} from './redux/usuarioSlice'
import axios from 'axios'

// Imagen
import Cargando from './assets/cargando.svg'

// Pages
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import NoPage from './pages/NoPage'
import Perfil from './pages/Perfil'
import LayoutDashboard from './components/LayoutDashboard'
import Barberos from './pages/Barberos'
import Clientes from './pages/Clientes'
import Citas from './pages/Citas'
import Negocio from './pages/Negocio'
import Resenas from './pages/Resenas'
import Cliente from './pages/Cliente'

function App() {
	const dispatch = useDispatch() // se usa para ejecutar una accion con mi estado (actualizarlo)
	const usuarioSlice = useSelector(state => state.usuario) // obtengo el estado
	const [isLoading, setIsLoading] = useState(true) // me indica si debo mostrar el spinner

	useEffect(() => {
		const idToken = localStorage.getItem('idToken') //obtengo la variable local idToken que contiene la idUsuario
		getDatosUsuario(idToken) // ejecutamos funcion para cargar los datos del usuario

		setTimeout(() => {
			setIsLoading(false)
		}, 500)
	}, [])

	const getDatosUsuario = async idToken => {
		const res = await axios.get('https://backend-production-3de4.up.railway.app/datos/' + idToken) // cargamos datos del backend con ayuda del id
		dispatch(SET_USUARIO(res.data)) // Actualizamos el estado del usuario
		if (res.data.idRol == 1) getCitasCliente(res.data.idUsuario) // Obtenemos los datos de nuestras citas cuando somos clientes
		if (res.data.idRol == 2) getCitasBarbero(res.data.idUsuario) // Obtenemos las citas del barbero
		if (res.data.idRol >= 2) getClientes() // Obtenemos todos los clientes de la barberia
		if (res.data.idRol == 3) getCitasDeClientes() // Obtenemos las citas de todos los clientes
	}

	const getCitasCliente = async id => {
		try {
			const res = await axios.get('https://backend-production-3de4.up.railway.app/cliente/citas/' + id)
			dispatch(SET_CITAS(res.data)) // actualizamos las citas del usuario
		} catch (error) {
			console.log(error)
		}
	}

	const getCitasBarbero = async idBarbero => {
		try {
			const res = await axios.get(
				'https://backend-production-3de4.up.railway.app/barberos/citas/' + idBarbero
			)
			dispatch(SET_CITAS_BARBERO(res.data))
		} catch (error) {
			console.log(error)
		}
	}

	const getCitasDeClientes = async () => {
		try {
			const res = await axios.get('https://backend-production-3de4.up.railway.app/citas')
			dispatch(SET_CITAS_CLIENTES(res.data)) // actualizamos las citas de los clientes
		} catch (error) {
			console.log(error)
		}
	}

	const getClientes = async () => {
		try {
			const res = await axios.get('https://backend-production-3de4.up.railway.app/clientes')
			dispatch(SET_CLIENTES(res.data))
		} catch (error) {
			console.log(error)
		}
	}

	if (isLoading) {
		return (
			<div className='bg-white absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center'>
				<div className='w-[60px] h-[60px] '>
					<img src={Cargando} alt='Spinner' />
				</div>
			</div>
		)
	}

	return (
		<BrowserRouter>
			<Routes>
				{/* plantilla header y footer */}
				<Route
					path='/'
					element={
							<Navigate to='/login' />
						
					}
				/>

				{/* Plantilla en blanco */}
				<Route
					path='/citas'
					element={
						usuarioSlice.idUsuario != null ? (
							usuarioSlice.idRol == 1 ? (
								<Cliente />
							) : (
								<Navigate to='/dashboard' />
							)
						) : (
							<Navigate to='/login' />
						)
					}
				/>
				<Route
					path='/login'
					element={
						usuarioSlice.idUsuario != null ? (
							<Navigate to='/dashboard' />
						) : (
							<Login />
						)
					}
				/>
				<Route
					path='/cliente/register'
					element={
						usuarioSlice.idUsuario != null ? (
							<Navigate to='/dashboard' />
						) : (
							<Register />
						)
					}
				/>
				<Route
					path='/perfil'
					element={
						usuarioSlice.idUsuario != null ? (
							<Perfil />
						) : (
							<Navigate to='/login' />
						)
					}
				/>

				{/* Plantilla con dashboard */}
				<Route
					path='/dashboard'
					element={
						usuarioSlice.idUsuario != null ? (
							usuarioSlice.idRol != 1 ? (
								<LayoutDashboard />
							) : (
								<Navigate to='/citas' />
							)
						) : (
							<Navigate to='/login' />
						)
					}
				>
					<Route
						index
						element={
							usuarioSlice.idRol == 1 ? (
								<Navigate to='/cliente' />
							) : usuarioSlice.idRol == 2 ? (
								<Navigate to='/dashboard/citas' />
							) : (
								<Navigate to='/dashboard/negocio' />
							)
						}
					/>
					<Route
						path='negocio'
						element={
							usuarioSlice.idRol == 1 ? (
								<Navigate to='/cliente' />
							) : usuarioSlice.idRol == 2 ? (
								<Navigate to='/dashboard/citas' />
							) : (
								<Negocio />
							)
						}
					/>
					<Route
						path='citas'
						element={
							usuarioSlice.idRol == 1 ? (
								<Navigate to='/cliente' />
							) : (
								usuarioSlice.idRol >= 2 && <Citas />
							)
						}
					/>
					<Route
						path='clientes'
						element={
							usuarioSlice.idRol == 1 ? (
								<Navigate to='/cliente' />
							) : (
								usuarioSlice.idRol >= 2 && <Clientes />
							)
						}
					/>
					<Route
						path='barberos'
						element={
							usuarioSlice.idRol == 1 ? (
								<Navigate to='/cliente' />
							) : usuarioSlice.idRol == 2 ? (
								<Navigate to='/dashboard/citas' />
							) : (
								<Barberos />
							)
						}
					/>

<Route
						path='tecnicos'
						element={
							usuarioSlice.idRol == 1 ? (
								<Navigate to='/cliente' />
							) : usuarioSlice.idRol == 2 ? (
								<Navigate to='/dashboard/citas' />
							) : (
								<Barberos />
							)
						}
					/>
					<Route path='resenas' element={<Resenas />} />
				</Route>
				
			</Routes>
		</BrowserRouter>
	)
}

export default App
