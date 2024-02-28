import { BiSearch } from 'react-icons/bi'
import BigButton from './BigButton'

const BuscadorAdmin = ({ placeholder, id }) => {
	return (
		<div className='flex gap-x-2 items-center'>
			<div className='relative w-auto flex items-center'>
				<input
					type='search'
					name={id}
					id={id}
					placeholder={placeholder}
					className='w-[600px] 2xl:w-[800px] min-w-[500px] pl-10 pr-3 py-1 text-lg font-light rounded-md outline-none border focus:border-[var(--colorPrimario)] duration-200'
				/>
				<BiSearch className='absolute left-3 text-2xl text-gray-700' />
			</div>
			<BigButton
				type='submit'
				texto='Buscar'
			/>
		</div>
	)
}

export default BuscadorAdmin
