import { useHistory, useLocation } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import DeleteModal from "../../utilities/deleteModal";


const ProjectTab = ({projArr}) => {
  const history = useHistory()
  const location = useLocation()

  const goTo = (link) => {
    return history.push(link)
  }

  const editClick = (projectId) => {
    return history.push(`/projects/${projectId}/edit`)
  }

  return (
    <div>
      <h2 className="tab-title">Your Projects</h2>
        {projArr.length ? projArr.reverse().map(project => (
        <div key={project.id} className="profile-page-projects">
          <h3 id="ppp-title" className="link" onClick={() => goTo(`/projects/${project.id}`)} >{project.title}</h3>
          <div id="ppp-buttons">
            <button onClick={e => editClick(project.id)}>Edit This</button>
            <OpenModalButton
              modalComponent={<DeleteModal type="project" project={project} url={location.pathname}/>}
              modalClasses={["delete-modal"]}
              buttonText={"Delete This"}
              />
          </div>
        </div>)) : <h3 className="no-liked-projects">You haven't created any projects yet!</h3>}
    </div>
  );
}

export default ProjectTab;
