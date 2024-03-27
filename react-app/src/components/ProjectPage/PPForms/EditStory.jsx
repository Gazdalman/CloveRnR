import { useEffect, useState } from "react"
import { setRequestedProject } from "../../../store/userProjects";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createStory, editStory } from "../../../store/project";
import { useModal } from "../../../context/Modal";

const EditStoryForm = ({ story, projectId }) => {
  const history = useHistory();
  const {closeModal} = useModal()
  const dispatch = useDispatch();
  const [selectedAI, setSelectedAI] = useState(story.ai == true ? "true" : "false");
  const [isLoaded, setIsLoaded] = useState(false)
  const [focused, setFocused] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [ai, setAi] = useState(story.ai);
  const [storyText, setStoryText] = useState(story.text)
  const [risksChallenges, setRisksChallenges] = useState(story.risks_challenges)

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
    const res = await dispatch(editStory(newStory, story.id))
    if (res == "okay") {
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
    if (
      storyText.length > 1 &&
      risksChallenges.length > 1
    ) {
      setDisabled(false)
    }
  }, [ai, storyText, risksChallenges])

  return story ? (
    <div id="story-edit-form-container">
      <form onSubmit={handleStorySubmit} encType="multipart/form-data">
        <h2>Edit a Story</h2>
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
  ) : (
    <div>
      <h2>No Story Found!</h2>
      <h2>Add a story on your project's page!</h2>
    </div>
  )
}

export default EditStoryForm
