import { useState } from "react"
import MainCategory from "./MainCategory"
import SecondCategory from "./SecondCategory"
import Location from "./Location"

const Basics = (
  {
    mainCategory,
    mainSubcat,
    setMainCategory,
    setMainSubcat,
    location,
    setLocation,
    setSecondCat,
    secondCat,
    secondSubcat,
    setSecondSubcat,
    setTab,
    categories
  }
) => {
  const [page, setPage] = useState(1)

  const pageChange = (e, direction) => {
    e.preventDefault()
    if (direction == 'down' && page != 1) {
      setPage(page - 1)
    } else if (direction == 'up' && page != 3) {
      setPage(page + 1)
    }

  }

  const tabChange = (e) => {
    e.preventDefault()
    setTab("project-info")
  }

  return (
    <div>
      <span id="basics-pg-number">{page} of 3</span>
      {page == 1 &&
        <MainCategory
          mainCategory={mainCategory}
          mainSubcat={mainSubcat}
          setMainCategory={setMainCategory}
          setMainSubcat={setMainSubcat}
          categories={categories}
        />

      }
      {page == 2 &&
        <SecondCategory
          secondCat={secondCat}
          setSecondCat={setSecondCat}
          secondSubcat={secondSubcat}
          setSecondSubcat={setSecondSubcat}
          categories={categories}
        />
      }
      {page == 3 &&
        <Location
          location={location}
          setLocation={setLocation}
        />
      }
      <div className="form-nav">
        {page > 1 && <button id="project-back-button" onClick={e => pageChange(e, "down")} >
          {page == 2 && "Back to Main Category"}
          {page == 3 && "Back to Second Category"}
        </button>}
        {page < 3 ? <button className="project-next-button" id={`page-${page}`} onClick={e => pageChange(e, "up")} disabled={(page == 1 && !mainCategory || !mainSubcat)}>Next</button> :
        <button id="to-project-details" disabled={location.length < 5} onClick={tabChange}>Next: Project Details</button>
        }
      </div>
    </div>
  )
}

export default Basics
