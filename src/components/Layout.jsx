// Components
import Header from './Header'
import Footer from './Footer'
// Hooks
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default Layout
