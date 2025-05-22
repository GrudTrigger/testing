import { Box, CircularProgress } from '@mui/material'

function Loading() {
	return (
		<Box display='flex' justifyContent='center' mt={4}>
			<CircularProgress />
		</Box>
	)
}

export default Loading
