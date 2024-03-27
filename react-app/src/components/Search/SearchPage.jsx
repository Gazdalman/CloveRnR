import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProjects, likeProject } from "../../store/project";
import { useHistory, useLocation } from "react-router-dom";
import { refreshUser } from "../../store/session";
import { getResults } from "../../store/search";
// import { useCookies } from "react-cookie";
import "./SearchPage.css"

const SearchPage = () => {
  // const [cookies, setCookie, removeCookie] = useCookies(["page"])
  // const searchParams = localStorage.getItem("search")
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [disabled, setDisabled] = useState(false)
  const projArr = useSelector(state => state.searchResults)
  const history = useHistory()
  // const location = useLocation()
  const user = useSelector(state => state.session.user)
  const defaultProj = useSelector(state => state.projects)
  const projects = projObj(projArr)
  const [isLoaded, setIsLoaded] = useState(false);
  // const [progress, setProgress] = useState(0);
  const dispatch = useDispatch()

  // console.log("This is the search text", searchText);
  // console.log("This is the page number", pageNumber);



  function projObj(arr) {

    if (!arr.length) return {}

    const obj = {}
    arr.forEach(project => {
      obj[project.id] = project
    })
    return obj
  }

  const daysLeft = (date) => {
    const today = new Date();
    const end = new Date(date)
    const difference = end - today;

    return Math.floor(difference / (1000 * 60 * 60 * 24))
  }

  const like = async (e, id) => {

    if (user.id == projects[id].userId) {
      window.alert("You can't like your own project!")
      return
    }

    if (e.target.className == "far fa-heart") {
      e.target.className = "fas fa-heart";
    } else {
      e.target.className = "far fa-heart";
    }

    const res = await dispatch(likeProject(id))
    if (res == 'ok')
      await dispatch(refreshUser(user.id))
    // return history.go(0)
  }

  const openLoginModal = () => {
    history.push("/login")
  }

  const goTo = (link) => {
    return history.push(link)
  }

  const addCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const setLetter = (number) => {
    if (number >= 1000000000) {
      return `${(number / 1000000000).toFixed(2)}B`
    } else if (number >= 1000000) {
      return `${(number / 1000000).toFixed(2)}M`
    }
  }

  const search = async (e) => {
    e.preventDefault();
    setPageNumber(1)
    if (!searchText) {
      const res = await dispatch(getResults(`page=1`))
      setDisabled(false)
      return
    }
    const paginate = `keyword=${searchText}`

    const res = await dispatch(getResults(paginate))
    setDisabled(false)

    // if (res.ok) {
    // setSearchText("")
    localStorage.setItem("search", searchText)
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // }
  }

  const pageUp = async (e) => {
    e.preventDefault()
    const newPage = pageNumber + 1
    // setPageNumber(newPage)

    const res = await dispatch(getResults(`page=${newPage}&keyword=${searchText || ""}`))
    if (res == "nope") {
      setDisabled(true)
      localStorage.setItem("page", pageNumber)
      return
    }
    localStorage.setItem("page", newPage)
    setPageNumber(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const pageDown = async (e) => {
    e.preventDefault()
    const newPage = pageNumber - 1
    if (disabled) setDisabled(false)
    localStorage.setItem("page", newPage)
    setPageNumber(newPage)

    const res = await dispatch(getResults(`page=${newPage}&keyword=${searchText || ""}`))
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    const search =  async (text) => {
      const paginate = `keyword=${text}`
      const res = await dispatch(getResults(paginate))
    }

    localStorage.setItem("page", 1)
    const text = localStorage.getItem("search")
    search(text ? text : "")
    setSearchText(text)

    return () => {
      localStorage.setItem("page", 1)
      localStorage.removeItem("search")
    }
  }, [])

  return (
    <div id="search-page">
      <h1 id="search-page-title">Search Results</h1>
      <div id="search-tools">
        <div id="search-page-bar">
          <input
            id="search-page-input"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyPress={e => e.key === "Enter" && search(e)}
          />
          <button onClick={search} id="search-page-button" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div id="search-page-cards">
        {projArr.length ? projArr.map(project => (
          <div key={project.id} className="search-project-card">
            <div className="link" id="hp-card-img" onClick={() => goTo(`/projects/${project.id}`)} >
            <img src={project.image} />
            </div>
            <div id="hp-card-details">
              <div id="title-and-heart">
                <h3 className="link" onClick={() => goTo(`/projects/${project.id}`)} id="hp-title">{project.title}</h3>
                <div id="hp-like-heart">
                  {user ? (
                    user.liked[project.id] ? (
                      <i onClick={(e) => like(e, project.id)} className="fas fa-heart" id="hp-heart"></i>
                    ) : (
                      <i onClick={(e) => like(e, project.id)} className="far fa-heart" id="hp-heart"></i>
                    )
                  ) : (
                    <i onClick={() => openLoginModal()} className="far fa-heart" id="hp-heart"></i>
                  )}
                </div>
              </div>
              <p id="hp-subtitle">{project.subtitle}</p>
              <span>by <span className="link" onClick={() => goTo(`/users/${project.userId}`)} id="hp-author">
                {project.user}
              </span>
              </span>
              <progress id="hp-progress" value={project.earned} max={project.goal}></progress>
              <div id="hp-mid">
                <div id="hp-earned">
                  <span id="hp-earned-upper">${project.earned <= 9999999 ? addCommas(project.earned.toFixed(2)) : setLetter(project.earned)}</span>
                  <span id="hp-earned-lower">pledged</span>
                </div>
                <div id="hp-percent-earned">
                  <span id="hp-percent-earned-upper">{((+project.earned / +project.goal) * 100).toFixed(2)}%</span>
                  <span id="hp-percent-earned-lower">earned</span>
                </div>
                <div id="hp-days-left">
                  <span id="hp-days-left-upper">{daysLeft(project.endDate) + 1}</span>
                  <span id="hp-days-left-lower">days left</span>
                </div>
              </div>
              <div id="hp-bottom">
                <span id="hp-subcategory">{project.mainSub}</span>
                <span id="hp-location">{project.location}</span>
              </div>
            </div>
          </div>
        )) : <h3 className="no-found-projects">No results found!</h3>}
      </div>
      {/* {projArr.length && projArr.length % 12 == 0 ? (
        <button id="see-more" onClick
      ) : null} */}
      <div id="pagination" className={pageNumber == 1 ? "one-button" : "two-buttons"}>
        {pageNumber > 1 ? <button onClick={pageDown} id="page-button" type="submit">Page Down</button> : null}
        <button className={`${pageNumber == 1 && "single-page-btn "} ${disabled ? "disabled" : ""}`} disabled={disabled || projArr.length < 12} onClick={pageUp} id="page-button" type="submit">
          Page Up
        </button>
        </div>
    </div>
  )
}

export default SearchPage
