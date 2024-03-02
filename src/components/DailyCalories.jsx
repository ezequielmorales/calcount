import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux"

const DailyCalories = () => {
    //Get data
    const foods = useSelector(state => state.foods.foods);
    const intakes = useSelector(state => state.intakes.intakes);
        
    let todayIntakes = intakes.filter(intake => {
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        let currentDateStr = currentDate.toISOString().slice(0, 10);

        return intake.fecha === currentDateStr;
    });

    const [dailyCalories, setDailyCalories] = useState(0);
    const [dailyCaloriesColor, setDailyCaloriesColor] = useState("");


    useEffect(() => {
        //Count calories
        let calories = 0;

        todayIntakes.forEach(intake => {
            const food = foods.find(f => f.id === intake.idAlimento);
            const portion = Number(food.porcion.slice(0, food.porcion.length - 1));
            calories += ((intake.cantidad / portion) * food.calorias);
        });

        setDailyCalories(calories);

        //Set color
        let dailyCaloriesGoal = localStorage.getItem("dailyCalories");
        if (calories > dailyCaloriesGoal) {
            setDailyCaloriesColor("calRed");
        }
        else if (calories > dailyCaloriesGoal * 0.9) {
            setDailyCaloriesColor("calYellow");
        }
        else {
            setDailyCaloriesColor("calGreen");
        }
    }, [todayIntakes])

    return (
        <article className={`p-2 ${dailyCaloriesColor}`} id="dailyCalories">
            <h2 className="m-0">Calorías diarias</h2>
            <h3>{dailyCalories.toFixed()}<span>cal</span></h3>
        </article>
    )
}

export default DailyCalories