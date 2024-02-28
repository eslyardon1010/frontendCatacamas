// Funcion que devuelve los minutos formateados
export const formatearDuracion = duracion => {
	if (duracion < 60) return `${duracion} min`
	const horas = Math.floor(duracion / 60)
	const minutos = duracion % 60 // calcula los minutos restantes
	const horasFormateadas = horas < 10 ? '0' + horas : horas // agrega un cero inicial a las horas si son menores a 10
	const minutosFormateados = minutos < 10 ? '0' + minutos : minutos // agrega un cero inicial a los minutos si son menores a 10
	return `${horasFormateadas}:${minutosFormateados} hrs` // devuelve el resultado en formato hh:mm
}

// Funcion que devuelve la hora formateada AM o PM
export const formatearHora = hora => {
	let tarde = false
	let min = hora.slice(3, 5)
	hora = hora.slice(0, 2)
	// Formateando horas
	if (hora == 12) tarde = true
	if (hora > 12) {
		hora = `0${hora - 12}`
		tarde = true
	} else {
		tarde = false
	}
	return tarde ? `${hora}:${min} pm` : `${hora}:${min} am`
}

export const formatearFecha = (fecha) => {
  const fechaCompleta = new Date(`${fecha.slice(0, 10)}T00:00:00`)
  let dia = fechaCompleta.getDate()
  let mes = fechaCompleta.getMonth()+1
  let anio = fechaCompleta.getFullYear()
  if(dia < 10) dia = `0${dia}`
  if(mes < 10) mes = `0${mes}`
  return `${dia}-${mes}-${anio}`
}