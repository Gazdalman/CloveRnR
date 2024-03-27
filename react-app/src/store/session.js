// constants
const SET_USER = "session/SET_USER";
const GET_USER = "session/GET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const getUser = (user) => {
	return {
		type: GET_USER,
		user
	}
}

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const refreshUser = (userId) => async dispatch => {
	const res = await fetch(`/api/users/${userId}`)

	const user = await res.json()

	if (res.ok) {
		dispatch(setUser(user))
		return user
	}

	return user
}

export const getSingleUser = (userId) => async dispatch => {
	const res = await fetch(`/api/users/${userId}`)

	const user = await res.json()

	if (res.ok) {
		dispatch(getUser(user))
		return user
	}

	return user
}

export const login = (cred, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			cred,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else {
		const data = await response.json();
		return data.errors;
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, firstName, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			firstName
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case GET_USER:
			return {...state, requestedUser: action.user}
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
