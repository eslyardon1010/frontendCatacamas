import { GiCancel } from 'react-icons/gi'

// Modulos
import {
	formatearDuracion,
	formatearHora,
	formatearFecha,
} from '../utils/formateo'

const CitaRow = ({ cita, onClick }) => {
	return (
		<tr className='h-[60px] text-gray-500 border-b text-sm'>
			<td className='text-center px-5 py-6'>
				{/* Pendiente */}
				{cita.estado == 0 && (
					<span className='px-2 py-1 bg-blue-400 text-white font-semibold rounded-md'>
						Pendiente
					</span>
				)}
				{/* Confirmada */}
				{cita.estado == 1 && (
					<span className='px-2 py-1 bg-blue-700 text-white font-semibold rounded-md'>
						Confirmada
					</span>
				)}
				{/* Completada */}
				{cita.estado == 2 && (
					<span className='px-2 py-1 bg-green-500 text-white font-semibold rounded-md'>
						Completada
					</span>
				)}
				{/* Cancelada */}
				{cita.estado == 3 && (
					<span className='px-2 py-1 bg-red-500 text-white font-semibold rounded-md'>
						Cancelada
					</span>
				)}
				{/* No asisitio */}
				{cita.estado == 4 && (
					<span className='px-2 py-1 bg-orange-500 text-white font-semibold rounded-md'>
						No asistio
					</span>
				)}
			</td>
			<td className='text-center px-5 py-6'>{formatearFecha(cita.fecha)}</td>
			<td className='text-center px-5 py-6'>{formatearHora(cita.hora)}</td>
			<td className='text-center px-5 py-6'>
				{formatearDuracion(cita.duracion)}
			</td>
			<td className='text-center px-5 py-6'>{`${cita.nombreBarbero} ${cita.ap_paternoBarbero}`}</td>
			<td className='text-center px-5 py-6 flex flex-col'>
				{cita.servicios.map(servicio => (
					<li key={servicio.idServicio} className='text-left'>
						{servicio.nombre}
					</li>
				))}
			</td>
			<td className='text-center px-5 py-2'>
				{(cita.estado == 0 || cita.estado == 1) && (
					<button onClick={onClick} title='Cancelar cita'>
						<GiCancel className='text-red-500 text-3xl hover:opacity-80 duration-200' />
					</button>
				)}
			</td>
		</tr>
	)
}

export default CitaRow
