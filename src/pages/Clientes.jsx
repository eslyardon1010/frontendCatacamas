// Componentes
import DashboardHeader from '../components/DashboardHeader'
import DashboardContainer from '../components/DashboardContainer'
import ClienteRow from '../components/ClienteRow'
import BuscadorAdmin from '../components/BuscadorAdmin'
import VentanaModal from '../components/VentanaModal'
// Hooks
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Clientes = () => {
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * *	G L O B A L E S		* * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	const usuarioSlice = useSelector(state => state.usuario)

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * *	U S E		S T A T E		* * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	const [ventanaModal, setVentanaModal] = useState(false)
	const [cliente, setCliente] = useState({
		idUsuario: '',
		email: '',
		password: '',
		nombre: '',
		ap_paterno: '',
		ap_materno: '',
		telefono: '',
		foto: '',
		estado: '',
		servicios: '',
		citas_pendientes: '',
	})

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * *	U S E		E F F E C T		* * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * *		F U N C I O N E S		* * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	const setClienteModal = id => {
		const clienteFiltrado = usuarioSlice.clientes.filter(
			cliente => cliente.idUsuario == id
		)
		setCliente(clienteFiltrado[0])
		setVentanaModal(true)
	}

	// Renderizado
	return (
		<>
			{ventanaModal && (
				<VentanaModal
					cerrarModal={() => setVentanaModal(false)}
					titulo='Cuenta de cliente'
				>
					<div className='w-full h-full flex justify-between'>
						{/* <div className='w-[35%] h-[270.2px] 2xl:h-[364px] rounded-full overflow-hidden'> */}
						<div className='w-[35%] flex justify-center'>
							<div className='h-[300px] w-[300px] 2xl:h-[360px] 2xl:w-[360px] rounded-full overflow-hidden'>
								<img
									src={cliente.foto}
									alt={`Fotografía de ${cliente.nombre}`}
								/>
							</div>
						</div>
						<div className='w-[55%] flex flex-col gap-y-10'>
							<div className='flex w-full items-center'>
								<h3 className='w-[200px] text-gray-500 uppercase font-semibold text-sm'>
									Nombre
								</h3>
								<input
									type='text'
									disabled={true}
									value={cliente.nombre}
									className='bg-transparent border-b flex-1 py-1 px-3 text-gray-900'
								/>
							</div>
							<div className='flex w-full items-center'>
								<h3 className='w-[200px] text-gray-500 uppercase font-semibold text-sm'>
									Apellido paterno
								</h3>
								<input
									type='text'
									disabled={true}
									value={cliente.ap_paterno}
									className='bg-transparent border-b flex-1 py-1 px-3 text-gray-900'
								/>
							</div>
							<div className='flex w-full items-center'>
								<h3 className='w-[200px] text-gray-500 uppercase font-semibold text-sm'>
									Apellido materno
								</h3>
								<input
									type='text'
									disabled={true}
									value={cliente.ap_materno}
									className='bg-transparent border-b flex-1 py-1 px-3 text-gray-900'
								/>
							</div>
							<div className='flex w-full items-center'>
								<h3 className='w-[200px] text-gray-500 uppercase font-semibold text-sm'>
									Correo electrónico
								</h3>
								<input
									type='text'
									disabled={true}
									value={cliente.email}
									className='bg-transparent border-b flex-1 py-1 px-3 text-gray-900'
								/>
							</div>
							<div className='flex w-full items-center'>
								<h3 className='w-[200px] text-gray-500 uppercase font-semibold text-sm'>
									Número telefónico
								</h3>
								<input
									type='text'
									disabled={true}
									value={cliente.telefono}
									className='bg-transparent border-b flex-1 py-1 px-3 text-gray-900'
								/>
							</div>
							<div className='flex w-full items-center'>
								<h3 className='w-[200px] text-gray-500 uppercase font-semibold text-sm'>
									Estado
								</h3>
								<input
									type='text'
									disabled={true}
									value={cliente.estado == 0 ? 'Desactiva' : 'Activa'}
									className='bg-transparent border-b flex-1 py-1 px-3 text-gray-900'
								/>
							</div>
						</div>
					</div>
				</VentanaModal>
			)}
			<DashboardHeader titulo='Clientes' />
			<DashboardContainer>
				{/* Buscador */}
				<BuscadorAdmin
					id='buscadorCliente'
					placeholder='Escribe el nombre del cliente'
				/>
				{/* Contenedor de las Cards */}
				<div className='w-full h-max my-10'>
					<table className='w-full bg-white rounded-lg shadow-sm select-none'>
						<thead>
							<tr className='h-[50px] text-gray-500 text-base border-b'>
								<th className='font-medium px-5 py-3 min-w-[250px]'>
									Nombre completo
								</th>
								<th className='font-medium px-5 py-3'>Correo electrónico</th>
								<th className='font-medium px-5 py-3'>Teléfono</th>
								<th className='font-medium px-5 py-3'>Estado de cuenta</th>
								{/* <th className='font-medium px-5 py-3'>Servicios tomados</th>
								<th className='font-medium px-5 py-3'>Citas pendientes</th> */}
								<th></th>
							</tr>
						</thead>
						<tbody>
							{usuarioSlice.clientes?.map(cliente => (
								<ClienteRow
									key={cliente.idUsuario}
									email={cliente.email}
									nombre={cliente.nombre}
									ap_paterno={cliente.ap_paterno}
									ap_materno={cliente.ap_materno}
									telefono={cliente.telefono}
									estado={cliente.estado}
									foto={cliente.foto}
									servicios={cliente.servicios}
									citas_pendientes={cliente.citas_pendientes}
									onClick={() => setClienteModal(cliente.idUsuario)}
								/>
							))}
						</tbody>
					</table>
				</div>
			</DashboardContainer>
		</>
	)
}

export default Clientes
