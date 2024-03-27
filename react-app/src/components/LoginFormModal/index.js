import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [cred, setCred] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [focused, setFocused] = useState("");

  const loginDemo = async (e) => {
    e.preventDefault()
    await dispatch(login('demoNoodle', 'password'))
    closeModal()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(cred, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const handleFocus = (field, e) => {
    e.preventDefault()
    setFocused(field);
  };

  const handleBlur = () => {
    setFocused("false");
  };

  return (
    <div id="login-modal-container">
      <h1 id="lm-header">Log In</h1>
      <form id="login-form-modal" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className={`lm-cred-field floating-input ${focused == "cred" ? 'focused' : ''}`}>
          <label className={`lcf-label input-label ${focused == "cred" || cred ? 'label-focus' : ''}`}>
            Credential
          </label>
          <input
            type="text"
            value={cred}
            onChange={(e) => setCred(e.target.value)}
            onFocus={e => handleFocus("cred", e)}
            onBlur={handleBlur}
            className="lcf-input input-field"
            required
          />
        </div>
        <div className={`lm-email-field floating-input ${focused == "password" ? 'focused' : ''}`}>
          <label className={`lef-label input-label ${focused == "password" || password ? 'label-focus' : ''}`}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={e => handleFocus("password", e)}
            onBlur={handleBlur}
            className="lpf-input input-field"
            required
          />
        </div>
        <button className="account-button" type="submit">Log In</button>
        <button className="account-button" onClick={loginDemo}>Demo User</button>
        <div>... or
          <OpenModalButton
            modalClasses={["logInRedirect"]}
            modalComponent={<SignupFormModal />}
            buttonText="Sign Up Here"
          />
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
