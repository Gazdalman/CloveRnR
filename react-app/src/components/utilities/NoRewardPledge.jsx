import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPledge } from "../../store/pledge";
import { setRequestedProject } from "../../store/userProjects";

const NoRewardPledge = ({amount, projId}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const pledgeAnyway = async (e) => {
    e.preventDefault();
    // console.log(amount);
    const res = await dispatch(createPledge({"amount": amount}, projId));
    await dispatch(setRequestedProject(projId));
    closeModal();
  }

  return (
    <div className="pledge">
      <div className="pledge__header">
        <h2 className="pledge__title">Pledge With No Reward?</h2>
      </div>
      <div className="pledge__body">
        <p className="pledge__description">
          Choose to support us without a reward if you simply believe in our
          project. As a backer, you will be signed up to receive product
          updates via email! (Someday at least)
        </p>
      </div>
      <div className="pledge__footer">
          <button onClick={pledgeAnyway} className="pledge-anyway">Pledge Anyway</button>
      </div>
    </div>
  );
}

export default NoRewardPledge;
