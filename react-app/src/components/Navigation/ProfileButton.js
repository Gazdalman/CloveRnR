import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory, useLocation } from "react-router-dom"
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const redirect = (e) => {
    e.preventDefault()
    setShowMenu(false);
    return history.push("/profile")
  }

  const createRedirect = (e) => {
    e.preventDefault();
    setShowMenu(false);
    return history.push("/new_project")
  }

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? (user ? " user-menu" : " non-user-menu") + " visible" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button id="p-menu-button" onClick={openMenu}>
        <img id="profile-pic" src="https://fmjbucket.s3.us-east-2.amazonaws.com/79dd0d67ffc34097b913489257727a00.gif"/>
        {/* <i className="fas fa-user-circle" /> */}
      </button>
      <ul id="p-menu" className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello<br/>{user.username.length <= 10 ? user.username : user.username.slice(0, 10) + "..."}</li>
            {/* <li>{user.email}</li> */}
            {location.pathname != "/profile" && <li>
              <button className="user-btn" onClick={redirect}>Your Account</button>
            </li>}
            {location.pathname != "/new_project" && <li>
              <button className="user-btn" onClick={createRedirect}>Start a Project</button>
              </li>}
            <li>
              <button className="user-btn" onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalClasses={["p-menu-form-btn"]}
              modalComponent={<LoginFormModal />}
              onButtonClick={() => setShowMenu(false)}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalClasses={["p-menu-form-btn"]}
              modalComponent={<SignupFormModal />}
              onButtonClick={() => setShowMenu(false)}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
