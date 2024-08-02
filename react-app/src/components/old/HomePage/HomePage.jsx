import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProjects, likeProject } from "../../store/project";
import "./HomePage.css"
import { useHistory, useLocation } from "react-router-dom";
import { refreshUser } from "../../store/session";

const HomePage = () => {
  const history = useHistory()
  // const location = useLocation()
  const user = useSelector(state => state.session.user)
  const projArr = useSelector(state => state.projects)
  const projects = projObj(projArr)
  const [isLoaded, setIsLoaded] = useState(false);
  // const [progress, setProgress] = useState(0);
  const dispatch = useDispatch()

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

  useEffect(() => {
    dispatch(getAllProjects())
    setIsLoaded(true)
  }, [dispatch])

  return isLoaded && projArr.length ? (
    <div id="home-page">
      <h1 id="home-page-title">Top Earners</h1>
      <div id="home-page-cards">
        {projArr.map(project => (
          <div key={project.id} className="home-project-card">
            <div className="link" id="hp-card-img" onClick={() => goTo(`/projects/${project.id}`)} >
              <img id="project-hp-pic" src={project.image} />
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
        ))}
      </div>
    </div>
  ) : null
}

export default HomePage
