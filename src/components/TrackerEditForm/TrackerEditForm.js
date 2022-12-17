import { useEffect, userEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getDateTimeForPicker } from '../../helper'
import useEditTracker from '../../hooks/useEditTracker'
import {
	Container,
	InputLabel,
	Input,
	Button,
	FormGroup,
	Select,
	MenuItem,
} from '@mui/material'
import './TrackerEditForm.css'

const newDefaultTracker = () => ({
	id: uuidv4(),
	category: 'Défaut',
	starttime: getDateTimeForPicker(),
	endtime: '',
	name: '',
})

const TrackerEditForm = ({
	selectedTracker = { ...newDefaultTracker(), id: '' },
	onAddTracker,
	onDeleteTracker,
	onUpdateTracker,
	listCategories,
}) => {
	const {
		tracker,
		activeButtons,
		activeInput,
		setTracker,
		editTracker,
		saveTracker,
		updateTracker,
		deleteTracker,
		newTracker,
	} = useEditTracker(selectedTracker)

	const handleTrackerName = (e) => {
		setTracker({ ...tracker, name: e.target.value })
	}

	const handleTrackerStartTime = (e) => {
		setTracker({ ...tracker, starttime: e.target.value })
	}

	const handleTrackerEndTime = (e) => {
		setTracker({ ...tracker, endtime: e.target.value })
	}

	const handleTrackerCategory = (e) => {
		setTracker({ ...tracker, category: e.target.value })
	}

	useEffect(() => {
		if (selectedTracker?.id !== '') {
			editTracker(selectedTracker)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTracker])

	const handleOnSubmit = (e) => {
		e.preventDefault()
		onAddTracker(tracker)
		saveTracker()
	}

	const handleUpdateTracker = () => {
		onUpdateTracker(tracker)
		updateTracker()
	}

	const handleDeleteTracker = () => {
		onDeleteTracker(tracker)
		deleteTracker(newDefaultTracker())
	}

	const handleNewTracker = () => {
		newTracker(newDefaultTracker())
	}

	return (
		<form
			className='TrackerEditForm'
			onSubmit={handleOnSubmit}>
			<FormGroup>
				{/* <legend>Gestion des Trackers</legend> */}
				<InputLabel htmlFor='trackerName'>Nom du tracker : </InputLabel>
				<Input
					disabled={!activeInput}
					type='text'
					id='trackerName'
					placeholder='tracker name...'
					onChange={handleTrackerName}
					value={tracker.name}></Input>

				<InputLabel htmlFor='trackerDateStart'>Date de début : </InputLabel>
				<Input
					disabled={!activeInput}
					id='trackerDateStart'
					type='datetime-local'
					placeholder='durée...'
					onChange={handleTrackerStartTime}
					value={tracker.starttime}
					step='2'></Input>

				<InputLabel htmlFor='trackerDateEnd'>Date de fin : </InputLabel>
				<Input
					disabled={!activeInput}
					id='trackerDateEnd'
					type='datetime-local'
					placeholder='durée...'
					onChange={handleTrackerEndTime}
					value={tracker.endtime}
					step='2'></Input>

				<InputLabel>Categorie:</InputLabel>
				<Select
					disabled={!activeInput}
					value={tracker.category}
					defaultValue={listCategories[0]}
					onChange={handleTrackerCategory}>
					{listCategories.map((category, key) => (
						<MenuItem
							value={category}
							key={key}>
							{category}
						</MenuItem>
					))}
				</Select>

				<InputLabel>Actions</InputLabel>
				<Container>
					<Button
						onClick={handleNewTracker}
						variant='contained'>
						Nouveau Tracker
					</Button>
					<Button
						disabled={!activeButtons.btnSave}
						type='submit'
						variant='contained'>
						Ajouter
					</Button>
					<Button
						disabled={!activeButtons.btnDel}
						onClick={handleDeleteTracker}
						variant='contained'>
						Supprimer
					</Button>
					<Button
						disabled={!activeButtons.btnUp}
						onClick={handleUpdateTracker}
						variant='contained'>
						Mettre à jour
					</Button>
				</Container>
			</FormGroup>
		</form>
	)
}

export { TrackerEditForm }
