import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPledge } from "../../store/pledge";
import { useModal } from "../../context/Modal";
import { setRequestedProject } from "../../store/userProjects";
import { refreshUser } from "../../store/session";
import { getAllProjects } from "../../store/project";

const PledgeForm = ({ projId,userId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [amount, setAmount] = useState("");
  const [focused, setFocused] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(createPledge({"amount": +amount}, projId));
    await dispatch(getAllProjects())
    await dispatch(setRequestedProject(projId));
    await dispatch(refreshUser(userId))
    closeModal();
  }

  const handleFocus = (field, e) => {
    e.preventDefault()
    setFocused(field);
  };

  const handleBlur = () => {
    setFocused("false");
  };

  return (
    <div id="pledge-div">
    <h1>Pledge</h1>
    <form id="actual-pledge-form" onSubmit={handleSubmit}>
    <div className={`pledge-field floating-input ${focused == "pledge" ? 'pledge' : ''}`}>
          <label className={`pledge-label input-label ${focused == "pledge" || amount ? 'label-focus' : ''}`}>
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onFocus={e => handleFocus("pledge", e)}
            onBlur={handleBlur}
            className="pledge-input input-field"
            required
          />
        </div>
      <button type="submit">Pledge</button>
    </form>
    </div>
  )
}

export default PledgeForm
