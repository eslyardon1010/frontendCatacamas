// Components
import Navbar from '../components/Navbar'
// Assets
import Logo from '../assets/logo_small.png'
// Hooks
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Header = () => {
	// useState
	const [mousePos, setMousePos] = useState({})

	// useEffect
	// useEffect(() => {
	// 	const handleMouseMove = event => {
	// 		setMousePos({ x: event.clientX, y: event.clientY })
	// 	}

	// 	window.addEventListener('mousemove', handleMouseMove)

	// 	return () => {
	// 		window.removeEventListener('mousemove', handleMouseMove)
	// 	}
	// }, [])

	return (
		<header className='h-[120px] w-[100%] px-[30px] sm:px-[60px] md:px-[80px] lg:px-[100px] bg-[#fff] fixed top-0 shadow-lg flex justify-between items-center z-50'>
			<Link className='h-[80px] flex items-center' to='/'>
				<img src={Logo} alt='FadeFiner Logo' />
			</Link>
			<Navbar />
		</header>
	)
}

export default Header
