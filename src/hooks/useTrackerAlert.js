import { useReducer, useEffect } from 'react'

const reducerAlert = (state, action) => {
	switch (action.type) {
		case 'error':
			return { error: action.payload, succes: null }
		case 'succes':
			return { error: null, succes: action.payload }
		default:
			throw new Error(`Action non supportée par le reducerAlert`)
	}
}
const useTrackerAlert = () => {
	const [state, dispatch] = useReducer(reducerAlert, {
		error: null,
		succes: null,
	})

	const { error, succes } = state

	const setSucces = (text) => {
		dispatch({ type: 'succes', payload: text })
	}
	const setError = (text) => {
		dispatch({ type: 'error', payload: text })
	}

	useEffect(() => {
		if (
			(error !== null && succes === null) ||
			(succes !== null && error === null)
		) {
			const disappear = () => {
				succes ? setSucces(null) : setError(null)
			}
			const timeout = setTimeout(() => disappear(), 2000)
			return () => clearTimeout(timeout)
		}
	}, [succes, error])

	return { error, succes, setSucces, setError }
}
export { useTrackerAlert }
