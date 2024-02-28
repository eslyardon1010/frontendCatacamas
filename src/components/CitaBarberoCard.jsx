// iconos
import {
	AiOutlineEye,
	AiOutlineCheck,
	AiOutlineClockCircle,
} from 'react-icons/ai'
import { MdOutlineCancel, MdOutlinePending } from 'react-icons/md'
import { BsCardList } from 'react-icons/bs'

// Modulos
import {
	formatearHora,
	formatearFecha,
	formatearDuracion,
} from '../utils/formateo'

const CitaBarberoCard = ({
	cita,
	onClickCancelar,
	onClickConfirmar,
	onClickNoAsistio,
	onClickPendiente,
	onClickCompletada,
}) => {
	return (
		<div className='w-full min-h-[100px] hover:shadow-md bg-white borderborder-gray-200 hover:border-l-4 hover:border-[var(--colorPrimario)] hover:translate-x-2 duration-200 px-8 py-6 flex justify-between items-center select-none'>
			{/* izquierda */}
			<div className='flex flex-col gap-y-1'>
				<span className='text-2xl text-gray-600 font-bold'>
					{formatearHora(cita.hora)}
				</span>
				<h3 className='text-base text-gray-800 font-medium'>
					Cliente:{' '}
					<span className='font-light text-gray-600'>
						{`${cita.nombreCliente} ${cita.ap_paterno} ${cita.ap_materno}`}
					</span>
				</h3>
				<h3 className='text-base text-gray-800 font-medium'>
					Fecha:{' '}
					<span className='font-light text-gray-600'>
						{formatearFecha(cita.fecha)}
					</span>
				</h3>
				<h3 className='text-base text-gray-800 font-medium'>
					Hora:{' '}
					<span className='font-light text-gray-600'>
						{formatearHora(cita.hora)}
					</span>
				</h3>
				<h3 className='text-base text-gray-800 font-medium'>
					Duración:{' '}
					<span className='font-light text-gray-600'>
						{formatearDuracion(cita.duracion)}
					</span>
				</h3>
				<div className='flex gap-x-3 mt-2'>
					{cita.servicios.map(servicio => (
						<span
							className='px-2 py-1 bg-gray-500 border-4 border-gray-300 text-white rounded-full text-xs font-normal'
							key={servicio.idServicio}
						>
							{servicio.nombre}
						</span>
					))}
				</div>
			</div>

			{/* Derecha */}
			<div className='flex flex-col justify-between items-end h-[140px]'>
				<div>
					{/* Pendiente */}
					{cita.estado == 0 && (
						<span className='px-2 py-1 bg-blue-400 border-2 border-blue-200 text-white font-normal text-xs'>
							Pendiente
						</span>
					)}
					{/* Confirmada */}
					{cita.estado == 1 && (
						<span className='px-2 py-1 bg-blue-700 border-2 border-blue-500 text-white font-normal text-xs'>
							Confirmada
						</span>
					)}
					{/* Completada */}
					{cita.estado == 2 && (
						<span className='px-2 py-1 bg-green-500 border-2 border-green-300 text-white font-normal text-xs'>
							Completada
						</span>
					)}
					{/* Cancelada */}
					{cita.estado == 3 && (
						<span className='px-2 py-1 bg-red-500 border-2 border-red-300 text-white font-normal text-xs'>
							Cancelada
						</span>
					)}
					{/* No asisitio */}
					{cita.estado == 4 && (
						<span className='px-2 py-1 bg-orange-500 border-2 border-orange-300 text-white font-normal text-xs'>
							No asistio
						</span>
					)}
				</div>
				<div className='flex gap-x-4 justify-end'>
					<button
						title='Ver cita'
						className='bg-blue-600 border-2 border-blue-300 hover:opacity-70 duration-200 w-[35px] h-[35px] flex justify-center items-center rounded-full p-1'
					>
						<AiOutlineEye className='text-2xl text-white' />
					</button>
					{(cita.estado == 0 || cita.estado == 1) && (
						<button
							onClick={onClickCancelar}
							title='Marcar como cancelada'
							className='bg-red-600 border-2 border-red-300 hover:opacity-70 duration-200 w-[35px] h-[35px] flex justify-center items-center rounded-full p-1'
						>
							<MdOutlineCancel className='text-2xl text-white' />
						</button>
					)}
					{cita.estado == 0 && (
						<button
							onClick={onClickConfirmar}
							title='Marcar como confirmada'
							className='bg-blue-500 border-2 border-blue-300 hover:opacity-70 duration-200 w-[35px] h-[35px] flex justify-center items-center rounded-full p-1'
						>
							<AiOutlineCheck className='text-2xl text-white' />
						</button>
					)}
					{cita.estado == 1 && (
						<>
							<button
								onClick={onClickCompletada}
								title='Marcar como completada'
								className='bg-green-600 border-2 border-green-300 hover:opacity-70 duration-200 w-[35px] h-[35px] flex justify-center items-center rounded-full p-1'
							>
								<BsCardList className='text-2xl text-white' />
							</button>
							<button
								onClick={onClickPendiente}
								title='Marcar como pendiente'
								className='bg-blue-400 border-2 border-blue-300 hover:opacity-70 duration-200 w-[35px] h-[35px] flex justify-center items-center rounded-full p-1'
							>
								<MdOutlinePending className='text-2xl text-white' />
							</button>
						</>
					)}
					{cita.estado == 1 && (
						<button
							onClick={onClickNoAsistio}
							title='Marcar como inasistencia'
							className='bg-orange-600 border-2 border-orange-300 hover:opacity-70 duration-200 w-[35px] h-[35px] flex justify-center items-center rounded-full p-1'
						>
							<AiOutlineClockCircle className='text-2xl text-white' />
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default CitaBarberoCard
