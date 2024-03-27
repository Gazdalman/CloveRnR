import OpenModalButton from "../../OpenModalButton";
import EditPledge from "./EditPledge";
import DeleteModal from "../../utilities/deleteModal";
import { useHistory } from "react-router-dom";

const EarnedRewards = ({ earnedRewards, userId }) => {
  const history = useHistory()

  return (
    <div id="earned-rewards">
      <h2 className="tab-title">Projects Pledged To</h2>
      <div id="earned-rewards-container">
        {earnedRewards.length ? earnedRewards.map((backedProject) => (
          <div className="ppp-reward-proj-container" key={backedProject.project.id}>
            <div className="ppp-reward-proj-image">
                <img onClick={() => history.push(`/projects/${backedProject.project.id}`)} id="reward-proj-img" src={backedProject.project.image} alt="reward" />
            </div>
            <div className="ppp-reward-proj-details">
              <a href={`/projects/${backedProject.project.id}`} className="link">
                <h4 id="ppp-rp-title">{backedProject.project.title}</h4>
              </a>
              <p>{backedProject.project.user}</p>
              <p>${backedProject.amount} pledged</p>
              <p>{backedProject.rewards.length} {backedProject.rewards.length == 1 ? "Reward" : "Rewards"} Earned Out of {backedProject.project.rewards.length}</p>
              <OpenModalButton
                modalClasses={["earned-rewards-btn"]}
                modalComponent={<EditPledge pledge={backedProject} userId={userId} />}
                buttonText={"Change Pledge"}
              />
              <OpenModalButton
                modalClasses={["earned-rewards-btn"]}
                modalComponent={<DeleteModal type="pledge" pledge={backedProject} />}
                buttonText={"Delete Pledge"}
              />
            </div>
          </div>
        )) : <h3 className="no-liked-projects">You haven't pledged to any projects yet!</h3>}
      </div>
    </div>
  );
}

export default EarnedRewards;
