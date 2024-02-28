const SmallButton = ({ type, texto, onClick, color='bg-[var(--colorPrimario)]', desactivado=false }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={desactivado}
			className={`${color} text-white px-4 py-2 rounded-sm hover:opacity-80 duration-200 hover:shadow-md w-fit`}
		>
			{texto}
		</button>
	)
}

export default SmallButton
