import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from "./Logo"

const SignUp = () => {
    let navigate = useNavigate();

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        //Load countries
        let requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch("https://calcount.develotion.com/paises.php", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    throw new Error('Error en la solicitud');
                }
            })
            .then(result => {
                setCountries(result.paises);
            })
            .catch(error => {
                toast.error(error.message);
            });
    }, [])

    //Input refs
    const username = useRef(null);
    const password = useRef(null);
    const passwordConfirmation = useRef(null);
    const country = useRef(null);
    const calories = useRef(null);

    const signUp = () => {
        //Input values
        let user = username.current.value.trim();
        let pass = password.current.value;
        let passConfirmation = passwordConfirmation.current.value;
        let countryId = country.current.value;
        let cal = calories.current.value;

        //Validations
        if (user === "" || pass === "" || passConfirmation === "" || countryId === "" || cal === "") {
            toast.error("Debe completar todos los campos");
        }
        else if (pass !== passConfirmation) {
            toast.error("Las contraseñas deben coincidir");
        }
        else if (pass.length < 8) {
            toast.error("La contraseña debe contener al menos 8 caracteres");
        }
        else if (!(/[A-Z]/.test(pass) && /[a-z]/.test(pass) && /[0-9]/.test(pass))) {
            toast.error("La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número");
        }
        else if (cal <= 0 || cal % 1 !== 0) {
            toast.error("El valor de calorías diarias debe ser un número entero positivo");
        }
        else {
            let raw = JSON.stringify({
                "usuario": user,
                "password": pass,
                "idPais": countryId,
                "caloriasDiarias": cal
            });

            let requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: raw
            };

            fetch("https://calcount.develotion.com/usuarios.php", requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else if (response.status === 409) {
                        throw new Error('Ya existe un usuario registrado con ese nombre');
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

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            signUp();
        }
    }



    return (
        <section className="row">
            <article className="col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 offset-sm-2 offset-md-3 offset-lg-3 offset-xl-3 offset-xxl-2" id="signUp">
                <Logo />

                <form className="px-4 pt-4 pb-5 mx-2">
                    <label htmlFor="txtSignUpUsername" className="form-label mb-1">Nombre de usuario</label>
                    <input type="text" className="form-control mb-3" id="txtSignUpUsername" onKeyDown={handleKeyDown} ref={username} />
                    <label htmlFor="txtSignUpPassword" className="form-label mb-1">Contraseña</label>
                    <input type="password" className="form-control mb-3" id="txtSignUpPassword" onKeyDown={handleKeyDown} ref={password} />
                    <label htmlFor="txtSignUpPasswordConfirmation" className="form-label mb-1">Confirmación de
                        contraseña</label>
                    <input type="password" className="form-control mb-3" id="txtSignUpPasswordConfirmation" onKeyDown={handleKeyDown} ref={passwordConfirmation} />
                    <label htmlFor="txtSignUpCountry" className="form-label mb-1">País</label>
                    <select className="form-select mb-3" id="txtSignUpCountry" defaultValue={""} ref={country}>
                        <option value="" disabled></option>
                        {countries.map(country => <option key={country.id} value={country.id}>{country.name}</option>)}
                    </select>
                    <label htmlFor="txtSignUpRecommendedCalories" className="form-label mb-1">Calorías diarias
                        recomendadas</label>
                    <input type="number" className="form-control mb-3" id="txtSignUpRecommendedCalories" onKeyDown={handleKeyDown} ref={calories} />
                    <input type="button" className="btn btn-warning d-block mx-auto w-100" value="Registrarme" onClick={signUp} />
                </form>

                <p className="text-center mb-5">¿Ya tienes una cuenta? <Link to="/" className="text-decoration-none">Iniciar sesión</Link></p>
            </article>
        </section>
    )
}

export default SignUp