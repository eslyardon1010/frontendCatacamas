import { AiFillDelete } from 'react-icons/ai'

const ServicioAgregadoCard = ({nombre, precio, onClick}) => {
	return (
		<div className='group hover:border-red-500 hover:translate-x-1 border-l duration-200 px-4 flex items-center justify-between select-none'>
			<div className='flex gap-x-2'>
				<button className='hidden group-hover:flex justify-center items-center duration-200' onClick={onClick}>
					<AiFillDelete className='text-red-500 text-lg' />
				</button>
				<h5 className='font-light'>{nombre}</h5>
			</div>
			<p className='font-semibold text-green-500'>${precio}</p>
		</div>
	)
}

export default ServicioAgregadoCard
