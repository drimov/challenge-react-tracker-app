import { useReducer } from 'react'

const reducer = (state, action) => {
	switch (action.type) {
		case 'new':
			return {
				status: 'new',
				tracker: action.payload,
				activeButtons: { btnSave: true, btnUp: false, btnDel: false },
				activeInput: true,
				error: null,
			}
		case 'edit':
			return {
				status: 'edition',
				tracker: action.payload,
				activeButtons: { btnSave: false, btnUp: true, btnDel: true },
				activeInput: true,
				error: null,
			}
		case 'save':
			return {
				...state,
				status: 'saved',
				activeButtons: { btnSave: false, btnUp: false, btnDel: false },
				activeInput: false,
				error: null,
			}
		case 'update':
			return {
				...state,
				status: 'updated',
				activeButtons: { btnSave: false, btnUp: true, btnDel: true },
				activeInput: true,
				error: null,
			}
		case 'delete':
			return {
				...state,
				status: 'deleted',
				tracker: action.payload,
				activeButtons: { btnSave: false, btnUp: false, btnDel: false },
				activeInput: false,
				error: null,
			}
		case 'fail':
			return {
				status: 'fail',
				tracker: null,
				activeButtons: { btnSave: true, btnUp: true, btnDel: true },
				activeInput: false,
				error: action.error,
			}
		case 'trackerChange':
			return {
				...state,
				tracker: action.payload,
				error: null,
			}
		default:
			throw new Error('Action non supporté')
	}
}
const useEditTracker = (defaultTracker) => {
	const [state, dispatch] = useReducer(reducer, {
		tracker: defaultTracker,
		error: null,
		status: 'idle',
		activeInput: false,
		activeButtons: { btnSave: false, btnUp: false, btnDel: false },
	})
	const { tracker, error, status, activeButtons, activeInput } = state

	const setTracker = (tracker) => {
		dispatch({
			type: 'trackerChange',
			payload: tracker,
		})
	}
	const editTracker = (tracker) => {
		dispatch({
			type: 'edit',
			payload: tracker,
		})
	}
	const saveTracker = () => {
		dispatch({ type: 'save' })
	}
	const updateTracker = () => {
		dispatch({ type: 'update' })
	}
	const deleteTracker = (tracker) => {
		dispatch({ type: 'delete', payload: tracker })
	}
	const newTracker = (tracker) => {
		dispatch({
			type: 'new',
			payload: tracker,
		})
	}

	return {
		tracker,
		error,
		status,
		activeButtons,
		activeInput,
		setTracker,
		editTracker,
		saveTracker,
		updateTracker,
		deleteTracker,
		newTracker,
	}
}
export default useEditTracker
