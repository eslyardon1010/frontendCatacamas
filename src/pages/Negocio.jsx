import DashboardHeader from '../components/DashboardHeader'
import DashboardContainer from '../components/DashboardContainer'
import CardWidget from '../components/CardWidget'
import Select from '../components/Select'
// Modulos
import { useSelector } from 'react-redux'
// iconos
import { GiReceiveMoney, GiMoneyStack, GiComb } from 'react-icons/gi'
// Grafico
import {
	dataIngresos,
	optionsIngresos,
	dataServicios,
	optionsServicios,
} from '../utils/data'
// import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Legend,
	Tooltip,
	// Filler
} from 'chart.js'

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Legend,
	Tooltip
	// Filler
)

const Negocio = () => {
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * *	G L O B A L E S		* * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	const usuarioSlice = useSelector(state => state.usuario)

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * *		F U N C I O N E S		* * * * * * * * * * * * * * * * * * * * * * * * *
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	const calcularPromedio = () => {
		const totalPagar = usuarioSlice.citasClientes?.reduce(
			(acomulador, cita) =>
				cita.estado == 2 ? acomulador + cita.total_pagar : acomulador,
			0
		)
		const promedio =
			totalPagar /
			usuarioSlice.citasClientes?.reduce(
				(suma, cita) => (cita.estado == 2 ? suma + 1 : suma),
				0
			)
		return !isNaN(promedio) ? promedio.toFixed(2) : 0
	}

	return (
		<>
			<DashboardHeader titulo='Informes' />
			<DashboardContainer>
				<div className='flex justify-start items-center gap-x-4 mb-5'>
					<h3 className='text-base font-normal'>Filrar por</h3>
					<div className='w-[200px]'>
						<Select
							id='selectorNegocioFiltro'
							opciones={[
								{ value: 'dia', texto: 'Diariamente' },
								{ value: 'semana', texto: 'Semanalmente' },
								{ value: 'mes', texto: 'Mensualmente' },
								{ value: 'tres_meses', texto: '4 meses' },
								{ value: '6_meses', texto: '8 meses' },
								{ value: 'anio', texto: 'Año' },
								{ value: 'inicio', texto: 'Desde el principio' },
							]}
						/>
					</div>
				</div>

				{/* Contenedor de widgets */}
			

				{/* Grafico */}
				{/* <div className='w-full flex justify-center items-start gap-x-10 mb-14'> */}
				<div className='w-full grid grid-cols-2 gap-x-10 mb-14'>
					<h3 className='text-xl font-semibold text-center uppercase text-gray-800 mb-3'>
						
					</h3>
					<h3 className='text-xl font-semibold text-center uppercase text-gray-800 mb-3'>
						Servicios completados
					</h3>
					<div>
					</div>
					<div>
						<Line data={dataServicios} options={optionsServicios}></Line>
					</div>
				</div>
			</DashboardContainer>
		</>
	)
}

export default Negocio
