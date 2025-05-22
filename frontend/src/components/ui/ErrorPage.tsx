import type { ApolloError } from '@apollo/client'
import { Box, Typography } from '@mui/material'

function ErrorPage({ error }: { error: ApolloError }) {
	return (
		<Box display='flex' justifyContent='center' mt={4}>
			<Typography color='error'>
				Ошибка загрузки данных: {error.message}
			</Typography>
		</Box>
	)
}

export default ErrorPage
