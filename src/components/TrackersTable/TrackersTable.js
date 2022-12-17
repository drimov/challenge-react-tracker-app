import * as React from 'react'
import { groupBy } from '../../helper'
import { TrackerCategory } from '../TrackerCategory/TrackerCategory'
import { TrackerRow } from '../TrackerRow/TrackerRow'
import {
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from '@mui/material'
import './TrackersTable.css'

const TrackersTable = ({ trackers, selectedTracker, onSelectedTracker }) => {
	const rows = []
	let lastCategory = ''

	const trackersParCategory = groupBy(trackers, 'category')
	Object.keys(trackersParCategory).forEach((category) => {
		trackersParCategory[category].forEach((tracker) => {
			if (tracker.category !== lastCategory) {
				rows.push(
					<TrackerCategory
						key={category}
						category={tracker.category}></TrackerCategory>
				)
			}
			rows.push(
				<TrackerRow
					key={tracker.id}
					tracker={tracker}
					selectedId={selectedTracker?.id}
					onSelected={onSelectedTracker}></TrackerRow>
			)
			lastCategory = tracker.category
		})
	})

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Nom du Tracker</TableCell>
						<TableCell>Début</TableCell>
						<TableCell>Fin</TableCell>
						<TableCell>Durée</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{rows}</TableBody>
			</Table>
		</TableContainer>
	)
}

export { TrackersTable }
