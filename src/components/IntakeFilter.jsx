import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import { saveFilter } from "../features/listSlice";

const IntakeFilter = () => {
    const dispatch = useDispatch();
    
    const filter = useRef(null);

    const saveFilterValue = () => {
        let filterValue = filter.current.value;
        dispatch(saveFilter(filterValue));
    }

    useEffect(() => {
        saveFilterValue();
    }, [])
    

    return (
        <article className="col-8 col-sm-6 col-md-4 col-xl-6 col-xxl-5 d-flex mb-3 mt-4 mx-auto" id="intakeFilter">
            <label htmlFor="txtDashboardListFilter" className="col-form-label mx-2">Filtro</label>
            <select className="form-select m-0" id="txtDashboardListFilter" ref={filter} onChange={saveFilterValue} >
                <option value="noFilter">Sin filtro</option>
                <option value="last7Days">Últimos 7 días</option>
                <option value="last30Days">Últimos 30 días</option>
            </select>
        </article>
    )
}

export default IntakeFilter