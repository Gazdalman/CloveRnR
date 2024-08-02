import { useEffect, useState } from "react"
import Basics from "./Basics/Basics";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import { useDispatch } from "react-redux";
import { createProject, editProject } from "../../store/project";
import { useHistory } from "react-router-dom";
import { categories } from "../../data/categories";
import "./ProjectForm.css"

const ProjectForm = ({ type, project }) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const id = type == "edit" ? project.id : null
  const [flip, setFlip] = useState("on")
  const [disabled, setDisabled] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState("basics");
  const [errs, setErrs] = useState({})
  const [title, setTitle] = useState(type == "edit" ? project.title : "");
  const [subtitle, setSubtitle] = useState(type == "edit" ? project.subtitle : "");
  const [location, setLocation] = useState(type == "edit" ? project.location : "");
  const [projType, setProjType] = useState(type == "edit" ? project.type : "");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [imageURL, setImageURL] = useState(type == "edit" ? project.image : "");
  const [videoURL, setVideoURL] = useState(type == "edit" ? project.video : "");
  const [goal, setGoal] = useState(type == "edit" ? project.goal : "");
  const [launchDate, setLaunchDate] = useState(type == "edit" ? project.launchDate : "");
  const [endDate, setEndDate] = useState(type == "edit" ? project.endDate : "");
  const [mainCategory, setMainCategory] = useState(type == "edit" ? project.mainCategory : "");
  const [mainSubcat, setMainSubcat] = useState(type == "edit" ? project.mainSub : "");
  const [secondCat, setSecondCat] = useState(type == "edit" ? project.secondCat : "");
  const [secondSubcat, setSecondSubcat] = useState(type == "edit" ? project.secondSub : "");
  const [launched, setLaunched] = useState(false);

  // console.log(categories);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = {}

    if (!title || title.length < 3) errors.title = "Title must be at least 3 characters long"
    if (!subtitle || subtitle.length < 10) errors.subtitle = "Subtitle must be at least 10 characters"
    if (!goal || goal < 100 || goal > 100000000) errors.goal = "NO LESS THAN $100! But also no more than $99,999,999 (We ain't that greedy)"
    if (!image && !imageURL) errors.image = "Gotta have an image"
    if (!projType) errors.projType = "Couldn't even choose a type huh? No wonder you couldn't make it on Kickstarter..."
    if (!launchDate || !endDate) errors.date = "Do you just uhhhh... not wanna make us... I mean you... money?"
    if (Object.values(errors).length){
      setErrs(errors)
      return
    }
    const projectData = new FormData()

    projectData.append("title", title)
    projectData.append("subtitle", subtitle)
    projectData.append("location", location)
    projectData.append("type", projType)
    if (type == 'edit') {
      if (image) {
        projectData.append("image", image)
      }

      if (video) {
        projectData.append("video", video)
      }
    } else {
      projectData.append("image", image)
      if (video) {
        projectData.append("video", video)
      }
    }

    projectData.append("goal", goal)
    const launch = new Date(launchDate)
    projectData.append("launchDate", (launch.toISOString().split("T")[0]))
    const end = new Date(endDate)
    projectData.append("endDate", end.toISOString().split("T")[0])
    projectData.append("mainCategory", mainCategory)
    projectData.append("mainSubcat", mainSubcat)
    projectData.append("secondCat", secondCat)
    projectData.append("secondSubcat", secondSubcat)

    setUploading(true)
    if (type != "edit") {
      const res = await dispatch(createProject(projectData))
      setUploading(false)
      if (!res.errors) return history.push(`/projects/${res.id}/add_story`)
    } else {
      const res = await dispatch(editProject(projectData, id))
      setUploading(false)
      if (!res.errors) return history.push(`/projects/${res.id}`)
    }
  }

  // useEffect(() => {
  //   if (
  //     subtitle.length >= 10
  //     && projType
  //     // && (type != "edit" && image)
  //     && goal >= 1
  //     && mainCategory
  //     && mainSubcat
  //     && (title.length >= 3)
  //     && launchDate
  //     && endDate
  //     && location
  //   ) {
  //     setDisabled(false)
  //   } else {
  //     setDisabled(true)
  //   }
  //   // setFlip(flip == "on" ? "off" : "on")
  // }, [mainCategory, subtitle, title, mainSubcat, launchDate, goal, projType, image, location])

  useEffect(() => {
    if (type == "edit") {
      const today = new Date().toISOString().split("T")[0];
      if (new Date().getTime() - new Date(project.launchDate).getTime() > 0) setLaunched(true)
    }
  }, [])

  return !uploading ? (
    <div id="project-form-container">
      {/* <div id="form-tabs">
        <span onClick={() => setTab("project-info")} id="project-info-tab">Project Details</span>
        <span onClick={() => setTab("basics")} id="basics-tab">Basics</span>
      </div> */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {tab == "basics" && <Basics
          categories={categories}
          mainCategory={mainCategory}
          mainSubcat={mainSubcat}
          setMainCategory={setMainCategory}
          setMainSubcat={setMainSubcat}
          secondCat={secondCat}
          setSecondCat={setSecondCat}
          secondSubcat={secondSubcat}
          setSecondSubcat={setSecondSubcat}
          location={location}
          setLocation={setLocation}
          setTab={setTab}
        />}
        {tab == "project-info" && <ProjectInfo
          endDate={endDate}
          launchDate={launchDate}
          image={image}
          video={video}
          imageURL={imageURL}
          videoURL={videoURL}
          projType={projType}
          goal={goal}
          title={title}
          subtitle={subtitle}
          setTitle={setTitle}
          setSubtitle={setSubtitle}
          setGoal={setGoal}
          setProjType={setProjType}
          setVideo={setVideo}
          setVideoURL={setVideoURL}
          setImage={setImage}
          setImageURL={setImageURL}
          setLaunchDate={setLaunchDate}
          setEndDate={setEndDate}
          type={type}
          setTab={setTab}
          errs={errs}
          launched={launched}
        />}
        <div id="cpb-container">
          {tab=="project-info" && <button id="create-project-btn" disabled={disabled}> Confirm Project</button>}
        </div>
      </form>
      <div></div>
    </div>

  ) : (
    <div id="project-form-container">
      <h1 className="loading-message">We Loadin...</h1>
    </div>
  )
}

export default ProjectForm
