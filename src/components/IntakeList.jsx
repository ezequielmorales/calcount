import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import IntakeItem from "./IntakeItem";

const IntakeList = () => {
    //Get data
    const filter = useSelector(state => state.list.filter);
    const foods = useSelector(state => state.foods.foods);
    const intakes = useSelector(state => state.intakes.intakes);

    const [intakesResult, setIntakesResult] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let intakesFiltered = intakes;

        const filterByDateDifference = (numberOfDays) => {
            let currentDate = new Date();    
            currentDate.setHours(0, 0, 0, 0);        

            let dateLimit = currentDate;   
            dateLimit.setDate(dateLimit.getDate() - (numberOfDays));
            let dateLimitStr = dateLimit.toISOString().slice(0, 10);

            intakesFiltered = intakes.filter(intake => dateLimitStr < intake.fecha);
        }

        if (filter === "last7Days") {
            filterByDateDifference(7);
        }
        else if (filter === "last30Days") {
            filterByDateDifference(30);
        }

        //Invert array
        let intakesReversed = [...intakesFiltered].reverse();

        //Set final array
        setIntakesResult(intakesReversed);
    }, [intakes, filter])


    useEffect(() => {
        setLoading(intakes.length === 0 && foods.length === 0);
    }, [intakes]);


    return (
        <article className={`pb-4 ${loading ? 'd-flex justify-content-center align-items-center' : ''}`} id="intakeList">
            {loading ? (
                <div className="d-flex justify-content-center my-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                intakesResult.length === 0
                    ? <p className="text-center pt-2">Agrega registros para visualizar el listado</p>
                    : <table className="my-2 mx-auto pb-2">
                        <tbody>
                            {intakesResult.map(intake => {
                                let food = foods.find(foodItem => foodItem.id === intake.idAlimento);
                                return <IntakeItem key={intake.id} {...intake} food={food} />;
                            })
                            }
                        </tbody>
                    </table>
            )}
        </article>
    );
};

export default IntakeList;