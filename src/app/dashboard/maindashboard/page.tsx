import { DashboardPage } from "@/components/dashboard-page"
import { DashboardContentPage } from "./dashboard-content-page"

const MainPage = () => {
    return(
        <DashboardPage title="Dashboard"><DashboardContentPage /></DashboardPage>
    )
}

export default MainPage