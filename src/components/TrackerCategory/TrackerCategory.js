import * as React from 'react'
import { TableRow, TableCell } from '@mui/material'
import './TrackerCategory.css'

const TrackerCategory = ({ category }) => {
	return (
		<TableRow className='TrackerCategory'>
			<TableCell>{category}</TableCell>
			<TableCell></TableCell>
			<TableCell></TableCell>
			<TableCell></TableCell>
		</TableRow>
	)
}
export { TrackerCategory }
