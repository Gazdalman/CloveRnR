import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { likeProject } from "../../../store/project";
import { refreshUser } from "../../../store/session";

const LikedProjects = ({ likedProjects, userId }) => {
  const dispatch = useDispatch();

  // console.log(likedProjects);

  const like = async (e, id) => {
    const container = e.target.closest(".ppp-reward-proj-container");

    if (container) {
      container.className = "hidden"
    }

    const res = await dispatch(likeProject(id))
    if (res == 'ok')
      await dispatch(refreshUser(userId))
    // return history.go(0)
  }
  return (
    <div id="earned-rewards">
      <h2 className="tab-title">Liked Projects</h2>
      <div id="earned-rewards-container">
        {likedProjects.length > 0 ? likedProjects.map((project) => (
          <div className="ppp-reward-proj-container" key={project.id}>
            <div className="ppp-reward-proj-image">
              <img id="reward-proj-img" src={project.image} alt="reward" />
            </div>
            <div className="ppp-reward-proj-details">
              <a href={`/projects/${project.id}`} className="link">
                <h4 id="ppp-rp-title">{project.title}</h4>
              </a>
              <p>{project.user}</p>
              <div id="pp-like-heart">
                <i onClick={(e) => like(e, project.id)} className="fas fa-heart" id="pp-heart"></i>
              </div>
            </div>
          </div>
        )) : <h3 className="no-liked-projects">You haven't liked any projects yet!</h3>}
      </div>
    </div>
  );
}

export default LikedProjects;
