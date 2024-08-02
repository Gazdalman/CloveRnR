import { useEffect, useState } from "react"
import { setRequestedProject } from "../../../store/userProjects";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createStory } from "../../../store/project";
import { useModal } from "../../../context/Modal";

const PPStoryForm = ({ projectId }) => {
  const { closeModal } = useModal()
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedAI, setSelectedAI] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)
  const [focused, setFocused] = useState("");
  const [project, setProject] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [ai, setAi] = useState(false);
  const [storyText, setStoryText] = useState("")
  const [risksChallenges, setRisksChallenges] = useState("")

  const cancel = (e) => {
    e.preventDefault()
    closeModal()
  }

  const handleStorySubmit = async (e) => {
    e.preventDefault()
    const newStory = new FormData()
    newStory.append("ai", ai)
    newStory.append("storyText", storyText)
    newStory.append("risksChallenges", risksChallenges)
    const res = await dispatch(createStory(newStory, projectId))
    if (res == "ok") {
      closeModal()
      dispatch(setRequestedProject(projectId))
    }
  }

  const handleAIChange = (e) => {
    setAi(e.target.value)
    setSelectedAI(`${e.target.value}`);
  };

  const handleFocus = (field, e) => {
    e.preventDefault()
    setFocused(field);
  };

  const handleBlur = () => {
    setFocused("false");
  };

  useEffect(() => {
    if ((ai == "false" || ai == "true") &&
      storyText &&
      risksChallenges
    ) {
      setDisabled(false)
    }
  }, [ai, storyText, risksChallenges])

  // useEffect(() => {
  //   const loadProject = async () => {
  //     const gotProject = await dispatch(setRequestedProject(projectId))
  //     if (gotProject.story) return history.push(`/projects/${projectId}`)
  //     setProject(gotProject)
  //   }
  //   loadProject()
  //   setIsLoaded(true)
  // }, [dispatch]);
  return (
    <div id="story-modal-container">
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
          <button disabled={disabled}>Save Story</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default PPStoryForm
