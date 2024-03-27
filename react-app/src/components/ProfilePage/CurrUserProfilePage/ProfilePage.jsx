import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, getCurrUserProjects } from "../../../store/userProjects";
import { useHistory } from "react-router-dom";
import "../ProfilePage.css"
import OpenModalButton from "../../OpenModalButton";
import DeleteModal from "../../utilities/deleteModal";
import ProjectTab from "./ProjectTab";
import EarnedRewards from "./EarnedRewards";
import LikedProjects from "./LikedProjects";

const ProfilePage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currUser = useSelector(state => state.session.user);
  const projects = useSelector(state => state.userProjects);
  const projArr = Object.values(projects);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tab, setTab] = useState("projects")

  useEffect(() => {
    const getProjects = async () => {
      await dispatch(getCurrUserProjects())
      setIsLoaded(true)
    }
    getProjects()
  }, [dispatch])
  return isLoaded ? (
    <div id="ppp-div">
      <h1>{currUser.username}</h1>
      <div id="ppp-tabs">
        <h3 id="ppp-projects-tab" className="link" onClick={() => setTab("projects")}>Projects</h3>
        <h3 id="ppp-rewards-tab" className="link" onClick={() => setTab("pledges")}>Pledges</h3>
        <h3 id="ppp-backed-tab" className="link" onClick={() => setTab("liked")}>Liked</h3>
      </div>
      {tab == "projects" && <ProjectTab projArr={projArr} />}
      {tab == "pledges" && <EarnedRewards earnedRewards={currUser.backed} userId={currUser.id}/>}
      {tab == "liked" && <LikedProjects userId={currUser.id} likedProjects={Object.values(currUser.liked)} />}
    </div>
  ) : <h1 className="loading-message">We Loadin...</h1>
}

export default ProfilePage
