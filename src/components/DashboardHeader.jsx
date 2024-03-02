import DashboardLogOut from './DashboardLogOut'
import DashboardLogo from './DashboardLogo'

const DashboardHeader = () => {
    return (
        <div className="d-flex align-items-center justify-content-between p-1 mb-2" id="dashboardHeader">
            <DashboardLogo />
            <DashboardLogOut />
        </div>
    )
}

export default DashboardHeader