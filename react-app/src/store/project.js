const GET_PROJECTS = "projects/getAll"
const CREATE_PROJECT = "projects/createProject"
const EDIT_PROJECT = "projects/editProject"

const populateProjects = (projects) => {
  return {
    type: GET_PROJECTS,
    projects
  }
}

export const getAllProjects = () => async dispatch => {
  const res = await fetch("/api/projects")

  const projects = await res.json()
  if (res.ok) {
    dispatch(populateProjects(projects))
    return projects
  }
}

export const createProject = (data) => async dispatch => {
  const res = await fetch("/api/projects/new", {
    method: "POST",
    body: data
  })

  const resJson = await res.json()
  if (res.ok) {
    return resJson
  }

  // console.log("res errors", resJson);
}

export const createStory = (story, projectId) => async dispatch => {
  const res = await fetch(`/api/projects/${projectId}/story`, {
    method: "POST",
    body: story
  })

  if (res.ok) {
    return "ok"
  }

  const err = await res.json()
  return err
}

export const createReward = (reward, items, projectId) => async dispatch => {
  const res = await fetch(`/api/projects/${projectId}/rewards/new`, {
    method: "POST",
    body: reward
  })
  let broken
  const err = await res.json()
  if (res.ok) {

    items.forEach(async (item) => {
      const itemRes = await fetch(`/api/rewards/${err.id}/items/new`, {
        method: "POST",
        body: item
      })

      const newItem = await itemRes.json()
      if (itemRes.ok) {
        broken = false
        return broken
      }

      return newItem
    })
  }

  return err
}

export const editProject = (project, id) => async dispatch => {
  const res = await fetch(`/api/projects/${id}/edit`, {
    method: "PUT",
    body: project
  })

  const editedProject = await res.json()

  if (res.ok) {
    return editedProject
  }

  return editedProject
}

export const createItem = (newItem, rewardId) => async dispatch => {
  const res = await fetch(`/api/rewards/${rewardId}/items/new`, {
    method: "POST",
    body: newItem
  })

  const item = await res.json();

  if (res.ok) {
    return "okay"
  }

  return item;
}

export const editStory = (story, storyId) => async dispatch => {
  const res = await fetch(`/api/stories/${storyId}/edit`, {
    method: "PUT",
    body: story
  })

  if (res.ok) {
    return "okay"
  }
  const err = await res.json()
  return err
}

export const editReward = (reward, rewardId) => async dispatch => {
  const res = await fetch(`/api/rewards/${rewardId}/edit`, {
    method: "PUT",
    body: reward
  })

  const err = await res.json()
  if (res.ok) {
    return "ok"
  }

  return err
}

export const editItem = (item, itemId) => async dispatch => {
  const res = await fetch(`/api/reward_items/${itemId}/edit`, {
    method: "PUT",
    body: item
  })

  const err = await res.json()
  if (res.ok) {
    return "ok"
  }

  return err
}

export const likeProject = (projectId) => async dispatch => {
  const res = await fetch(`/api/projects/${projectId}/like`, {
    method: "POST"
  })

  const err = await res.json()
  if (res.ok) {
    return "ok"
  }

  return err
}

export const deleteItem = (itemId) => async dispatch => {
  const res = await fetch(`/api/reward_items/${itemId}/delete`, {
    method: "DELETE"
  })

  const err = await res.json()

  if (res.ok) return "ok"

  return err
}

export const deleteReward = (rewardId) => async dispatch => {
  const res = await fetch(`/api/rewards/${rewardId}/delete`, {
    method: "DELETE"
  })

  const err = await res.json()
  if (res.ok) {
    return "ok"
  }
}

const projects = (state = {}, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return [ ...action.projects ]

    default:
      return state;
  }
}

export default projects
