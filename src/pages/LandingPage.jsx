// Components
import Hero from '../components/Hero'
import Section from '../components/Section'
import ServicioCard from '../components/ServicioCard'
import GaleriaCard from '../components/GaleriaCard'

// Icons
import { BsScissors } from 'react-icons/bs'
import { GiRazor, GiComb } from 'react-icons/gi'

// Imagenes
import img1 from '../assets/galeria1.jpg'
import img2 from '../assets/galeria2.jpg'
import img3 from '../assets/galeria3.jpg'
import img4 from '../assets/galeria4.jpg'
import img5 from '../assets/galeria5.jpg'
import img6 from '../assets/galeria6.jpg'

const LandingPage = () => {
	return (
		<>
			<Hero />

			{/* Servicios */}
			<Section titulo='Servicios' id='servicios'>
				<div className='grid grid-cols-3 2xl:grid-cols-5 gap-6'>
					<ServicioCard
						titulo='Cortes'
						icono={<BsScissors className='text-4xl' />}
						desc='Esta es la descripcion del corte de cabello'
					/>
					<ServicioCard
						titulo='Rasurado'
						icono={<GiRazor className='text-4xl' />}
						desc='Esta es la descripcion del corte de cabello'
					/>
					<ServicioCard
						titulo='Peinados'
						icono={<GiComb className='text-4xl' />}
						desc='Esta es la descripcion del corte de cabello'
					/>
					<ServicioCard
						titulo='Cortes'
						icono={<BsScissors className='text-4xl' />}
						desc='Esta es la descripcion del corte de cabello'
					/>
					<ServicioCard
						titulo='Rasurado'
						icono={<GiRazor className='text-4xl' />}
						desc='Esta es la descripcion del corte de cabello'
					/>
				</div>
			</Section>

			{/* Galeria */}
			<Section titulo='Galeria' id='galeria'>
				<div className='w-full grid grid-cols-4 gap-4 auto-rows-auto'>
					<GaleriaCard img={img1} desc='imagen de la galeria' />
					<GaleriaCard img={img2} desc='imagen de la galeria' />
					<GaleriaCard img={img3} desc='imagen de la galeria' />
					<GaleriaCard img={img4} desc='imagen de la galeria' />
					<GaleriaCard img={img5} desc='imagen de la galeria' />
					<GaleriaCard img={img6} desc='imagen de la galeria' />
					<GaleriaCard img={img1} desc='imagen de la galeria' />
				</div>
			</Section>

			{/* Contactanos */}
			<Section titulo='Contactanos' id='contactanos'>
				<div className='w-full py-[50px] flex justify-center items-center'>
					<form action="" className='flex flex-col gap-y-6 w-[800px]'>
						<div className='flex flex-col w-full gap-y-1'>
							<label htmlFor="correo" className='text-lg font-bold'>Correo electrónico</label>
							<input type="email" name="correo" id="correo" placeholder='ejemplo@dominio' className='w-full outline-none border border-gray-300 duration-200 focus:border-[var(--colorPrimario)] px-3 py-2'/>
						</div>
						<div className='flex flex-col w-full gap-y-1'>
							<label htmlFor="asunto" className='text-lg font-bold'>Asunto</label>
							<input type="text" name="asunto" id="asunto" placeholder='Asunto' className='w-full outline-none border border-gray-300 duration-200 focus:border-[var(--colorPrimario)] px-3 py-2'/>
						</div>
						<div className='flex flex-col w-full gap-y-1'>
							<label htmlFor="mensaje" className='text-lg font-bold'>Mensaje</label>
							<textarea name="mensaje" id="mensaje" placeholder='Redacta tu mensaje' className='w-full min-h-[250px] outline-none border border-gray-300 duration-200 focus:border-[var(--colorPrimario)] px-3 py-2'></textarea>
						</div>
						<div>
							<button type="submit" className='bg-[var(--colorPrimario)] text-white px-5 py-2 hover:opacity-90 hover:shadow-lg'>Enviar</button>
						</div>
					</form>
				</div>
			</Section>
		</>
	)
}

export default LandingPage
