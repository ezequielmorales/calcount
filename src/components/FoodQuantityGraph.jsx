import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const FoodQuantityGraph = () => {
    //Graph styles
    let gridColor = "rgba(255, 255, 255, 0.4)";
    let ticksColor = "rgba(255, 255, 255, 0.85)";

    //Load data
    const foods = useSelector(state => state.foods.foods);
    const intakes = useSelector(state => state.intakes.intakes);

    const [resultArray, setResultArray] = useState([])

    useEffect(() => {
        let foodCount = {};

        //Create a property in 'foodCount' to each food with the count as value
        intakes.forEach(intake => {
            let food = foods.find(f => f.id === intake.idAlimento);

            //Increment the count for the food in the 'foodCount' object
            if (foodCount[food.nombre]) {
                foodCount[food.nombre]++;
            } else {
                //If the food is not in the 'foodCount' object, initialize its count to 1
                foodCount[food.nombre] = 1;
            }
        });

        let auxArray = [];

        //Push entries to 'auxArray'
        for (const [foodName, count] of Object.entries(foodCount)) {
            auxArray.push({ name: foodName, count });
        }

        setResultArray(auxArray);
    }, [intakes])


    return (
        <div className="col-12 col-sm-6 col-xl-3 p-1 order-sm-2" id="foodQuantityGraph">
            <section className="rounded text-center d-flex align-items-center justify-content-center p-3">
                {resultArray.length === 0
                    ? <p className="text-center m-0">Agrega registros para visualizar el gráfico</p>
                    : <Bar options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false,
                                position: 'top'
                            },
                            title: {
                                display: false,
                                text: 'Cantidades por alimento',
                            },
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: `${ticksColor}`,
                                },
                                grid: {
                                    color: `${gridColor}`,
                                }
                            },
                            y: {
                                ticks: {
                                    color: `${ticksColor}`,
                                },
                                grid: {
                                    color: `${gridColor}`,
                                }
                            }
                        }
                    }} data={{
                        labels: resultArray.map(food => food.name),
                        datasets: [
                            {
                                label: 'Cantidad',
                                data: resultArray.map(food => food.count),
                                backgroundColor: 'rgba(255, 193, 7, 1)',
                            },
                        ],
                    }} />
                }
            </section>
        </div>
    )
}

export default FoodQuantityGraph