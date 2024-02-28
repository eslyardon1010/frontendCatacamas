// Iconos
import { GiMoneyStack } from 'react-icons/gi'
import { AiOutlineCheck, AiOutlinePlusCircle } from 'react-icons/ai'
import { MdOutlinePending, MdOutlineCancel } from 'react-icons/md'
// Componentes
import DashboardHeader from '../components/DashboardHeader'
import CardWidget from '../components/CardWidget'
import Select from '../components/Select'
import Input from '../components/Input'
import SmallButton from '../components/SmallButton'
import BigButton from '../components/BigButton'
import VentanaModal from '../components/VentanaModal'
import ServicioAgregadoCard from '../components/ServicioAgregadoCard'
import CitaRow from '../components/CitaRow'
// Modulos
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment-timezone'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
import { formatearDuracion, formatearHora } from '../utils/formateo'
import { UPDATE_CITA, SET_CITAS } from '../redux/usuarioSlice'

const Cliente = () => {
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * *	G L O B A L E S		* * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	const fechaActual = moment().tz('America/Mexico_City').format('YYYY-MM-DD')
	const usuarioSlice = useSelector(state => state.usuario)
	const dispatch = useDispatch()

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * *	U S E		S T A T E		* * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	const [buscador, setBuscador] = useState('')
	const [agregando, setAgregando] = useState(false) // me ayuda a saber si el cliente agrego recientemente un servicio a la lista
	const [agregandoHorario, setAgregandoHorario] = useState(false) // ayuda a actualizar el estado de los horariosDisponibles
	const [ventanaModal, setVentanaModal] = useState(false)
	// = = = = = = = = = = =
	const [fechaSeleccionada, setFechaSeleccionada] = useState(
		moment().tz('America/Mexico_City').format('YYYY-MM-DD')
	)
	const [servicioSeleccionado, setServicioSeleccionado] = useState({
		idServicio: '',
		nombre: '',
		precio: '',
		imagen: '',
		duracion: '',
	})
	const [barberoSeleccionado, setBarberoSeleccionado] = useState({
		idUsuario: '',
		email: '',
		nombre: '',
		ap_paterno: '',
		ap_materno: '',
		telefono: '',
		foto: '',
	})
	// = = = = = = = = = =
	const [cita, setCita] = useState({
		hora: '',
		fecha: '',
		duracion: 0,
		total_pagar: 0,
		servicios: [],
		idCliente: usuarioSlice.idUsuario,
		idBarbero: '',
		nombreProductor: '',
	})
	// = = = = = = =
	const [horariosDisponibles, setHorariosDisponibles] = useState([])
	const [servicios, setServicios] = useState([])
	const [barberos, setBarberos] = useState([])

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * *	U S E		E F F E C T		* * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// useEffect para cargar los barberos y los servicios
	useEffect(() => {
		getBarberos() // Cargamos los barberos de la bd
		getServicios() //cargamos los servicios de la bd
	}, [])

	// useEffect para actualizar los servicios disponibles despues de agregar uno
	useEffect(() => {
		// if (agregando) {
		const serviciosFiltrados = servicios?.filter(
			servicio => !cita.servicios.includes(servicio)
		)
		setServicios(serviciosFiltrados)
		// setAgregando(false)
		// }
	}, [cita])

	// useEffect que actualiza los horarios disponibles cada vez que se agregue / elimine un servicio del carrito o cuando se seleccione otro barbero
	useEffect(() => {
		if (barberoSeleccionado.idUsuario != '' && cita.servicios?.length != 0) {
			getHorariosDisponibles()
		}
	}, [cita, barberoSeleccionado, fechaSeleccionada])

	// Actualizar en el estado cita el atributo idBarbero
	useEffect(() => {
		setCita({
			...cita,
			hora: '',
			idBarbero: barberoSeleccionado.idUsuario,
			
		})
	}, [barberoSeleccionado])

	// Actualiza el estado de la cita para asignar la hora a '' cuando se modifica la fecha de la cita
	useEffect(() => {
		setCita({
			...cita,
			fecha: fechaSeleccionada,
			hora: '',
		})
		setAgregandoHorario(true)
	}, [fechaSeleccionada])


	

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * *		F U N C I O N E S		* * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	// Obtiene los barberos de la bd
	const getBarberos = async () => {
		try {
			const res = await axios.get('backend-production-3de4.up.railway.app/barberos')
			setBarberos(res.data)
		} catch (error) {
			console.log(error.message)
		}
	}

	// Obtiene los servicios de la bd
	const getServicios = async () => {
		try {
			const res = await axios.get('backend-production-3de4.up.railway.app/servicios')
			setServicios(res.data)
		} catch (error) {
			console.log(error.message)
		}
	}

	const calcularPromedio = () => {
		const totalPagar = usuarioSlice.citas?.reduce(
			(acomulador, cita) =>
				cita.estado == 2 ? acomulador + cita.total_pagar : acomulador,
			0
		)
		const promedio =
			totalPagar /
			usuarioSlice.citas?.reduce(
				(suma, cita) => (cita.estado == 2 ? suma + 1 : suma),
				0
			)
		return !isNaN(promedio) ? promedio.toFixed(2) : 0
	}

	// Limpia todo el formulario despues de insertar a la bd
	const limpiarTodo = () => {
		setAgregandoHorario(false)
		setBarberoSeleccionado({
			idUsuario: '',
			email: '',
			nombre: '',
			ap_paterno: '',
			ap_materno: '',
			telefono: '',
			foto: '',
		})
		// pasamos los servicios de nuestra lista a la lista global
		setServicios([...servicios, ...cita.servicios])
		setCita({
			hora: '',
			fecha: moment().tz('America/Mexico_City').format('YYYY-MM-DD'),
			duracion: 0,
			total_pagar: 0,
			servicios: [],
			idCliente: usuarioSlice.idUsuario,
			idBarbero: '',
			nombreProductor: ''
		})
		setServicioSeleccionado({
			idServicio: '',
			nombre: '',
			precio: '',
			imagen: '',
			duracion: '',
		})
		setHorariosDisponibles([])
	}

	// Me valida los inputs vacios
	const validarInputsVacios = () => {
		if (barberoSeleccionado.idUsuario == '') return true
		return false
	}

	// Obtener los horarios disponibles segun el barbero y la fecha seleccionada
	const getHorariosDisponibles = async () => {
		try {
			const dia = fechaSeleccionada.slice(8, 10)
			const mes = fechaSeleccionada.slice(5, 7)
			const anio = fechaSeleccionada.slice(0, 4)
			const fecha = new Date(anio, mes - 1, dia)
			const numeroDia = fecha.getDay()
			const horario = await axios.get(
				`backend-production-3de4.up.railway.app/horario/${barberoSeleccionado.idUsuario}/${numeroDia}`
			)
			// console.log(horario.data) // me retorna un arreglo
			const citas = await axios.get(
				`backend-production-3de4.up.railway.app/citas/${barberoSeleccionado.idUsuario}/${fechaSeleccionada}`
			)

			// Validamos si trabaja ese dia
			if (horario.data?.length == 0) {
				Swal.fire(
					'¡Uyyy!',
					'El tecnico no trabaja este dia, elige otro o cambia la fecha',
					'warning'
				)
				setHorariosDisponibles([])
			} else {
				let espaciosDisponibles = []
				// Recorremos cada horario
				for (let i = 0; i < horario.data?.length; i++) {
					const horaInicioBarbero = new Date(
						`${fechaSeleccionada}T${horario.data[i].hora_inicio}`
					)
					const horaFinBarbero = new Date(
						`${fechaSeleccionada}T${horario.data[i].hora_fin}`
					)
					let horaActual = horaInicioBarbero
					let horaActualFin = new Date(
						horaActual.getTime() + cita.duracion * 60000
					)

					// Mietras estemos dentro del rango del horario
					while (
						horaActual < horaFinBarbero &&
						horaActualFin < horaFinBarbero
					) {
						// Verificamos si el espacio de tiempo está disponible
						let disponible = true

						// Recorremos las citas agendadas para el mismo día y verificamos si se superponen
						for (let j = 0; j < citas.data?.length; j++) {
							const fechaCita = new Date(`${(citas.data[j].fecha).slice(0, 10)}T00:00:00`)
							const horaCita = citas.data[j].hora
							const duracionCitaExistente = citas.data[j].duracion
							const horaInicioCita = new Date(`${fechaCita.getFullYear()}-${fechaCita.getMonth() > 9 ? fechaCita.getMonth() + 1 : '0' + (fechaCita.getMonth() + 1)}-${fechaCita.getDate() > 9 ? fechaCita.getDate() : '0' + fechaCita.getDate()}T${horaCita}`
							)
							const horaFinCita = new Date(
								horaInicioCita.getTime() + duracionCitaExistente * 60000
							)
							// console.log('= = = = = = = = = = = = =');
							// console.log(`horaActual: ${horaActual}`);
							// console.log(`horaActualFin: ${horaActualFin}`);
							// console.log(`horaInicioCita: ${horaInicioCita}`);
							// console.log(`horaFinCita: ${horaFinCita}`);
							// console.log('= = = = = = = = = = = = =\n\n');

							// Si se superpone, no está disponible
							if (
								(horaActual >= horaInicioCita && horaActual <= horaFinCita) ||
								(horaActual <= horaInicioCita &&
									horaActualFin >= horaInicioCita)
							) {
								disponible = false
								horaActual = horaFinCita
								horaActual.setMinutes(horaActual.getMinutes() + 1)
								break
							}
						}
						// Si está disponible, lo agregamos al arreglo de espacios disponibles
						if (disponible) {
							const hora_inicio = horaActual.toLocaleTimeString('en-US', {
								hour12: false,
								hour: '2-digit',
								minute: '2-digit',
							})
							const hora_fin = new Date(
								horaActual.getTime() + cita.duracion * 60000
							).toLocaleTimeString('en-US', {
								hour12: false,
								hour: '2-digit',
								minute: '2-digit',
							})
							espaciosDisponibles.push({ id: uuidv4(), hora_inicio, hora_fin })

							// Incrementamos la hora actual para el siguiente espacio de tiempo
							horaActual = new Date(
								horaActual.getTime() + cita.duracion * 60000
							)
							horaActual.setMinutes(horaActual.getMinutes() + 1)
						}
						horaActualFin = new Date(
							horaActual.getTime() + cita.duracion * 60000
						)
					}
				}
				setHorariosDisponibles(espaciosDisponibles)

				if (espaciosDisponibles?.length == 0) {
					Swal.fire(
						'¡Uyyy!',
						'No hay horarios disponibles para ese día',
						'warning'
					)
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	// Funcion para agregara un nuevo servicio a la lista
	const handleAgregarServicio = e => {
		e.preventDefault()
		// limpiamos la hora si es que la tenia seleccionada
		setCita({
			...cita,
			fecha: fechaSeleccionada,
			hora: ''
		})
		// setAgregando(true)
		const changeStateValue = (name, value) => {
			setCita({
				...cita,
				[name]: value,
			})
		}

		// Establecer nuevo total a pagar
		let totalPagar = cita.total_pagar
		totalPagar += servicioSeleccionado.precio
		// Establecer nueva duracion de servicio
		let nuevaDuracion = cita.duracion
		nuevaDuracion += servicioSeleccionado.duracion
		setCita({
			...cita,
			servicios: [...cita.servicios, servicioSeleccionado],
			total_pagar: totalPagar,
			duracion: nuevaDuracion,
		})
		setServicioSeleccionado({
			idServicio: '',
			nombre: '',
			precio: '',
			imagen: '',
			duracion: '',
		})
	}

	// Funcion para remover servicio de la lista
	const handleRemoveServicio = (e, id) => {
		e.preventDefault()
		// limpiamos la hora si es que la tenia seleccionada
		setCita({
			...cita,
			fecha: '',
			hora: '',
		})

		// buscamos el servicio que vamos a eliminar de la lista de servicios de nuestra cita
		const servicio = cita.servicios.find(servicio => servicio.idServicio == id)

		// Quitamos el precio del servicio de nuestro precio de la cita
		let totalPagar = cita.total_pagar
		totalPagar -= servicio.precio

		// Quitamos la duracion del servicio de la duracion de la cita
		let nuevaDuracion = cita.duracion
		nuevaDuracion -= servicio.duracion

		setCita({
			...cita,
			servicios: cita.servicios?.filter(servicio => servicio.idServicio != id),
			total_pagar: totalPagar,
			duracion: nuevaDuracion,
		})

		// Agregamos el servicio nuevamente a la lista de servicios
		setServicios([...servicios, servicio])
	}

	const validarReserveCita = () => {
		if (cita.hora == '') {
			Swal.fire('Error', 'Debes seleccionar una hora para tu cita', 'error')
			return false
		}
		if (cita.fecha == '') {
			Swal.fire('Error', 'Debes seleccionar una fecha para tu cita', 'error')
			return false
		}
		if (cita.servicios?.length == 0) {
			Swal.fire('Error', 'Debes al menos un servicios', 'error')
			return false
		}
		if (cita.duracion == 0) {
			Swal.fire(
				'Error',
				'Ocurrio un error, contacta al soporte para solucionarlo',
				'error'
			)
			return false
		}
		if (cita.total_pagar == 0) {
			Swal.fire(
				'Error',
				'Ocurrio un error, contacta al soporte para solucionarlo',
				'error'
			)
			return false
		}
		if (cita.idCliente == 0) {
			Swal.fire(
				'Error',
				'Ocurrio un error, contacta al soporte para solucionarlo',
				'error'
			)
			return false
		}
		if (cita.idBarbero == 0) {
			Swal.fire('Error', 'Debes seleccionar un tecnico', 'error')
			return false
		}
		return true
	}

	// Funcion cuando se reserva la cita
	const handleReservarCita = async e => {
		e.preventDefault()
		if (validarReserveCita() == false) return

		try {
			let res = await axios.post(
				'backend-production-3de4.up.railway.app/cliente/agendar-cita',
				cita
			)
			if (res.data.affectedRows > 0) {
				const id = res.data.insertId

				let estado = true
				cita.servicios.forEach(async servicio => {
					res = await axios.post(
						'backend-production-3de4.up.railway.app/cliente/agregar-servicio',
						{ idCita: id, idServicio: servicio.idServicio }
					)
					if (res.data.affectedRows == 0) estado = false
				})

				if (!estado) {
					Swal.fire(
						'Error',
						'Ocurrio un error al insertar los servicios a la tabla cita_servicio',
						'error'
					)
				} else {
					Swal.fire(
						'Cita agendada',
						'La cita se agendo correctamente',
						'success'
					)
					limpiarTodo()
					setVentanaModal(false)

					// Consultamos a la bd las citas y las actualizamos en el estado global
					res = await axios.get(
						'backend-production-3de4.up.railway.app/cliente/citas/' + usuarioSlice.idUsuario
					)
					dispatch(SET_CITAS(res.data)) // actualizamos las citas del usuario
				}
			}
		} catch (error) {
			Swal.fire('Error', error.name + ': ' + error.message, 'error')
		}
	}

	// Funcion para cancelar una cita
	const handleCancelarCita = async idCita => {
		const res = await Swal.fire({
			title: 'Cancelar cita',
			text: '¿Estas seguro que quieres cancelar esta cita? No podras deshacer esta acción',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonText: 'No',
			cancelButtonColor: '#d33',
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Si, cancelar',
		})
		if (res.isConfirmed) {
			// Actualizamos en la bd
			const respuesta = await axios.put(
				'backend-production-3de4.up.railway.app/cita/' + idCita,
				{ estado: 3 }
			)
			if (respuesta.data.affectedRows > 0) {
				Swal.fire(
					'Cita cancelada',
					'La cita fue cancelada correctamente',
					'success'
				)
				// Actualizamos en el estado global]
				dispatch(UPDATE_CITA([idCita, { estado: 3 }]))
			}
		}
	}

	const handleFiltro = () => {}
	const handleBuscador = () => {}

	return (
		<>
			{ventanaModal && (
				<VentanaModal
					cerrarModal={() => setVentanaModal(false)}
					titulo='Agendar cita'
				>
					<div className='grid grid-cols-4 gap-6'>
						<div className='col-span-2 flex flex-col gap-y-4'>
							<div>
								{/* Barberos */}
								<h4 className='text-base font-semibold text-gray-600'>
									Tecnicos
								</h4>
								<div className='w-full'>
									<Select
										id='selectorBarbero'
										opciones={barberos.map(barbero => ({
											value: barbero.idUsuario,
											texto: `${barbero.nombre} ${barbero.ap_paterno} ${barbero.ap_materno}`,
										}))}
										onChange={e =>
											setBarberoSeleccionado(
												barberos.find(
													barbero => barbero.idUsuario == e.target.value
												)
											)
										}
										value={barberoSeleccionado.idUsuario}
									/>
								</div>
							</div>
							<div>
								{/* Servicios */}
								<h4 className='text-base font-semibold text-gray-600'>
									Servicios
								</h4>
								<div className='w-full'>
									<Select
										id='selectorServicio'
										opciones={servicios.map(servicio => ({
											value: servicio.idServicio,
											texto: `${servicio.nombre}`,
										}))}
										onChange={e =>
											setServicioSeleccionado(
												servicios.find(
													servicio => servicio.idServicio == e.target.value
												)
											)
										}
										value={servicioSeleccionado.idServicio}
									/>
								</div>
							</div>
							{servicioSeleccionado.idServicio != '' && (
								<div className='border min-h-[50px] select-none'>
									<div className='flex h-[150px] gap-x-5'>
										<div className='w-2/5'>
											<div className='w-[150px] h-[150px]' hidden>
												<img src={servicioSeleccionado.imagen} alt='' />
											</div>
										</div>
										<div className='w-3/5 py-1'>
											<div className='flex'>
												<h4 className='min-w-[100px] text-md font-semibold text-gray-800'>
													Nombre
												</h4>
												<p className='text-lg font-light text-[var(--colorPrimario)]'>
													{servicioSeleccionado.nombre}
												</p>
											</div>
											<div className='flex'>
												<h4 className='min-w-[100px] text-md font-semibold text-gray-800'>
													
												</h4>
												<p className='text-lg font-light text-[var(--colorPrimario)]' hidden>
													${servicioSeleccionado.precio}
												</p>
											</div>
											<div className='flex mb-3'>
												<h4 className='min-w-[100px] text-md font-semibold text-gray-800'>
													
												</h4>
												<p className='text-lg font-light text-[var(--colorPrimario)]' hidden>
													{formatearDuracion(servicioSeleccionado.duracion)}
												</p>
											</div>
											<div>
												{servicioSeleccionado != '' && (
													<SmallButton
														type='submit'
														texto='Agregar'
														onClick={e => handleAgregarServicio(e)}
														desactivado={false}
													/>
												)}
											</div>
										</div>
									</div>
								</div>
							)}
							{/* poner aqui */}
							{cita.servicios?.length > 0 && (
								<>
									{/* Seleccionar dia */}
									<div className='col-span-2 flex flex-col gap-y-3 mt-5'>
										<div>
											<div className='flex flex-col w-full gap-y-1'>
												<label
													htmlFor='correo'
													className='text-base font-semibold text-gray-600'
												>
													Selecciona la fecha
												</label>
												<input
													autoComplete='off'
													type='date'
													name='fecha'
													id='fecha'
													value={fechaSeleccionada}
													onChange={e => setFechaSeleccionada(e.target.value)}
													min={fechaActual}
													disabled={
														barberoSeleccionado.idUsuario == '' ? true : false
													}
													className='w-full outline-none border border-gray-200 duration-200 focus:border-[var(--colorPrimario)] px-3 py-2 text-sm'
												/>
											</div>
										</div>
										{/* Seleccionar hora */}
										<div className='col-span-2 flex flex-col justify-between'>
											<h4 className='text-base font-semibold text-gray-600'>
												Selecciona la hora
											</h4>
											<div className='w-full'>
												<Select
													id='selectorHora'
													opciones={horariosDisponibles.map(horario => ({
														value: `${horario.hora_inicio}:00`,
														texto: `${formatearHora(
															horario.hora_inicio
														)}    -     ${formatearHora(horario.hora_fin)}`,
													}))}
													disabled={
														barberoSeleccionado.idUsuario == '' ? true : false
													}
													onChange={e =>
														setCita({ ...cita, hora: e.target.value })
													}
													value={cita.hora}
												/>
											</div>
										</div>
										<div className='col-span-2 flex flex-col justify-between'>
											<h4 className='text-base font-semibold text-gray-600'>
												Ingrese el nombre del productor
											</h4>
											<div className='w-full'>
												<input type="text"

												id='nombreProductor'
												onChange={e =>
													setCita({ ...cita, nombreProductor: e.target.value })
												}
												value={cita.nombreProductor}
												 className='w-full outline-none border border-gray-200 duration-200 focus:border-[var(--colorPrimario)] px-3 py-2 text-sm'
												 
												 />
											</div>
										</div>
									</div>
								</>
							)}
						</div>
						{/* Ver servicios agregados */}
						<div className='col-span-2'>
							{cita.servicios?.length == 0 ? (
								<div className='min-h-[100px] bg-[#fcfcfcfa] shadow-sm p-8 '>
									<p className='font-light'>
										Aun no has agregado ningun servicio
									</p>
								</div>
							) : (
								<div className=' bg-[#fcfcfcfa] shadow-sm p-8 overflow-y-auto flex flex-col gap-y-3 text-gray-800'>
									<h3 className='font-bold text-lg'>Resumen</h3>
									<h4 className='font-semibold'>
										Tecnico:
										<span className='font-light'>{` ${barberoSeleccionado.nombre} ${barberoSeleccionado.ap_paterno} ${barberoSeleccionado.ap_materno}`}</span>
									</h4>
									<h4 className='font-semibold'>
										Fecha:
										<span className='font-light'>{` ${fechaSeleccionada}`}</span>
									</h4>
									<h4 className='font-semibold'>
										Hora:
										<span className='font-light'>{` ${
											cita.hora == '' ? '' : formatearHora(cita.hora)
										}`}</span>
									</h4>
									<h4 className='font-semibold' hidden>
										Duración:
										<span className='font-light'>{` ${formatearDuracion(
											cita.duracion
										)}`}</span>
									</h4>
									<h4 className='font-semibold'>Servicios agregados</h4>
									<div className='flex flex-col gap-y-2 mb-3'>
										{cita.servicios.map(servicio => (
											<ServicioAgregadoCard
												key={servicio.idServicio}
												nombre={servicio.nombre}
												onClick={e =>
													handleRemoveServicio(e, servicio.idServicio)
												}
											/>
										))}
										<div className='px-4 flex items-center justify-between select-none'>
											<h5 className='font-semibold text-sm' hidden>Total a pagar</h5>
											<p className='font-semibold text-gray-800' hidden>
											
											</p>
										</div>--
									</div>
									<SmallButton
										type='submit'
										texto='Reservar cita'
										onClick={e => handleReservarCita(e)}
										desactivado={validarInputsVacios()}
									/>
								</div>
							)}
						</div>
					</div>
				</VentanaModal>
			)}
			<DashboardHeader largo={true} />
			<div className='mt-[100px] bg-[#F5F8FE] min-h-[calc(100vh-100px)] p-[50px] 2xl:px-[100px]'>
				{/* Contenedor de widgets */}
				<div className='grid grid-cols-4 gap-x-6 gap-y-12 mb-10'>
					<CardWidget
						texto='Citas completadas'
						numero={
							usuarioSlice.citas?.filter(cita => cita.estado == 2)?.length
						}
						icono={<AiOutlineCheck className='text-2xl text-white' />}
						color='bg-green-500'
					/>
					<CardWidget
						texto='Citas pendientes'
						numero={
							usuarioSlice.citas?.filter(cita => cita.estado == 0)?.length
						}
						icono={<MdOutlinePending className='text-2xl text-white' />}
						color='bg-blue-500'
					/>
					<CardWidget
						texto='Citas canceladas'
						numero={
							usuarioSlice.citas?.filter(cita => cita.estado == 3)?.length
						}
						icono={<MdOutlineCancel className='text-2xl text-white' />}
						color='bg-red-500'
					/>
					
					<div className='col-span-4 2xl:col-span-1 2xl:col-start-4 2xl:row-start-2'>
						<div className='p-10 bg-[#fff] rounded-sm shadow-md flex justify-between gap-y-8 2xl:flex-col'>
							<form className='flex flex-col gap-y-2 w-1/3 2xl:w-full'>
								<Input
									label='Buscar'
									type='search'
									name='dato'
									id='dato'
									placeholder='Escribe algun dato'
									value={buscador}
									onChange={e => setBuscador(e.target.value)}
								/>
								<SmallButton
									type='submit'
									texto='Buscar'
									onClick={() => handleBuscador()}
									desactivado={false}
								/>
							</form>
							<div className='w-1/3 2xl:w-full'>
								<h4 className='text-base font-semibold text-gray-600'>
									Filtrar por
								</h4>
								<Select
									id='selectorCitaFiltro'
									opciones={[
										{ value: '1', texto: 'Recientes - Antiguas' },
										{ value: '2', texto: 'Antiguas - Recientes' },
										{ value: '3', texto: '1 Mes' },
										{ value: '4', texto: '3 Meses' },
										{ value: '5', texto: '6 Meses' },
										{ value: '6', texto: '1 Año' },
										{ value: '7', texto: 'Desde el inicio' },
									]}
									value=''
									onChange={() => handleFiltro()}
								/>
							</div>
							<BigButton
								type='submit'
								texto='Agendar cita'
								icono={<AiOutlinePlusCircle className='text-xl' />}
								onClick={() => setVentanaModal(true)}
							/>
						</div>
					</div>
					<div className='col-span-4 2xl:col-span-3 2xl:col-start-1 2xl:row-start-2'>
						<div className='min-h-[300px] p-14 bg-[#fff] rounded-sm shadow-md'>
							{usuarioSlice.citas?.length == 0 ? (
								<p className='text-lg font-semibold text-gray-700'>
									No hay citas
								</p>
							) : (
								<>
									<h2 className='text-lg font-bold text-gray-700'>Citas</h2>
								
									{/* Contenedor de las Cards */}
									<div className='w-full h-max my-10'>
										<table className='w-full bg-white rounded-lg shadow-sm select-none'>
											<thead>
												<tr className='h-[50px] text-gray-500 text-base border-b'>
													<th className='font-medium px-5 py-3'>Estado</th>
													<th className='font-medium px-5 py-3'>Fecha</th>
													<th className='font-medium px-5 py-3'>Hora</th>
													<th className='font-medium px-5 py-3'>Duración</th>
													<th className='font-medium px-5 py-3'>Tecnico</th>
													<th className='font-medium px-5 py-3'>Servicios</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{usuarioSlice.citas?.map(cita => (
													<CitaRow
														key={cita.idCita}
														cita={cita}
														onClick={() => handleCancelarCita(cita.idCita)}
													/>
												))}
											</tbody>
										</table>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Cliente
