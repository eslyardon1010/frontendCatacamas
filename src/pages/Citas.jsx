// Componentes
import DashboardHeader from '../components/DashboardHeader'
import DashboardContainer from '../components/DashboardContainer'
import BuscadorAdmin from '../components/BuscadorAdmin'
import CitaCard from '../components/CitaCard'
import CardWidget from '../components/CardWidget'
import Select from '../components/Select'
import CitaBarberoCard from '../components/CitaBarberoCard'

// Iconos
import { BsCardList, BsClock } from 'react-icons/bs'
import { AiOutlineCheck } from 'react-icons/ai'
import { FiAlertTriangle } from 'react-icons/fi'

// Modulos
import Swal from 'sweetalert2'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {
	formatearFecha,
	formatearDuracion,
	formatearHora,
} from '../utils/formateo'
import {
	UPDATE_CITAS_CLIENTES,
	UPDATE_CITAS_BARBERO,
} from '../redux/usuarioSlice'

const Citas = () => {
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * *	G L O B A L E S		* * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	const usuarioSlice = useSelector(state => state.usuario)
	const dispatch = useDispatch()

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * *		F U N C I O N E S		* * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// Funcion para cancelar una cita
	const handleCambiarEstadoCita = async (idCita, nuevoEstado) => {
		const res = await Swal.fire({
			title: '¿Cambiar estado?',
			text: '¿Estas seguro que quieres cambiar el estado de esta cita?',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonText: 'No',
			cancelButtonColor: '#d33',
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Si, cambiar',
		})
		if (res.isConfirmed) {
			// Actualizamos en la bd
			const respuesta = await axios.put(
				'backend-production-3de4.up.railway.app/cita/' + idCita,
				{ estado: nuevoEstado }
			)
			if (respuesta.data.affectedRows > 0) {
				Swal.fire(
					'Cambios guardados',
					'La cita fue actualizada correctamente',
					'success'
				)
				// Actualizamos en el estado global
				if (usuarioSlice.idRol == 3)
					dispatch(UPDATE_CITAS_CLIENTES([idCita, { estado: nuevoEstado }]))
				if (usuarioSlice.idRol == 2)
					dispatch(UPDATE_CITAS_BARBERO([idCita, { estado: nuevoEstado }]))
			}
		}
	}

	return (
		<>
			<DashboardHeader titulo='Citas' />
			<DashboardContainer>
				{/* Contenedor de widgets */}
				<div className='grid grid-cols-4 gap-x-6 mb-8'>
					<CardWidget
						texto='Citas completadas'
						numero={
							usuarioSlice.idRol == 3
								? usuarioSlice.citasClientes?.filter(cita => cita.estado == 2)
										?.length
								: usuarioSlice.citasBarbero?.filter(cita => cita.estado == 2)
										?.length
						}
						icono={<BsCardList className='text-2xl text-white' />}
						color='bg-green-500'
					/>
					<CardWidget
						texto='Citas confirmadas'
						numero={
							usuarioSlice.idRol == 3
								? usuarioSlice.citasClientes?.filter(cita => cita.estado == 1)
										?.length
								: usuarioSlice.citasBarbero?.filter(cita => cita.estado == 1)
										?.length
						}
						icono={<AiOutlineCheck className='text-2xl text-white' />}
						color='bg-blue-500'
					/>
					<CardWidget
						texto='Por confirmar'
						numero={
							usuarioSlice.idRol == 3
								? usuarioSlice.citasClientes?.filter(cita => cita.estado == 0)
										?.length
								: usuarioSlice.citasBarbero?.filter(cita => cita.estado == 0)
										?.length
						}
						icono={<BsClock className='text-2xl text-white' />}
						color='bg-yellow-500'
					/>
					<CardWidget
						texto='Canceladas'
						numero={
							usuarioSlice.idRol == 3
								? usuarioSlice.citasClientes?.filter(cita => cita.estado == 3)
										?.length
								: usuarioSlice.citasBarbero?.filter(cita => cita.estado == 3)
										?.length
						}
						icono={<FiAlertTriangle className='text-2xl text-white' />}
						color='bg-red-500'
					/>
				</div>
				<div className='flex justify-between items-center gap-x-5'>
					{/* Buscador */}
					<BuscadorAdmin id='buscadorCita' placeholder='Buscar cita' />
					<div className='w-[200px]'>
						<Select
							id='selectorCita'
							opciones={[
								{ value: 'todas', texto: 'Todas' },
								{ value: 'realizadas', texto: 'Realizadas' },
								{ value: 'pendientes', texto: 'Pendientes' },
								{ value: 'por_confirmar', texto: 'Por confirmar' },
								{ value: 'canceladas', texto: 'Canceladas' },
							]}
						/>
					</div>
				</div>
				{/* Contenedor de las Cards */}
				<div className='w-full h-max flex gap-x-8 justify-between items-start my-6'>
					{/* Citas */}
					<div className='w-full flex flex-col justify-start gap-y-5'>
						{usuarioSlice.idRol == 3 &&
							(usuarioSlice.citasClientes?.length > 0 ? (
								usuarioSlice.citasClientes?.map(cita => (
									<CitaCard
										key={cita.idCita}
										servicios={cita.servicios}
										hora={formatearHora(cita.hora)}
										cliente={`${cita.nombreCliente} ${cita.ap_paternoCliente} ${cita.ap_maternoCliente}`}
										barbero={`${cita.nombreBarbero} ${cita.ap_paternoBarbero}`}
										estado={cita.estado}
										nombreProductor={cita.nombreProductor}
										onClickCancelar={() =>
											handleCambiarEstadoCita(cita.idCita, 3)
										}
									/>
								))
							) : (
								<div className='w-full min-h-[100px] bg-white borderborder-gray-200 px-8 py-6 select-none'>
									<p>Aun no hay citas</p>
								</div>
							))}
						{usuarioSlice.idRol == 2 &&
							(usuarioSlice.citasBarbero?.length > 0 ? (
								usuarioSlice.citasBarbero?.map(cita => (
									<CitaBarberoCard
										key={cita.idCita}
										cita={cita}
										onClickPendiente={() =>
											handleCambiarEstadoCita(cita.idCita, 0)
										}
										onClickConfirmar={() =>
											handleCambiarEstadoCita(cita.idCita, 1)
										}
										onClickCompletada={() =>
											handleCambiarEstadoCita(cita.idCita, 2)
										}
										onClickCancelar={() =>
											handleCambiarEstadoCita(cita.idCita, 3)
										}
										onClickNoAsistio={() =>
											handleCambiarEstadoCita(cita.idCita, 4)
										}
									/>
								))
							) : (
								<div className='w-full min-h-[100px] bg-white borderborder-gray-200 px-8 py-6 select-none'>
									<p>Aun no tienes citas</p>
								</div>
							))}
					</div>
					{/* info de la cita */}
					<div className='w-[700px] 2xl:w-[900px] min-h-[200px] bg-white shadow-sm p-5 2xl:p-8'>
						<h2 className='text-lg font-semibold'>Sin información</h2>
						<p className='text-md font-light'>
							Selecciona una cita para ver su información
						</p>
					</div>
				</div>
			</DashboardContainer>
		</>
	)
}

export default Citas
