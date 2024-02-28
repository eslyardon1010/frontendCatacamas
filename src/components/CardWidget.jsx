const CitaWidget = ({ texto, numero, icono, color, dinero=false }) => {
	return (
		<div className='flex justify-between items-center py-6 px-5 2xl:px-10 rounded-lg bg-white shadow-md col-span-1'>
			<div className="flex flex-col gap-y-2">
				<h2 className="text-sm font-medium text-gray-900">{texto}</h2>
				<span className="text-3xl font-normal text-black">{dinero && '$'}{numero}</span>
			</div>
			<div className={'rounded-full p-3 ' + color}>{icono}</div>
		</div>
	)
}

export default CitaWidget
