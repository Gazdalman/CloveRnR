import React, { useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { getResults } from "../../store/search";

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const sessionUser = useSelector(state => state.session.user);
	const [searchText, setSearchText] = useState("")

	const search = async (e) => {
		e.preventDefault();
		const paginate = `keyword=${searchText}`

		const res = await dispatch(getResults(paginate))

		// if (res.ok) {
		localStorage.setItem("search", searchText)
		setSearchText("")
		return history.push("/search")
		// }
	}

		return (
			<nav>
				<ul id="nav-bar">
					<li id="home">
						<NavLink className="eh" exact to="/home">
							<img id="home-logo" src="https://fmjbucket.s3.us-east-2.amazonaws.com/79dd0d67ffc34097b913489257727a00.gif" />
							{/* <img id="home-logo-text" src="https://fmjbucket.s3.us-east-2.amazonaws.com/d90590a565054290b8236174db116a13.gif"/>
						 */}
							<span id="home-logo-text">FundMyJunk</span>
						</NavLink>
					</li>
					{location.pathname != "/search" && <li id="search-bar">
						<input
							id="search-input"
							type="text"
							placeholder="Search"
							value={searchText}
							onChange={e => setSearchText(e.target.value)}
							onKeyPress={e => {
								if (e.key === "Enter") {
									search(e)
								}
							}}
						/>
						<button onClick={search} id="search-button" type="submit">
							<i className="fas fa-search"></i>
						</button>
					</li>}
					{isLoaded && (
						<li id="profile-button">
							<ProfileButton user={sessionUser} />
						</li>
					)}
				</ul>
			</nav>

		);
	}

	export default Navigation;
