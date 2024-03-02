import Logo from "./Logo"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogIn = () => {
  let navigate = useNavigate();

  //Input refs
  const username = useRef(null);
  const password = useRef(null);

  let user;
  let pass;

  const [completedFields, setCompletedFields] = useState(false);


  useEffect(() => {
    localStorage.getItem("userId") !== null && navigate("/dashboard");
  }, [])


  const logIn = () => {
    //Input values
    user = username.current.value.trim();
    pass = password.current.value;

    //Validation
    if (user === "" || pass === "") {
      toast.error("Debe completar los campos");
    }
    else {
      let requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "usuario": user,
          "password": pass
        })
      };

      fetch("https://calcount.develotion.com/login.php", requestOptions)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
          else if (response.status === 409) {
            throw new Error('Usuario y/o contraseña incorrectos');
          }
          else {
            throw new Error('Error en la solicitud');
          }
        })
        .then(result => {
          localStorage.setItem("apiKey", result.apiKey);
          localStorage.setItem("userId", result.id);
          localStorage.setItem("dailyCalories", result.caloriasDiarias);

          navigate("/dashboard");
        })
        .catch(error => {
          toast.error(error.message);
        });
    }
  }

  const evaluateFieldEmptiness = () => {
    //Input values
    user = username.current.value.trim();
    pass = password.current.value;

    (user !== "" && pass !== "") ? setCompletedFields(true) : setCompletedFields(false);
  }

  const handleKeyDown = e => {
    if (e.key === "Enter" && completedFields) {
      logIn();
    }
  }


  return (
    <section className="row">
      <article className="col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 offset-sm-2 offset-md-3 offset-lg-3 offset-xl-3 offset-xxl-2" id="logIn">
        <Logo />

        <form className="px-4 pt-4 pb-5 mx-2">
          <label htmlFor="txtLoginUsername" className="form-label mb-1">Nombre de usuario</label>
          <input type="text" className="form-control mb-3" id="txtLoginUsername" onChange={evaluateFieldEmptiness} onKeyDown={handleKeyDown} ref={username} />
          <label htmlFor="txtLoginPassword" className="form-label mb-1">Contraseña</label>
          <input type="password" className="form-control mb-3" id="txtLoginPassword" onChange={evaluateFieldEmptiness} onKeyDown={handleKeyDown} ref={password} />
          <input type="button" className="btn btn-warning d-block mx-auto w-100" value="Iniciar Sesión" onClick={logIn} disabled={!completedFields} />
        </form>
        
        <p className="text-center mb-5">¿Nuevo en Calcount? <Link to="/signup" className="text-decoration-none">Crear una cuenta</Link></p>
      </article>
    </section>
  )
}

export default LogIn