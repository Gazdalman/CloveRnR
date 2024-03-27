import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../../store/session";
import { useParams, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import { getUserProjects } from "../../store/userProjects";


const UserProfilePage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const pageUser = useSelector(state => state.session.requestedUser);
  const currUser = useSelector(state => state.session.user);
  const projArr = useSelector(state => Object.values(state.userProjects));
  const [isLoaded, setIsLoaded] = useState(false)

  // console.log(projArr);
  const getProjects = async () => {
    await dispatch(getUserProjects(id))
    setIsLoaded(true)
  }

  const goTo = (link) => {
    return history.push(link)
  }

  useEffect(() => {
    if (currUser && currUser.id == id) {
      return history.push("/profile")
    }
    const mink = dispatch(getSingleUser(id))
    getProjects()
  }, [dispatch])

  return isLoaded && pageUser ? (
    <div id="user-profile-container">
      <h1 id="user-display-name">{pageUser.displayName}</h1>
      <p>{pageUser.biography}</p>
      <div>
        <h2 className="tab-title">Your Projects</h2>
        {projArr.length ? projArr.reverse().map(project => (
          <div key={project.id} className="profile-page-projects">
            <h3 id="ppp-title" className="link" onClick={() => goTo(`/projects/${project.id}`)} >{project.title}</h3>
          </div>)) : <h3 className="no-liked-projects">{pageUser.displayName} has no launched projects!</h3>}
      </div>
    </div>
  ) : null
}

export default UserProfilePage
