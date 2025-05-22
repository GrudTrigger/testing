import { useMutation } from '@apollo/client'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { DELETE_USER } from '../../graphql/mutations'
import { GET_USERS } from '../../graphql/queries'

export function DeleteUserModal() {
	const navigate = useNavigate()
	const { id } = useParams()
	const [deleteUser, { loading }] = useMutation(DELETE_USER, {
		refetchQueries: [{ query: GET_USERS }],
		awaitRefetchQueries: true,
		onCompleted: () => {
			navigate(-1)
		},
	})

	const handleClose = () => navigate(-1)

	const handleDelete = async () => {
		try {
			await deleteUser({ variables: { id } })
			handleClose()
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<Dialog open onClose={handleClose}>
			<DialogTitle>Удалить пользователя</DialogTitle>
			<DialogContent>
				<Typography>
					Вы уверены, что хотите удалить этого пользователя?
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} disabled={loading}>
					Отмена
				</Button>
				<Button
					onClick={handleDelete}
					variant='contained'
					color='error'
					disabled={loading}
				>
					Удалить
				</Button>
			</DialogActions>
		</Dialog>
	)
}
