// Components
import Padding from './Padding'

const Section = ({ titulo, id, children }) => {
	return (
		<Padding>
			<div id={id} className='w-full h-full flex flex-col items-center'>
				<div className='flex flex-col justify-center items-center mb-10'>
					<h2 className='text-5xl font-bold mb-3'>{titulo}</h2>
					<div className='w-[120%] h-[2px] bg-[#000000ce]'></div>
				</div>
				{children}
			</div>
		</Padding>
	)
}

export default Section
