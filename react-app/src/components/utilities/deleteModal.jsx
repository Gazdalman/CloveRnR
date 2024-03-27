import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteProject, getCurrUserProjects, setRequestedProject } from "../../store/userProjects";
import "./DeleteModal.css"
import { deleteItem, deleteReward } from "../../store/project";
import { useHistory } from "react-router-dom";
import { deletePledge } from "../../store/pledge";
import { refreshUser } from "../../store/session";

const DeleteModal = ({ method, project, pledge, reward, item, projId, type, url }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type == "project") {
      await dispatch(deleteProject(project.id))


      if (!url) {
        history.push("/")
      } else {
        await dispatch(getCurrUserProjects())
      }
    } else if (type == "reward") {
      const res = await dispatch(deleteReward(reward.id));
      if (res === "ok")
        await dispatch(setRequestedProject(reward.projectId));
    } else if (type == "pledge") {
      const res = await dispatch(deletePledge(pledge.id));
      if (res === "ok")
        await dispatch(refreshUser(user.id));
    } else {
      const res = await dispatch(deleteItem(item.id))
      if (res == "ok")
        await dispatch(setRequestedProject(projId))
    }
    closeModal()
  }

  return (
    <div id="delete-modal">
      <h1 id="delete-form-title">Confirm Delete</h1>
      <p
        style={{ width: 200 }}
        id="delete-text">
        {type === "reward" ?
          "Are you sure you want to delete this reward?" :
          (type === "project" ?
            "Are you sure you want to remove this project?" :
            "Are you sure you want to remove this item from this reward?"
          )}</p>
      <button
        onClick={e => handleSubmit(e)}
        style={{ width: 200, height: 45 }}
        type="submit" id="confirm-delete">Yes ({
          type === "reward" ?
            "Delete Reward" :
            (type === "project" ?
              "Delete Project" : (type === "pledge" ?
                "Delete Pledge" :
                "Delete Item"))})</button>
      <button
        type="button"
        style={{ marginBottom: "35px", width: 200, height: 45 }}
        onClick={() => closeModal()} id="cancel-delete">No ({
          type === "reward" ? "Keep Reward" :
            (type == "project" ? "Keep Project" :
              (type == "pledge" ? "Keep Pledge" : "Keep Item"))})</button>
    </div>
  )
}

export default DeleteModal
