const BigButton = ({ type, texto, icono='', onClick }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className='flex justify-center items-center gap-x-2 h-full w-fit px-4 py-2 bg-[var(--colorPrimario)] text-white hover:opacity-80 duration-200'
		>
			{icono && icono}
			<span>{texto}</span>
		</button>
	)
}

export default BigButton
