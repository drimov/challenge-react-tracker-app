import * as React from 'react'
import { Typography, Input } from '@mui/material'
import './FilterTrackers.css'
import SearchIcon from '@mui/icons-material/Search'
import { SvgIcon } from '@mui/material'

const FilterTrackers = ({ onTextChange }) => {
	const handleChange = (e) => {
		onTextChange(e.target.value)
	}

	return (
		<div className='FilterTrackers'>
			<Typography variant='h4'>Recherche de Trackers</Typography>
			<div>
				<SvgIcon fontSize='large'>
					<SearchIcon />
				</SvgIcon>
				<Input
					fullWidth
					id='standard-basic'
					placeholder='libéllé du tracker'
					onChange={handleChange}
				/>
			</div>
		</div>
	)
}

export { FilterTrackers }
