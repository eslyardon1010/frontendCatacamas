const Input = ({ label, type, name, id, placeholder, value, onChange, activo=true }) => {
	return (
		<div className='flex flex-col w-full gap-y-1'>
			<label htmlFor={name} className='text-base font-semibold text-gray-600'>
				{label}
			</label>
			<input
				autoComplete='off'
				type={type}
				name={name}
				id={id}
				placeholder={placeholder}
        value={value}
        onChange={onChange}
				disabled={!activo}
				className='w-full outline-none border border-gray-200 duration-200 focus:border-[var(--colorPrimario)] px-3 py-2 text-sm'
			/>
		</div>
	)
}

export default Input
