import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { saveIntake, saveIntakes } from "../features/intakesSlice";
import { saveFilter } from "../features/listSlice";
import { useNavigate } from "react-router-dom";

const AddIntake = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    //Get data
    const foods = useSelector(state => state.foods.foods);
    const sortedFoods = [...foods].sort((a, b) => a.nombre.localeCompare(b.nombre));

    const food = useRef(null);
    const quantity = useRef(null);
    const consumptionDate = useRef(null);

    const [inputFood, setInputFood] = useState("");
    const [inputQuantity, setInputQuantity] = useState("");
    const [inputDate, setInputDate] = useState("");
    const [foodMeasurementUnit, setFoodMeasurementUnit] = useState("");

    let userId = localStorage.getItem("userId");
    let apiKey = localStorage.getItem("apiKey");

    //Track food input value and set food measurement unit
    const handleInputChange = e => {
        let value = e.target.value;
        setInputFood(value);

        let foodItem = foods.find(f => f.id == value);
        let unit = foodItem.porcion[foodItem.porcion.length - 1];
        if (unit === "u") {
            setFoodMeasurementUnit("(Unidades)");
        }
        else if (unit === "m") {
            setFoodMeasurementUnit("(Mililitros)");
        }
        else if (unit === "g") {
            setFoodMeasurementUnit("(Gramos)")
        }
    };

    const emptyFields = () => {
        setInputFood("");
        setInputQuantity("");
        setInputDate("");
    }

    const addIntake = () => {
        //Get input values
        let foodId = food.current.value;
        let quant = quantity.current.value;
        let date = consumptionDate.current.value;
        let inputDate = new Date(date + "T00:00:00Z");
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        //Validations
        if (foodId === "" || quant === "" || date === "") {
            toast.error("Debe completar todos los campos");
        }
        else if (quant <= 0) {
            toast.error("La cantidad debe ser positiva");
        }
        else if (inputDate > currentDate) {
            toast.error("La fecha no puede ser posterior a la actual");
        }
        else {
            let intakeObj = {
                "idAlimento": Number(foodId),
                "idUsuario": Number(userId),
                "cantidad": Number(quant),
                "fecha": date
            }

            let requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "apikey": apiKey,
                    "iduser": userId
                },
                body: JSON.stringify(intakeObj)
            };

            fetch("https://calcount.develotion.com/registros.php", requestOptions)
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
                    intakeObj.id = result.idRegistro;
                    dispatch(saveIntake(intakeObj));
                    emptyFields();
                    setFoodMeasurementUnit("");
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
    }

    return (
        <div className="col-12 col-sm-6 col-xl-3 p-1" id="addIntake">
            <section className="p-4 rounded d-flex align-items-center">
                <form className="w-100">
                    <label htmlFor="txtDashboardAddIntake" className="form-label mb-1">Alimento</label>
                    <select className="form-select mb-2" id="txtDashboardAddIntake" value={inputFood} onChange={handleInputChange} ref={food} >
                        <option value="" disabled></option>
                        {sortedFoods.map(food => <option key={food.id} value={food.id}>{food.nombre}</option>)}
                    </select>
                    <label htmlFor="txtDashboardAddQuantity" className="form-label mb-1">Cantidad {foodMeasurementUnit}</label>
                    <input type="number" className="form-control mb-2" id="txtDashboardAddQuantity" value={inputQuantity} onChange={e => setInputQuantity(e.target.value)} ref={quantity} />
                    <label htmlFor="txtDashboardAddDate" className="form-label mb-1">Fecha de consumo</label>
                    <input type="date" className="form-control mb-4" id="txtDashboardAddDate" value={inputDate} onChange={e => setInputDate(e.target.value)} ref={consumptionDate} />
                    <input type="button" className="btn btn-warning w-100" value="Registrar" onClick={addIntake} />
                </form>
            </section>
        </div>
    )
}

export default AddIntake