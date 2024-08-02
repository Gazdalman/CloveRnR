import OpenModalButton from "../../OpenModalButton";
import PPRewardTab from "../PPForms/PPReward";
import { createPledge } from "../../../store/pledge";
import "./RewardTab.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setRequestedProject } from "../../../store/userProjects";
import { useHistory } from "react-router-dom"
import { deleteReward } from "../../../store/project";
import DeleteModal from "../../utilities/deleteModal";
import PPEditRewardTab from "../PPForms/EditReward";
import EditRewardItemForm from "../PPForms/EditRewardItem";
import LoginFormModal from "../../LoginFormModal";
import AddRewardItem from "../PPForms/AddRewardItem";
import NoRewardPledge from "../../utilities/NoRewardPledge";
import { refreshUser } from "../../../store/session";

const RewardTab = ({ rewards, user, projectOwner, projId, setShowForm, showForm }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [singleReward, setSingleReward] = useState("")

  const changeDate = (date) => {
    const selectedDate = new Date(date);

    const month = selectedDate.toLocaleString('default', { month: 'long' });
    const year = selectedDate.getFullYear();
    return `${month.slice(0, 3)} ${year}`
  }

  const addCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const loginRedirect = (e) => {
    e.preventDefault()
    return history.push("/login")
  }

  const noFundingYet = (e) => {
    e.preventDefault()

    window.alert("You can't spend your money yet. Which is good because this is a terrible idea...")
  }

  const openRewardForm = (e, type, reward) => {
    e.preventDefault()
    if (type == "create") {
      setShowForm(type)
    } else {
      setSingleReward(reward)
      setShowForm(type)
    }
  }

  const deleteAReward = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()

    const res = await dispatch(deleteReward(id));
    if (res === 'ok')
      dispatch(setRequestedProject(projId));

  }

  const pledgeForReward = async (e, amount) => {
    e.preventDefault()
    e.stopPropagation()

    await dispatch(createPledge({ "amount": amount }, projId));
    await dispatch(setRequestedProject(projId));
    await dispatch(refreshUser(user.id))
  }

  return rewards ? (
    !showForm ? (<div id="rewards-div">
      <h2>Rewards</h2>
      {rewards.length < 1 ? <span>No rewards listed for this project</span> : null}
      {rewards.map(reward => (
        <div key={reward.id} id="pp-reward-card">
          <div id="pp-reward-card-image">
            <img id="pp-rcd-image" src={reward.image} alt={reward.title} />
          </div>
          <div id="pp-reward-card-details">
            <div id="pp-rcd-upper">
              <h3 id="pp-rcd-title">{reward.title}</h3>
              <h3 id="pp-rcd-amount">${addCommas(reward.amount)}</h3>
            </div>
            <div id="pp-rcd-mid">
              {reward.physicalItems &&
                <div id="mid-shipping">
                  <p id="ms-header">Shipping</p>
                  <p id="ms-body">{reward.shipping}</p>
                </div>
              }
              <div id="mid-delivery">
                <p id="md-header">Estimated Delivery</p>
                <p id="md-body">{changeDate(reward.deliveryDate)}</p>
              </div>
              {!reward.unlimited &&
                <div id="mid-quantity">
                  <p id="mq-header">Limited Quantity</p>
                  <p id="mq-body">{reward.quantity} left</p>
                </div>
              }
            </div>
            <div id="pp-rcd-lower">
              {reward.description ? <p id="pp-rcd-desc">{reward.description}</p> : <p id="pp-rcd-desc">No Description</p>}
              {(user && user == projectOwner) ?
                <div id="add-item-btn">
                  <OpenModalButton
                    modalClasses={["pp-item-form"]}
                    modalComponent={<AddRewardItem
                      rewardId={reward.id}
                      projectId={projId}
                    />}
                    buttonText={"Add Item"}
                  />
                </div> : null}
              {reward.items.map(item => (
                <div key={item.id} id="pp-prod-item-card">
                  <div id="pp-rcd-item">
                    <div id="pp-item-details">
                      <p>{item.title}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    {item.image && <img id="pp-item-image" src={item.image} />}
                  </div>
                  {(user && user == projectOwner) ? <div id="item-button-div">
                    <OpenModalButton
                      modalClasses={["pp-edit-item-form"]}
                      modalComponent={<EditRewardItemForm
                        item={item}
                        projectId={projId}
                      />}
                      buttonText={"Edit Item"}
                    />
                    <OpenModalButton
                      modalClasses={["delete-item-button"]}
                      modalComponent={<DeleteModal item={item} projId={projId} type={"item"} />}
                      buttonText={"Delete Item"}
                    />
                  </div> : null}
                </div>
              ))}
              <div id="reward-buttons">
                {user ? (user != projectOwner ?
                  (reward.unlimited || reward.quantity > 0 ? <button id="pp-rcd-pledge-button" onClick={e => pledgeForReward(e, reward.amount)}>Burn ${addCommas(reward.amount)}</button> :
                    <OpenModalButton
                      modalClasses={["pp-rcd-pledge-button"]}
                      modalComponent={<NoRewardPledge projId={reward.projectId} amount={reward.amount}/>}
                      buttonText={"Burn $" + addCommas(reward.amount)}
                    />
                  ) :
                  <>
                    <OpenModalButton
                      modalClasses={["delete-reward-button"]}
                      modalComponent={<DeleteModal reward={reward} type={"reward"} />}
                      buttonText={"Delete Reward"}
                    />
                    <button onClick={e => openRewardForm(e, "edit", reward)} id="edit-reward-button">Edit Reward</button>
                  </>
                ) :
                  <OpenModalButton
                    modalClasses={["no-user-login-pledge"]}
                    modalComponent={<LoginFormModal />}
                    buttonText={"Login to Pledge"}
                  />
                }
              </div>
            </div>
          </div>

        </div>

      ))}
      {(user && user == projectOwner) ?
        <button onClick={e => openRewardForm(e, "create")} id="add-reward-button">Add Reward</button> : null}
    </div>
    )
      : (showForm == "create" ? <PPRewardTab
        projectId={projId}
        setShowForm={setShowForm}
      /> :
        <PPEditRewardTab
          projectId={projId}
          setShowForm={setShowForm}
          reward={singleReward}
          setReward={setSingleReward}
        />)) : (user && user == projectOwner) ?
    <div>
      <span>No rewards listed for this project</span>
      <button onClick={openRewardForm} id="add-reward-button">Add Reward</button>
    </div> : <span>No rewards listed for this project</span>
}

export default RewardTab
