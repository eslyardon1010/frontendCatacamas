import Swal from 'sweetalert2'
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const expRegTel = /^\d{8}$/;

export const validarEmail = email => {
  if(!emailRegex.test(email)) {
    Swal.fire(
      'Correo electrónico no válido',
      'El formato del correo electrónico es incorrecto',
      'error'
    )
    return false
  }
	return true
}
export const validarTelefono = telefono => {
  if(!expRegTel.test(telefono)) {
    Swal.fire(
      'Número telefónico no válido',
      'Debes ingresar un número telefónico de 8 digitos',
      'error'
    )
    return false
  }
  return true
}
export const validarPassword = password => {
  if(password.length < 5) {
    Swal.fire(
      'Contraseña no válida',
      'La contraseña debe tener al menos 5 caracteres',
      'error'
    )
    return false
  }
  return true 
}

export const primeraLetraMayuscula = palabra => {
  return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
}