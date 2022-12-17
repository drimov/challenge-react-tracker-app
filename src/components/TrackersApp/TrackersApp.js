/* eslint-disable no-unused-vars */
import { useMemo, useState, useEffect } from 'react'
import { FilterTrackers } from '../FilterTrackers/FilterTrackers'
import { TrackersTable } from '../TrackersTable/TrackersTable'
import { TrackerEditForm } from '../TrackerEditForm/TrackerEditForm'
import { TrackersStats } from '../TrackersStats/TrackersStats'
import { TrackerTableBar } from '../TrackerTableBar/TrackerTableBar'
import { TrackerEditCategory } from '../TrackerEditCategory/TrackerEditCategory'
import { TrackerAlert } from '../TrackerAlert/TrackerAlert'
import { useStorageTrackers } from '../../hooks/useStorageTrackers'
import { useTrackerAlert } from '../../hooks/useTrackerAlert'
import { useStorageCategories } from '../../hooks/useStorageCategories'
import {
	formError,
	isCategoryPresent,
	search,
	trackersComplete,
	trackersInProgess,
	updateTabs,
} from '../../helper'
import {
	MSG_CATEGORY,
	MSG_CATEGORY_ERROR,
	MSG_TRACKER,
	SORT_TRACKER,
} from '../../contants'
import './TrackersApp.css'

function TrackersApp() {
	const [selectedTracker, setSelectedTracker] = useState()
	const [filterText, setFilterText] = useState('')
	const [searchBy, setSearchBy] = useState(SORT_TRACKER.SEARCH)
	const [isEditTracker, setIsEditTracker] = useState(false)
	const [isEditCategory, setIsEditCategory] = useState(false)
	const { store, setStore } = useStorageTrackers()
	const { succes, error, setSucces, setError } = useTrackerAlert()
	const { categories, setCategories } = useStorageCategories()

	const filteredTracker = useMemo(() => {
		switch (searchBy) {
			case SORT_TRACKER.SEARCH:
				return search(store, filterText)
			case SORT_TRACKER.IN_PROGRESS:
				return trackersInProgess(store)
			case SORT_TRACKER.COMPLETED:
				return trackersComplete(store)
			case SORT_TRACKER.ALL:
				return store
			default:
				throw new Error('action non supporté')
		}
	}, [filterText, searchBy, store])

	// SEARCH
	const handleTextChange = (text) => {
		if (searchBy !== SORT_TRACKER.SEARCH) setSearchBy(SORT_TRACKER.SEARCH)
		setFilterText(text)
	}

	// ALERTS
	const isTypeAlert = (err, msg) => {
		if (err.length > 0) {
			setError(err)
			return false
		} else {
			setSucces(msg)
			return true
		}
	}
	// MANAGER TRACKERS
	const handleAddTracker = (tracker) => {
		const err = formError(tracker)
		if (isTypeAlert(err, MSG_TRACKER.ADD)) setStore([...store, tracker])
	}
	const handleDeleteTracker = (tracker) => {
		const err = formError(tracker, false)
		if (isTypeAlert(err, MSG_TRACKER.DEL)) {
			setStore(store.filter((item) => item.id !== tracker.id))
		}
	}
	const handleUpdateTracker = (tracker) => {
		const err = formError(tracker)
		if (isTypeAlert(err, MSG_TRACKER.MAJ)) {
			let updatedList = store.map((item) =>
				item.id === tracker.id ? tracker : item
			)
			setStore(updatedList)
		}
	}
	// MANAGER CATEGORY
	/**
	 *
	 * @param {*} categories Tableau contenant les categories
	 * @param {*} msg Message success
	 * @param {*} option Si ajout dans un tableau
	 * @param {*} category Si ajout au tableau
	 */
	const updateCategory = (categories, msg, option = false, category = null) => {
		option
			? setCategories([...categories, category])
			: setCategories(categories)
		setSucces(msg)
	}
	const handleAddCategory = (category) => {
		if (category !== '') {
			isCategoryPresent(categories, category)
				? updateCategory(categories, MSG_CATEGORY.ADD, true, category)
				: setError([MSG_CATEGORY_ERROR.EXIST])
		} else {
			setError([MSG_CATEGORY_ERROR.EMPTY])
		}
	}
	const handleDeleteCategory = (category) => {
		if (isCategoryPresent(store, category)) {
			const newCategories = categories.filter((item) => item !== category)
			updateCategory(newCategories, MSG_CATEGORY.DEL)
		} else {
			setError([MSG_CATEGORY_ERROR.USED])
		}
	}
	const handleUpdateCategory = (prevCategory, newCategory) => {
		if (isCategoryPresent(categories, newCategory)) {
			const newTrackers = updateTabs(store, prevCategory, newCategory)
			const newCategories = updateTabs(categories, prevCategory, newCategory)
			updateCategory(newCategories, MSG_CATEGORY.MAJ)
			setStore(newTrackers)
		} else {
			setError([MSG_CATEGORY_ERROR.EXIST])
		}
	}
	// TRACKER BAR
	const handleTrackerFinish = () => {
		setSearchBy(SORT_TRACKER.COMPLETED)
	}
	const handleTrackerOnProgress = () => {
		setSearchBy(SORT_TRACKER.IN_PROGRESS)
	}
	const handleAllTracker = () => {
		setSearchBy(SORT_TRACKER.ALL)
	}
	const handleEditTracker = () => {
		setIsEditTracker(!isEditTracker)
	}
	const handleEditCategory = () => {
		setIsEditCategory(!isEditCategory)
	}

	const handleSelectedTracker = (tracker) => {
		setIsEditTracker(true)
		setSelectedTracker(tracker)
	}

	return (
		<div className='TrackersApp'>
			<FilterTrackers onTextChange={handleTextChange} />
			<TrackersStats allTrackers={store} />

			{isEditCategory ? (
				<TrackerEditCategory
					onAddCategory={handleAddCategory}
					onDeleteCategory={handleDeleteCategory}
					onUpdateCategory={handleUpdateCategory}
					listCategories={categories}
				/>
			) : null}
			{isEditTracker ? (
				<TrackerEditForm
					selectedTracker={selectedTracker}
					onAddTracker={handleAddTracker}
					onUpdateTracker={handleUpdateTracker}
					onDeleteTracker={handleDeleteTracker}
					listCategories={categories}
				/>
			) : null}
			<TrackerAlert
				error={error}
				succes={succes}
			/>
			<div className='TrackersTable'>
				<TrackerTableBar
					onTrackerProgress={handleTrackerOnProgress}
					onTrackerFinish={handleTrackerFinish}
					onAllTracker={handleAllTracker}
					onEditTrackerOpen={handleEditTracker}
					onEditCategoryOpen={handleEditCategory}
				/>
				<TrackersTable
					trackers={filteredTracker}
					selectedTracker={selectedTracker}
					onSelectedTracker={handleSelectedTracker}
				/>
			</div>
		</div>
	)
}
export { TrackersApp }
