import { Card, CardHeader } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ListIcon from '@mui/icons-material/List'
import CategoryIcon from '@mui/icons-material/Category'
import './TrackerTableBar.css'

const TrackerTableBar = ({
	onTrackerProgress,
	onTrackerFinish,
	onAllTracker,
	onEditTrackerOpen,
	onEditCategoryOpen,
}) => {
	return (
		<Card className='TrackerTableBar'>
			<div>
				<CardHeader title='Taches :' />
				<CardHeader
					action={<AccessTimeIcon />}
					title='En cours'
					onClick={onTrackerProgress}
				/>
				<CardHeader
					action={<CheckCircleIcon />}
					title='Terminés'
					onClick={onTrackerFinish}
				/>
				<CardHeader
					action={<ListIcon />}
					title='Tous'
					onClick={onAllTracker}
				/>
			</div>
			<div>
				<CardHeader
					action={<CategoryIcon />}
					title='Catégories'
					onClick={onEditCategoryOpen}
				/>
				<CardHeader action={<AddIcon onClick={onEditTrackerOpen} />} />
			</div>
		</Card>
	)
}

export { TrackerTableBar }
