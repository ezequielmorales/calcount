import AddIntake from "./AddIntake"
import FilteredList from "./FilteredList"
import CaloriesCounter from "./CaloriesCounter"
import FoodQuantityGraph from "./FoodQuantityGraph"
import CaloriesPerDayGraph from "./CaloriesPerDayGraph"
import UsersByCountryMap from "./UsersByCountryMap"
import MacronutrientsGraph from "./MacronutrientsGraph"

const DashboardContent = () => {
    return (
        <>
            <AddIntake />
            <FilteredList />
            <CaloriesCounter />
            <FoodQuantityGraph />
            <CaloriesPerDayGraph />
            <MacronutrientsGraph />
            <UsersByCountryMap />
        </>
    )
}

export default DashboardContent