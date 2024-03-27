import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage/HomePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProfilePage from "./components/ProfilePage/CurrUserProfilePage/ProfilePage";
import ProjectForm from "./components/ProjectForm";
import UserProfilePage from "./components/ProfilePage/UserProfilePage";
import EditProject from "./components/EditProject/EditProject";
import StoryForm from "./components/ProjectForm/StoryForm";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import RewardInfo from "./components/ProjectForm/Rewards/RewardsInfo";
import UnauthorizedPage from "./components/utilities/Unauthorized";
import EditStoryForm from "./components/ProjectPage/PPForms/EditStory";
import NotFound from "./components/utilities/NotFound";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import PPRewardTab from "./components/ProjectPage/PPForms/PPReward";
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
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <HomePage />
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
          <ProtectedRoute path="/new_project">
            <ProjectForm />
          </ProtectedRoute>
          <Route exact path="/projects/:projectId">
            <ProjectPage />
          </Route>
          <ProtectedRoute path="/projects/:projectId/edit">
            <EditProject />
          </ProtectedRoute>
          <ProtectedRoute path="/projects/:projectId/add_story">
            <StoryForm />
          </ProtectedRoute>
          <ProtectedRoute path="/projects/:projectId/add_reward">
            <RewardInfo />
          </ProtectedRoute>
          <ProtectedRoute path="/projects/:projectId/edit_story">
            <EditStoryForm />
          </ProtectedRoute>
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
