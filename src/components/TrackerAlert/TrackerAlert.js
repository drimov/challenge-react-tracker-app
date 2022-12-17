import { Stack, Alert, AlertTitle } from '@mui/material'

const TrackerAlert = ({ error, succes }) => {
	return (
		<Stack spacing={2}>
			{error?.map((err, key) => (
				<Alert
					key={key}
					severity='error'>
					<AlertTitle>Erreur</AlertTitle>
					{err}
				</Alert>
			))}
			{succes !== null ? (
				<Alert severity='success'>
					<AlertTitle>Réussi</AlertTitle>
					{succes}
				</Alert>
			) : null}
		</Stack>
	)
}

export { TrackerAlert }
