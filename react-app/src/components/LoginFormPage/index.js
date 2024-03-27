import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';
import OpenModalButton from "../OpenModalButton";

function LoginFormPage() {
  const history = useHistory()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [cred, setCred] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [focused, setFocused] = useState("");

  if (sessionUser) return <Redirect to="/" />;

  const handleFocus = (field, e) => {
    e.preventDefault()
    setFocused(field);
  };

  const redirect = (e) => {
    e.preventDefault()
    history.replace('/signup')
  }

    const handleBlur = () => {
      setFocused("false");
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = await dispatch(login(cred, password));
      if (data) {
        setErrors(data);
      } else {
        return history.goBack()
      }
    };

    const loginDemo = (e) => {
      e.preventDefault()
      dispatch(login('demoNoodle', 'password'))
      return history.goBack()
    }

    return (
      <div id="login-page">
        <h1 id="login-page-h1">Log In</h1>
        <form id="login-page-form" onSubmit={handleSubmit}>
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
          <div className={`lm-password-field floating-input ${focused == "password" ? 'focused' : ''}`}>
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
          <div id="login-page-buttons">
            <button className="account-button" type="submit">Log In</button>
            <button className="account-button" onClick={loginDemo}>Demo User</button>
          </div>
          <div id="signup-switch">
            <span>...or </span>
            <a onClick={redirect} href="/signup">Sign Up</a>
          </div>
        </form>
      </div>
    );
  }


export default LoginFormPage;
