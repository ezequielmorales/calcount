import bin from '../images/bin.png'
import { useDispatch } from 'react-redux';
import { deleteIntake } from "../features/intakesSlice"
import { saveIntakes } from "../features/intakesSlice";
import { saveFilter } from "../features/listSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const IntakeItem = ({ id: intakeId, cantidad: quantity, fecha: date, food }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const formatDate = date => `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;

    // Extract intake information
    let portion = food.porcion;
    let unit = portion.slice(food.porcion.length - 1, food.porcion.length);
    unit = (unit === "m") ? "ml" : unit;
    let portionsNumber = quantity / portion.slice(0, portion.length - 1);
    let portionOrPortions = (portionsNumber === 1) ? "porción" : "porciones"
    

    const deleteItem = () => {
        let userId = localStorage.getItem("userId");
        let apiKey = localStorage.getItem("apiKey");

        let requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKey,
                "iduser": userId
            }
        };

        fetch(`https://calcount.develotion.com/registros.php?idRegistro=${intakeId}`, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                else if (response.status === 401) {
                    throw new Error('Autenticación fallida');
                }
                else {
                    throw new Error('Error en la solicitud');
                }
            })
            .then(result => {
                dispatch(deleteIntake(intakeId));
                toast.success(result.mensaje);
            })
            .catch(error => {
                if (error.message === "Autenticación fallida") {
                    localStorage.clear();
                    dispatch(saveIntakes([]));
                    dispatch(saveFilter(""));
                    navigate("/");
                }
                toast.error(error.message);
            });
    }


    return (
        <tr className="rounded">
            <td><img src={`https://calcount.develotion.com/imgs/${food.imagen}.png`} alt={`Ícono de ${food.nombre} de color blanco`} /></td>
            <td>{food.nombre}</td>
            <td>{`${quantity}${unit} (${portionsNumber} ${portionOrPortions})`}</td>
            <td>{formatDate(date)}</td>
            <td><img src={bin} alt="Ícono de papelera de color rojo" onClick={deleteItem} /></td>
        </tr>
    )
}

export default IntakeItem