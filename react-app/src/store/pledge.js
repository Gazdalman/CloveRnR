const PLEDGE_PROJECT = "pledges/createPledge"
const EDIT_PLEDGE = "pledges/editPledge"

export const createPledge = (pledge, projectId) => async dispatch => {
  const res = await fetch(`/api/projects/${projectId}/pledge`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({...pledge})
  })

  const resJson = await res.json()
  if (res.ok) {
    return resJson
  }

  // console.log("res errors", resJson);
}

export const editPledge = (pledge, pledgeId) => async dispatch => {
  const res = await fetch(`/api/pledges/${pledgeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({...pledge})
  })

  const resJson = await res.json()
  if (res.ok) {
    return resJson
  }

  // console.log("res errors", resJson);
}

export const deletePledge = (pledgeId) => async dispatch => {
  const res = await fetch(`/api/pledges/${pledgeId}/delete`, {
    method: "DELETE",
  })

  const resJson = await res.json()
  if (res.ok) {
    return "ok"
  }

  // console.log("res errors", resJson);
}
