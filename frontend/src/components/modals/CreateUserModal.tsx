import { useMutation } from '@apollo/client'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CREATE_USER } from '../../graphql/mutations'
import { GET_USERS } from '../../graphql/queries'
import { userSchema, type FormData } from '../../types/form.types'


export function CreateUserModal() {
	const navigate = useNavigate()
	const [form, setForm] = useState({ email: '', name: '' })
	const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

	const [createUser] = useMutation(CREATE_USER, {
		refetchQueries: [{ query: GET_USERS }],
		awaitRefetchQueries: true,
		onCompleted: () => {
			navigate(-1)
		},
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
		setErrors(prev => ({ ...prev, [name]: undefined }))
	}

	const handleClose = () => navigate(-1)

	const handleSubmit = async () => {
		const result = userSchema.safeParse(form)
		if (!result.success) {
			const fieldErrors = result.error.flatten().fieldErrors
			setErrors({
				email: fieldErrors.email?.[0],
				name: fieldErrors.name?.[0],
			})
			return
		}

		try {
			await createUser({ variables: { input: form } })
			handleClose()
		} catch (err: unknown) {
			if (err instanceof Error) {
				const message = err.message
				if (message.includes('E11000 duplicate key error')) {
					setErrors(prev => ({
						...prev,
						email: 'Пользователь с таким email уже существует',
					}))
				}
			} else {
				console.error(err)
			}
		}
	}

	return (
		<>
			<Dialog
				open
				onClose={handleClose}
				sx={{
					'& .MuiDialog-paper': {
						width: '500px',
						maxWidth: '90vw',
						minHeight: '320px',
					},
				}}
			>
				<DialogTitle>Создание пользователя</DialogTitle>
				<DialogContent>
					<TextField
						name='email'
						label='Email'
						fullWidth
						margin='normal'
						value={form.email}
						onChange={handleChange}
						error={!!errors.email}
						helperText={errors.email}
					/>
					<TextField
						name='name'
						label='Имя'
						fullWidth
						margin='normal'
						value={form.name}
						onChange={handleChange}
						error={!!errors.name}
						helperText={errors.name}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Отмена</Button>
					<Button onClick={handleSubmit} variant='contained'>
						Создать
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
