import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CaloriesPerDayGraph = () => {
    //Graph styles
    let gridColor = "rgba(255, 255, 255, 0.4)";
    let ticksColor = "rgba(255, 255, 255, 0.85)";

    //Get data
    const foods = useSelector(state => state.foods.foods);
    const intakes = useSelector(state => state.intakes.intakes);

    const [resultArrayWithFormattedDatesReversed, setResultArrayWithFormattedDatesReversed] = useState([]);

    useEffect(() => {
        //Create array structure
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        let resultArray = [];
        for (let i = 0; i < 7; i++) {
            let date = new Date(currentDate);
            date.setDate(currentDate.getDate() - i);
            let formattedDate = date.toISOString().split("T")[0];

            resultArray.push({
                date: formattedDate,
                calories: 0
            });
        }

        //Add calories count
        intakes.forEach(intake => {
            let food = foods.find(f => f.id === intake.idAlimento);
            let portion = Number(food.porcion.slice(0, food.porcion.length - 1));
            let calories = ((intake.cantidad / portion) * food.calorias);

            for (let l = 0; l < resultArray.length; l++) {
                if (resultArray[l].date === intake.fecha) {
                    resultArray[l].calories += calories;
                    break;
                }
            }
        });

        //Format dates
        const resultArrayWithFormattedDates = resultArray.map(day => {
            let date = day.date.substring(8, 10);
            let month = day.date.substring(5, 7);
            let formattedDate = `${date}/${month}`;
            return {
                ...day,
                date: formattedDate
            };
        })

        //Reverse array
        setResultArrayWithFormattedDatesReversed([...resultArrayWithFormattedDates].reverse());
    }, [intakes])



    return (
        <div className="col-12 col-sm-6 col-xl-3 p-1 order-sm-3" id="caloriesPerDayGraph">
            <section className="rounded text-center d-flex align-items-center justify-content-center p-3">
                {resultArrayWithFormattedDatesReversed.filter(intake => intake.calories !== 0).length === 0
                    ? <p className="text-center m-0">Agrega registros en la última semana para visualizar el gráfico</p>
                    : <Bar options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false,
                                position: 'top'
                            },
                            title: {
                                display: false,
                                text: 'Calorías por fecha',
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
                        labels: resultArrayWithFormattedDatesReversed.map(day => day.date),
                        datasets: [
                            {
                                label: 'Cantidad de calorías',
                                data: resultArrayWithFormattedDatesReversed.map(day => day.calories),
                                backgroundColor: 'rgba(255, 193, 7, 1)',
                            },
                        ],
                    }} />
                }
            </section>
        </div>
    )
}

export default CaloriesPerDayGraph