import { useReducer } from 'react'

const reducerCategory = (state, action) => {
	switch (action.type) {
		case 'edit':
			return {
				status: 'edition',
				category: action.payload,
				activeButtons: { btnSave: true, btnUp: false, btnDel: false },
				activeInput: true,
				activeSelect: true,
				error: null,
			}
		case 'update':
			return {
				...state,
				status: 'updated',
				activeButtons: { btnSave: false, btnUp: true, btnDel: true },
				activeInput: true,
				activeSelect: true,
				error: null,
			}
		case 'delete':
			return {
				status: 'deleted',
				category: action.payload,
				activeButtons: { btnSave: false, btnUp: false, btnDel: false },
				activeInput: false,
				activeSelect: true,
				error: null,
			}
		case 'categoryChange':
			return {
				...state,
				category: action.payload,
				activeInput: true,
				activeButtons: { btnSave: false, btnUp: true, btnDel: true },
			}
		case 'new':
			return {
				state: 'new',
				category: action.payload,
				activeButtons: { btnSave: true, btnUp: false, btnDel: false },
				activeInput: true,
				activeSelect: true,
			}
		default:
			throw new Error('Action non supporté par reducerCategory')
	}
}

const useEditCategory = () => {
	const [state, dispatch] = useReducer(reducerCategory, {
		category: null,
		error: null,
		status: 'idle',
		activeInput: false,
		activeSelect: true,
		activeButtons: { btnSave: false, btnUp: false, btnDel: false },
	})
	const { category, error, status, activeInput, activeSelect, activeButtons } =
		state

	const setCategory = (category) => {
		dispatch({ type: 'categoryChange', payload: category })
	}
	const editCategory = (category) => {
		dispatch({ type: 'edit', payload: category })
	}
	const updateCategory = () => {
		dispatch({ type: 'update' })
	}
	const deleteCategory = (category) => {
		dispatch({ type: 'delete', payload: category })
	}
	const newCategory = (category) => {
		dispatch({ type: 'new', payload: category })
	}

	return {
		category,
		error,
		status,
		activeInput,
		activeSelect,
		activeButtons,
		setCategory,
		editCategory,
		updateCategory,
		deleteCategory,
		newCategory,
	}
}
export { useEditCategory }
