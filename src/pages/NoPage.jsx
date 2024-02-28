import Imagen404 from '../assets/404.svg'

const NoPage = () => {
  return (
    <div className='pt-[180px] pb-[60px] flex flex-col justify-start items-center gap-y-[40px]'>
      <div className='w-[50%]'>
        <img src={Imagen404} alt="Page not found" />
      </div>
      <h1 className='text-6xl font-bold text-[#3F3D56]'>Página no encontrada</h1>
    </div>
  )
}

export default NoPage