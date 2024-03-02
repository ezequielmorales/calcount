import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    let navigate = useNavigate();

    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        //Set interval
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        //Clear interval
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (seconds === 0) {
            navigate("/");
        }
    }, [seconds]);

    return (
        <section className="row d-flex align-items-center" id="notFound">
            <article className="text-center">
                <h2 className="px-4 pt-4">Página no encontrada</h2>
                <p className="mb-4 pt-1">Redireccionando en {seconds}</p>
            </article>
        </section>
    )
}

export default NotFound
