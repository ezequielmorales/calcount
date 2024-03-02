import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux"

const TotalCalories = () => {
    //Get data
    const intakes = useSelector(state => state.intakes.intakes)
    const foods = useSelector(state => state.foods.foods)

    const [totalCalories, setTotalCalories] = useState(0);

    useEffect(() => {
        //Count calories
        let calories = 0;

        intakes.forEach(intake => {
            let food = foods.find(f => f.id === intake.idAlimento);
            let portion = Number(food.porcion.slice(0, food.porcion.length-1));
            calories += ((intake.cantidad / portion ) * food.calorias);
        });

        setTotalCalories(calories);
    }, [intakes])


    return (
        <article className="p-2" id="totalCalories">
            <h2 className="m-0">Calorías totales</h2>
            <h3>{totalCalories.toFixed()}<span>cal</span></h3>
        </article>
    )
}

export default TotalCalories