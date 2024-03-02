import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const MacronutrientsGraph = () => {
    //Get data
    const intakes = useSelector(state => state.intakes.intakes);
    const foods = useSelector(state => state.foods.foods);

    const [macronutrientsDistribution, setMacronutrientsDistribution] = useState([]);

    const calculatePercentage = (count, total) => (count * 100) / total;

    useEffect(() => {
        //Count macronutrients
        let proteins = 0;
        let fats = 0;
        let carbohydrates = 0;

        intakes.forEach(intake => {
            let food = foods.find(f => f.id === intake.idAlimento);

            proteins += food.proteinas;
            fats += food.grasas;
            carbohydrates += food.carbohidratos;
        });

        let totalConsumption = proteins + fats + carbohydrates;

        //Save final array
        if (proteins !== 0 || fats !== 0 || carbohydrates !== 0) {
            setMacronutrientsDistribution([
                {
                    "macronutrient": "Proteínas",
                    "percentage": calculatePercentage(proteins, totalConsumption)
                },
                {
                    "macronutrient": "Grasas",
                    "percentage": calculatePercentage(fats, totalConsumption)
                },
                {
                    "macronutrient": "Glúcidos",
                    "percentage": calculatePercentage(carbohydrates, totalConsumption)
                }
            ])
        }
        else{
            setMacronutrientsDistribution([]);
        }
    }, [intakes])

    return (
        <div className="col-12 col-sm-5 col-xl-3 p-1 order-sm-4" id="macronutrientsGraph">
            <section className="rounded text-center d-flex align-items-center justify-content-center p-4 p-sm-3 p-md-4 p-xxl-2">
                {macronutrientsDistribution.length === 0
                    ? <p className="text-center m-0">Agrega registros para visualizar el gráfico</p>
                    : <Doughnut options={{
                        plugins: {
                            legend: {
                                display: true,
                                position: 'right',
                                labels: {
                                    color: 'rgba(255, 255, 255, 0.77)',
                                },
                            },
                        },
                    }} data={{
                        labels: macronutrientsDistribution.map(m => m.macronutrient),
                        datasets: [
                            {
                                label: 'Consumo (%)',
                                data: macronutrientsDistribution.map(m => Math.round(m.percentage)),
                                backgroundColor: [
                                    'rgb(255, 193, 7)',
                                    'rgb(26, 131, 194)',
                                    'rgb(16, 144, 24)',
                                ],
                                borderWidth: 0,
                            },
                        ],
                    }} />
                }
            </section>
        </div>
    )
}

export default MacronutrientsGraph