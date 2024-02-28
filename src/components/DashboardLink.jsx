import { NavLink } from 'react-router-dom'

const DashboardLink = ({ texto, icono, to }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				isActive ? 'flex justify-start items-center gap-x-3 text-[var(--colorPrimario)] border-r-2 border-[var(--colorPrimario)] duration-200' : 'flex justify-start items-center gap-x-3 text-[#000000a4] border-r-2 border-transparent hover:text-[var(--colorPrimario)] duration-200'
			}
		>
			{icono}
			<span className='text-base 2xl:text-lg font-semibold'>{texto}</span>
		</NavLink>
	)
}

export default DashboardLink
