export const dataIngresos = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  datasets: [
    {
      label: 'Ingresos',
      data: [2300, 4000, 6300, 3643, 2300, 1500, 2300, 5000, 6100, 6920, 10500, 9450],
      backgroundColor: 'green',
      borderColor: 'green',
      pointBorderColor: 'green',
      pointBorderWidth: 3,
      // fill: true,
      tension: .4,
    },
  ],
}
export const optionsIngresos = {
  plugins: {
    legend: true,
  },
  scales: {
    y: {
      min: 0,
      max: 12000,
    },
  },
}

export const dataServicios = {
  labels: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
  datasets: [
    {
      label: 'Cantidad de servicios',
      data: [32, 25, 18, 23, 15, 35, 42],
      backgroundColor: 'blue',
      borderColor: 'blue',
      pointBorderColor: 'blue',
      pointBorderWidth: 3,
      // fill: true,
      tension: 0,
    },
  ],
}
export const optionsServicios = {
  plugins: {
    legend: true,
  },
  scales: {
    y: {
      min: 0,
      max: 50,
    },
  },
}