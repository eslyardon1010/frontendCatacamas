// iconos
import { AiFillEye } from 'react-icons/ai'
import { TiCancel } from 'react-icons/ti'


const CitaCard = ({ servicios, hora, nombreProductor, barbero, estado, onClickCancelar }) => {
	return (
		<div className='w-full min-h-[100px] hover:shadow-md bg-white borderborder-gray-200 hover:border-l-4 hover:border-[var(--colorPrimario)] hover:translate-x-2 duration-200 px-8 py-6 flex justify-between items-center select-none'>
			{/* informacion */}
			<div className='flex flex-col gap-y-2'>
				<div className='flex gap-x-8 items-center'>
					<span className='text-lg text-gray-700 font-semibold'>{hora}</span>

					<span className='text-sm text-gray-500 font-light'><p>PRODUCTOR: </p>{nombreProductor}</span>
				</div>
				<div className='flex'>
					{servicios.map(servicio => (
						<span
							className='px-2 py-1 bg-green-500 border-4 border-green-300 text-white rounded-full text-xs font-normal'
							key={servicio.idServicio}
						>
							{servicio.nombre}
						</span>
					))}
				</div>
				<div>
					{/* Pendiente */}
					{estado == 0 && (
						<span className='px-2 py-1 bg-blue-400 border-4 border-blue-200 text-white font-normal rounded-full text-xs'>
							Pendiente
						</span>
					)}
					{/* Confirmada */}
					{estado == 1 && (
						<span className='px-2 py-1 bg-blue-700 border-4 border-blue-500 text-white font-normal rounded-full text-xs'>
							Confirmada
						</span>
					)}
					{/* Completada */}
					{estado == 2 && (
						<span className='px-2 py-1 bg-green-500 border-4 border-green-300 text-white font-normal rounded-full text-xs'>
							Completada
						</span>
					)}
					{/* Cancelada */}
					{estado == 3 && (
						<span className='px-2 py-1 bg-red-500 border-4 border-red-300 text-white font-normal rounded-full text-xs'>
							Cancelada
						</span>
					)}
					{/* No asisitio */}
					{estado == 4 && (
						<span className='px-2 py-1 bg-orange-500 border-4 border-orange-300 text-white font-normal rounded-full text-xs'>
							No asistio
						</span>
					)}
				</div>
				<span className='text-sm text-gray-500 font-normal'>
					Tecnico:{' '}
					<span className='text-[var(--colorPrimario)] font-bold'>
						{barbero}
					</span>
				</span>
			</div>

			{/* Iconos */}
			<div className='flex justify-center items-center gap-x-4'>
				<button title='Ver cita'>
					<AiFillEye className='text-4xl text-blue-500 hover:opacity-70' />
				</button>
				{(estado == 0 || estado == 1) && (
					<button title='Cancelar cita' onClick={onClickCancelar}>
						<TiCancel className='text-4xl text-red-500 hover:opacity-70' />
					</button>
				)}
			</div>
		</div>
	)
}

export default CitaCard
