import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'

const BarberoCard = ({ img, nombre, servicios, pendientes, puntaje, onClickEditar, onClickEliminar }) => {
	return (
		<div className='relative bg-[#fff] flex flex-col gap-y-4 justify-center items-center p-10 rounded-lg hover:shadow-lg hover:-translate-y-2 duration-300 select-none'>
			{/* Icons */}
			<div className='absolute top-5 left-5 flex flex-col gap-y-3'>
				<button onClick={onClickEditar}>
					<FaEdit className='text-2xl duration-200 text-blue-500 hover:opacity-80' />
				</button>
				<button onClick={onClickEliminar}>
					<AiFillDelete className='text-2xl duration-200 text-red-500 hover:opacity-80' />
				</button>
			</div>

			<div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
				<img src={img} alt={nombre} className='rounded-full' />
			</div>
			<div className='flex flex-col items-center'>
				<h2 className='text-xl font-medium'>{nombre}</h2>
				<span className='text-base font-light text-gray-500'>Tecnico</span>
			</div>
			<div className='flex gap-x-6'>
				<div className='flex flex-col items-center justify-center'>
					<span className='text-2xl text-gray-800 font-semibold'>
						{servicios}
					</span>
					<h3 className='text-sm font-normal'>Servicios</h3>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<span className='text-2xl text-gray-800 font-semibold'>
						{pendientes}
					</span>
					<h3 className='text-sm font-normal'>Pendientes</h3>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<span className='text-2xl text-gray-800 font-semibold'>
						{puntaje}
					</span>
					<h3 className='text-sm font-normal'>Puntaje</h3>
				</div>
			</div>
		</div>
	)
}

export default BarberoCard
