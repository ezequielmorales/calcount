import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveIntakes } from "../features/intakesSlice"
import { saveFilter } from "../features/listSlice"

const DashboardLogOut = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () => {
        localStorage.clear();
        dispatch(saveIntakes([]));
        dispatch(saveFilter(""));
        navigate("/");
    }
    
    return (
        <form id="dashboardLogOut">
            <input type="button" className="btn btn-warning" value="Cerrar Sesión" onClick={logOut} />
        </form>
    )
}

export default DashboardLogOut