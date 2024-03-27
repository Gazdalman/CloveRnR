import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editPledge } from "../../../store/pledge";
import { refreshUser } from "../../../store/session";

const EditPledge = ({ pledge, userId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [amount, setAmount] = useState("");
  const [focused, setFocused] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(editPledge({ "amount": amount }, pledge.id));
    if (res) {
      await dispatch(refreshUser(userId));
      closeModal();
    }
  };

  const cancel = (e) => {
    e.preventDefault();
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
    <div id="edit-pledge-form">
      <h1>Edit Pledge</h1>
      <form onSubmit={handleSubmit}>
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
        <div id="pledge-edit-btns">
          <button type="submit">Edit Pledge</button>
          <button id="edit-pledge-cancel" onClick={e => cancel(e)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditPledge;
