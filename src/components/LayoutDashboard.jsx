import Dashboard from './Dashboard'
// Hooks
import { Outlet } from 'react-router-dom'

const LayoutDashboard = () => {
	return (
		<div>
			<Dashboard />
			<Outlet />
		</div>
	)
}

export default LayoutDashboard
