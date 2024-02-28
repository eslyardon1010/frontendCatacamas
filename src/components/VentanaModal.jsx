// Iconos
import { GrClose } from 'react-icons/gr'

const VentanaModal = ({ titulo='', cerrarModal, children }) => {
	return (
		<div className='fixed top-0 left-0 z-50 min-h-screen min-w-full flex justify-center items-center bg-[#00000071]'>
			<div className='w-[1100px] h-[500px] 2xl:w-[1250px] 2xl:h-[700px] bg-white px-16 2xl:px-20 2xl:pb-20 2xl:pt-16 pb-16 pt-12 rounded-sm overflow-y-auto shadow-2xl'>
				<div className='w-full flex justify-end items-center'>
					<button onClick={cerrarModal} className='cursor-pointer'>
						<GrClose className='text-2xl hover:opacity-80' />
					</button>
				</div>
				<h2 className='capitalize text-xl font-bold mb-8'>{titulo}</h2>
				<form action='' className='flex flex-col gap-y-5'>
					{children}
				</form>
			</div>
		</div>
	)
}

export default VentanaModal
