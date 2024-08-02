import { useEffect, useState } from "react"
import { setRequestedProject } from "../../store/userProjects";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createStory } from "../../store/project";
import OpenModalButton from "../OpenModalButton";
import SkipStep from "../utilities/SkipStep";

const StoryForm = () => {
  const history = useHistory();
  const location = useLocation()
  const dispatch = useDispatch();
  const [selectedAI, setSelectedAI] = useState("");
  const [isLoaded, setIsLoaded] = useState(false)
  const [focused, setFocused] = useState("");
  const [project, setProject] = useState("");
  const { projectId } = useParams();
  const [disabled, setDisabled] = useState(true);
  const [ai, setAi] = useState("");
  const [storyText, setStoryText] = useState("")
  const [risksChallenges, setRisksChallenges] = useState("")

  const skipStep = () => {
    return history.replace(`/projects/${projectId}/add_reward`)
  }



  const handleStorySubmit = async (e) => {
    e.preventDefault()
    const newStory = new FormData()
    newStory.append("ai", ai)
    newStory.append("storyText", storyText)
    newStory.append("risksChallenges", risksChallenges)
    const res = await dispatch(createStory(newStory, projectId))
    if (res == "ok") {
      return history.replace(`/projects/${projectId}/add_reward`)
    }
  }

  const handleAIChange = (e) => {
    setAi(e.target.value)
    setSelectedAI(e.target.value);
  };

  const handleFocus = (field, e) => {
    e.preventDefault()
    setFocused(field);
  };

  const handleBlur = () => {
    setFocused("false");
  };

  useEffect(() => {
    if (ai != "" &&
      storyText && storyText.length > 3 &&
      risksChallenges && risksChallenges.length > 3
    ) {
      setDisabled(false)
    }
  }, [ai, storyText, risksChallenges])

  useEffect(() => {
    const loadProject = async () => {
      const gotProject = await dispatch(setRequestedProject(projectId))
      if (gotProject.story) return history.push(`/projects/${projectId}`)
      setProject(gotProject)
    }
    loadProject()
    setIsLoaded(true)
  }, [dispatch]);
  return (
    <div id="story-form-container" style={{"height": (location.pathname.endsWith("/add_story") ? "645px" : "fit-content")}}>
      <form onSubmit={handleStorySubmit} encType="multipart/form-data">
        <h1 id="story-form-title">Add a Story</h1>
        <div id="ai-input-field">
          <p>Are you using AI?*</p>
          <div id="ai-options">
          <label className="ai-option">
            <input
              type="radio"
              value="true"
              checked={selectedAI === "true"}
              onChange={handleAIChange}
            />
            Yes, I am using AI for my project
          </label>
          <label className="ai-option">
            <input
              type="radio"
              value="false"
              checked={selectedAI === "false"}
              onChange={handleAIChange}
            />
            No, I am not using AI for my project
          </label>
          </div>
          <p>Give us your sob story (People LOVE a sob story!)*</p>
          <div className={`story-text-field floating-input ${focused == "story" ? 'focused' : ''}`}>
            <label className={`stf-label input-label ${focused == "story" || storyText ? 'label-focus' : ''}`}>
              Story Text
            </label>
            <textarea
              value={storyText}
              maxLength={2000}
              onChange={(e) => setStoryText(e.target.value)}
              onFocus={e => handleFocus("story", e)}
              onBlur={handleBlur}
              className="stf-input input-field"
            />
            <span id="length-counter"><span style={storyText.length > 2 ? { "color": "green" } : { "color": "red" }}>{storyText.length}</span>/2000</span>
          </div>
          <p>Explain the potential risks (You can... mislead a little)*</p>
          <div className={`story-risk-field floating-input ${focused == "risk" ? 'focused' : ''}`}>
            <label className={`srf-label input-label ${focused == "risk" || risksChallenges ? 'label-focus' : ''}`}>
              Risks and Challenges
            </label>
            <textarea
              value={risksChallenges}
              maxLength={2000}
              onChange={(e) => setRisksChallenges(e.target.value)}
              onFocus={e => handleFocus("risk", e)}
              onBlur={handleBlur}
              className="srf-input input-field"
            />
            <span id="length-counter"><span style={risksChallenges.length > 2 ? { "color": "green" } : { "color": "red" }}>{risksChallenges.length}</span>/2000</span>
          </div>
        </div>
        <div id="save-story-btn">
        <button  disabled={disabled}>Save Story</button>
        </div>
      </form>
      <div id="skip-button">
      <OpenModalButton
          modalComponent={<SkipStep skipStep={skipStep}/>}
          buttonText={"Skip Step"}
          modalClasses={["skip-step-button"]}
          />
    </div>
    </div>
  )
}

export default StoryForm
