import DailyCalories from "./DailyCalories"
import TotalCalories from "./TotalCalories"

const CaloriesCounter = () => {
    return (
        <div className="col-12 col-sm-6 col-xl-4 p-1" id="caloriesCounter">
            <section className="rounded text-center d-flex align-items-center justify-content-center py-3">
                <div className="row">
                    <TotalCalories />
                    <DailyCalories />           
                </div>
            </section>
        </div>
    )
}

export default CaloriesCounter