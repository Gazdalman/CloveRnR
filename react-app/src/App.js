import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
// import HomePage from "./components/HomePage/HomePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProfilePage from "./components/ProfilePage/CurrUserProfilePage/ProfilePage";
import UserProfilePage from "./components/ProfilePage/UserProfilePage";
import UnauthorizedPage from "./components/utilities/Unauthorized";
import NotFound from "./components/utilities/NotFound";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import Footer from "./components/Footer/Footer";
import SearchPage from "./components/Search/SearchPage";
import LandingPage from "./components/LandingPage/LandingPage";
import { getAllProjects } from "./store/project";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAllProjects())
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div id="main-content">
      {isLoaded && (
        <>
        <Switch>
          <Route exact path="/">
            <Redirect to="/welcome" />
          </Route>
          <Route exact path="/welcome">
          </Route>

          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/users/:id">
            <UserProfilePage />
          </Route>

          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/unauthorized">
            <UnauthorizedPage />
          </Route>
          <Route path="/not_found">
            <NotFound />
          </Route>
          <Route>
            <Redirect to="/not_found"/>
          </Route>
        </Switch>
      <Footer />
      </>
      )}</div>
    </>
  );
}

export default App;
