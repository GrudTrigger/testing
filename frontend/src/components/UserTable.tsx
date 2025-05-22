import { useQuery } from '@apollo/client'
import AddIcon from '@mui/icons-material/Add'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import {
	Box,
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { GET_USERS } from '../graphql/queries'
import type { User } from '../types/user.types'
import UserTableRow from './UserTableRow'
import ErrorPage from './ui/ErrorPage'
import Loading from './ui/Loading'

function UserTable() {
	const { data, loading, error } = useQuery<{ users: User[] }>(GET_USERS)
	const navigate = useNavigate()
	const location = useLocation()

	if (loading) {
		return <Loading />
	}

	if (error) {
		return <ErrorPage error={error} />
	}

	return (
		<Box>
			<Box display='flex' justifyContent='flex-end' mb={2}>
				<Button
					variant='contained'
					startIcon={<AddIcon />}
					onClick={() =>
						navigate('/users/new', { state: { backgroundLocation: location } })
					}
				>
					Создать пользователя
				</Button>
			</Box>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Email</TableCell>
							<TableCell>Имя</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.users.length === 0 ? (
							<TableRow>
								<TableCell colSpan={3} align='center' sx={{ py: 6 }}>
									<Stack direction='column' alignItems='center' spacing={1}>
										<PersonOffIcon color='disabled' fontSize='large' />
										<Typography variant='subtitle1' color='text.secondary'>
											Пока нет пользователей
										</Typography>
									</Stack>
								</TableCell>
							</TableRow>
						) : (
							data?.users.map(user => (
								<UserTableRow key={user.id} user={user} />
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default UserTable
