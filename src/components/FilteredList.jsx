import IntakeFilter from "./IntakeFilter"
import IntakeList from "./IntakeList"

const FilteredList = () => {
    return (
        <div className="col-12 col-xl-5 p-1 order-sm-1 order-xl-0" id="filteredList">
            <section className="rounded pb-3 px-2">
                <IntakeFilter />
                <IntakeList />
            </section>
        </div>
    )
}

export default FilteredList