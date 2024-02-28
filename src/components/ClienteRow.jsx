import { FaEdit } from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai'
const ClienteRow = ({
	email,
	nombre,
	ap_paterno,
	ap_materno,
	telefono,
	estado,
	foto,
	servicios,
	citas_pendientes,
	onClick,
}) => {
	return (
		<tr className='h-[60px] text-gray-500 border-b text-sm'>
			<td className='text-center px-5 py-2'>
				<div className='flex gap-x-6 py-2 items-center justify-start'>
					<div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
						<img src={foto} alt={`Fotografía de ${nombre}`} />
					</div>
					<div className='flex flex-col font-normal'>
						<h2 className='w-full text-left'>{nombre}</h2>
						<span className='text-[var(--colorPrimario)] font-semibold w-full text-left'>
							{ap_paterno} {ap_materno}
						</span>
					</div>
				</div>
			</td>
			<td className='text-center px-5 py-2'>{email}</td>
			<td className='text-center px-5 py-2'>{telefono}</td>
			<td className='text-center px-5 py-2'>
				{estado == 0 && (
					<span className='px-3 py-1 bg-red-500 text-white font-semibold rounded-full'>
						Desactiva
					</span>
				)}
				{estado == 1 && (
					<span className='px-3 py-1 bg-green-500 text-white font-semibold rounded-full'>
						Activa
					</span>
				)}
			</td>
			{/* <td className='text-center px-5 py-2'>{servicios}</td>
			<td className='text-center px-5 py-2'>{citas_pendientes}</td> */}
			<td className='text-center px-5 py-2'>
				<button onClick={onClick}>
					<AiFillEye className='text-[var(--colorPrimario)] text-4xl hover:opacity-90 duration-200' />
				</button>
			</td>
		</tr>
	)
}

export default ClienteRow
