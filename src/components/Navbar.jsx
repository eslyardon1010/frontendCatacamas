import { Link } from 'react-scroll'
import { NavLink, useLocation } from 'react-router-dom'
// import { useSelector } from 'react-redux'

const Navbar = () => {
	// const usuarioSlice = useSelector(state => state.usuario) // obtengo el estado
	const location = useLocation()
	return (
		<nav className=''>
			<ul className='flex gap-x-5'>
				<li>
					{location.pathname == '/' && (
						<Link
							className='cursor-pointer text-black font-medium'
							activeClass='active'
							to='inicio'
							spy={true}
							smooth={true}
							offset={-180}
							duration={500}
						>
							Inicio
						</Link>
					)}
				</li>
				{location.pathname === '/' && (
					<>
						<li>
							<Link
								className='cursor-pointer text-black font-medium'
								activeClass='active'
								to='servicios'
								spy={true}
								smooth={true}
								offset={-180}
								duration={500}
							>
						
							</Link>
						</li>
						<li>
							<Link
								className='cursor-pointer text-black font-medium'
								activeClass='active'
								to='galeria'
								spy={true}
								smooth={true}
								offset={-180}
								duration={500}
							>
								
							</Link>
						</li>
						<li>
							<Link
								className='cursor-pointer text-black font-medium'
								activeClass='active'
								to='contactanos'
								spy={true}
								smooth={true}
								offset={-180}
								duration={500}
							>
							</Link>
						</li>
					</>
				)}
				{location.pathname == '/' && (
					<li>
						<NavLink
							to='/dashboard/negocio'
							className={({ isActive }) =>
								isActive ? 'text-green-500' : 'text-black font-medium'
							}
						>
							Entrar
						</NavLink>
					</li>
				)}
			</ul>
		</nav>
	)
}

export default Navbar
