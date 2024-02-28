import { Link } from 'react-scroll'

// Iconos
import { FaFacebook } from 'react-icons/fa'
import { BsInstagram } from 'react-icons/bs'
import { AiOutlineMail, AiOutlineWhatsApp } from 'react-icons/ai'

const Footer = () => {
	return (
		<footer class='bg-[#333333] text-center text-white relative bottom-0 right-0 left-0'>
			{/* Iconos */}
			<div class='w-full flex justify-center gap-x-6 py-[30px]'>
				<a href="#"><FaFacebook className='text-3xl  duration-200 hover:text-[#3b5998]'/></a>
				<a href="#"><BsInstagram className='text-3xl duration-200 hover:text-[#C13584]'/></a>
				<a href="#"><AiOutlineMail className='text-3xl duration-200 hover:text-red-500'/></a>
				<a href="#"><AiOutlineWhatsApp className='text-3xl duration-200 hover:text-[#25D366]'/></a>
			</div>

			<div class='bg-neutral-300 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 select-none'>
				<span>© 2024 Copyright: </span>
				<Link
					className='cursor-pointer text-neutral-800 dark:text-neutral-400 hover:text-yellow-300'
					activeClass='active'
					to='link'
					spy={true}
					smooth={true}
					offset={50}
					duration={500}
				>
					Catacamas Citas
				</Link>
			</div>
		</footer>
	)
}

export default Footer
