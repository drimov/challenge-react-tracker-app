import * as React from 'react'
import { diffTime } from '../../helper'
import { TableRow, TableCell } from '@mui/material'
import './TrackerRow.css'

const TrackerRow = ({ tracker, selectedId, onSelected }) => {
	const starttime = new Date(tracker?.starttime).toLocaleString()
	const endtime = tracker?.endtime
		? new Date(tracker?.endtime).toLocaleString()
		: 'en cours ...'

	const [duration, setDuration] = React.useState(
		diffTime(tracker?.starttime, tracker?.endtime)
	)

	React.useEffect(() => {
		const refresh = () => {
			setDuration(diffTime(tracker?.starttime, tracker?.endtime))
		}
		const timerID = setTimeout(() => refresh(), 1000)
		return () => {
			clearTimeout(timerID)
		}
	}, [duration, tracker?.endtime, tracker?.starttime])

	const handleClick = (e) => {
		onSelected(tracker)
	}

	const selected = tracker.id === selectedId ? 'selectedline' : ''
	return (
		<TableRow
			className={`${selected} TrackerRow`}
			onClick={handleClick}>
			<TableCell>{tracker.name}</TableCell>
			<TableCell>{starttime}</TableCell>
			<TableCell>{endtime}</TableCell>
			<TableCell>{duration}</TableCell>
		</TableRow>
	)
}

export { TrackerRow }
