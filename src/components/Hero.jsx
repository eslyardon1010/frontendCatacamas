import { Link } from 'react-router-dom'

const Hero = () => {
	return (
		<div
			id='inicio'
			className='relative h-screen max-h-screen overflow-hidden flex justify-end items-start text-center'
		>
			<div className='absolute top-0 right-0 left-0 h-screen bg-fixed bg-center bg-cover blur-[4px] bg-banner'></div>
			<div className='absolute z-40 w-[50%] px-[100px] flex flex-col items-end mt-[200px] select-none'>
				<span className='text-white text-3xl font-light text-right'>
				
				</span>
				<p className='text-black font-bold text-7xl'></p>
				<p className='text-white text-5xl font-extralight text-right mb-10 '>

				</p>

				<Link
					to='/login'
					className='px-10 py-5 text-lg font-semibold border-2 border-white text-white duration-300 hover:bg-gradient-to-r from-blue-500 to-[var(--colorPrimario)] hover:border-transparent hover:-translate-y-1'
				>
					Agendar cita
				</Link>
			</div>
		</div>
	)
}

export default Hero
