import DashboardHeader from "./DashboardHeader"
import DashboardContent from "./DashboardContent"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { saveIntakes } from "../features/intakesSlice"
import { saveFoods } from "../features/foodsSlice"
import { saveFilter } from "../features/listSlice";
import { toast } from 'react-toastify';

const Dashboard = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let userId = localStorage.getItem("userId");
  let apiKey = localStorage.getItem("apiKey");


  let requestOptions = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "apikey": apiKey,
      "iduser": userId
    }
  };

  //Load foods
  const loadFoods = () => {
    fetch(`https://calcount.develotion.com/alimentos.php`, requestOptions)
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
        dispatch(saveFoods(result.alimentos));
        loadIntakes();
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

  //Load intakes
  const loadIntakes = () => {
    fetch(`https://calcount.develotion.com/registros.php?idUsuario=${userId}`, requestOptions)
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
        dispatch(saveIntakes(result.registros));
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


  useEffect(() => {
    if (localStorage.getItem("userId") === null) {
      navigate("/");
    }
    else {
      loadFoods();
    }
  }, [])


  return (
    <div className="row px-4 py-3" id="dashboard">
      <DashboardHeader />
      <DashboardContent />
    </div>
  )
}

export default Dashboard