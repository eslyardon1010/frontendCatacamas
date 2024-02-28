import { Link } from 'react-router-dom'
import { BsChevronDown } from 'react-icons/bs'

const ServicioCard = ({ titulo, icono, desc }) => {
	return (
		<div className='flex flex-col justify-center items-center gap-y-6 p-14 bg-[#e9e9e9] rounded-sm w-[300px] min-h-[350px] duration-200 border-b-4 hover:border-b-4 hover:border-[var(--colorPrimario)] hover:shadow-2xl'>
			<div className='flex justify-center items-center'>{icono}</div>
			<h3 className='text-xl font-bold'>{titulo}</h3>
			<p className='text-center text-base font-normal'>{desc}</p>
			<Link to='#' className='flex items-center gap-x-2'>
				<span>Leer más</span>
				<BsChevronDown />
			</Link>
		</div>
	)
}

export default ServicioCard
