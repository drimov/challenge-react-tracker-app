import { Card, CardHeader, CardContent } from '@mui/material'
import { taskNbComplete, taskNbProgress } from '../../helper'
import './TrackersStats.css'
import DoneIcon from '@mui/icons-material/Done'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BarChartIcon from '@mui/icons-material/BarChart'
import { blueColor, greenColor, orangeColor } from '../../contants'

const TrackersStats = ({ allTrackers }) => {
	const complete = taskNbComplete(allTrackers)
	const inProgress = taskNbProgress(allTrackers)

	return (
		<div className='TrackersStats'>
			<CardStat
				bg={greenColor}
				icon={<DoneIcon style={{ color: 'white' }} />}
				text={`Trackers terminées: ${complete}`}
			/>
			<CardStat
				bg={orangeColor}
				icon={<AccessTimeIcon style={{ color: 'white' }} />}
				text={`Trackers en cours: ${inProgress}`}
			/>
			<CardStat
				bg={blueColor}
				icon={<BarChartIcon style={{ color: 'white' }} />}
				text={`Total: ${allTrackers.length}`}
			/>
		</div>
	)
}

const CardStat = ({ bg, icon, text }) => {
	return (
		<Card>
			<CardHeader
				avatar={icon}
				style={{ backgroundColor: bg }}
			/>
			<CardContent>{text}</CardContent>
		</Card>
	)
}

export { TrackersStats }
