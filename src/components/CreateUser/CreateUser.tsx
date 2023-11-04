import React, { useState } from "react"
import { TextInput } from "../TextInput"
import styles from './CreateUser.module.css'
import { useCreateUserMutation } from "../../store/api/usersApi"

export const CreateUser = () => {
	const [createUser] = useCreateUserMutation()

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName]	= useState('')
	const [feedback, setFeedback] = useState('')
	const [submitted, setSubmitted] = useState(false)

	const submitHandler = () => {
		if (firstName !== '' && lastName !== '') {
			setFeedback(`Hej, ${firstName} ${lastName}, välkommen!`)
			setSubmitted(true)
			setFirstName('')
			setLastName('')
			setTimeout(() => {
				setFeedback('')
			}, 5000)	

			createUser({
				user: {
					firstName: firstName,
					lastName: lastName
				}
			})

		} else {
			setSubmitted(false)
			setFeedback('Du behöver fylla i alla fält!')
		}
	}	

	return (
		<div className={styles.container}>
			<TextInput
				value={firstName}	
				placeholder="Förnamn"
				onInput={(event) => {
					setFirstName(event.target.value)
				}}
			/>
			<TextInput
				value={lastName}
				placeholder="Efternamn"
				onInput={(event) => {
					setLastName(event.target.value)
				}}
			/>
			<button className={styles.submitButton} onClick={submitHandler}>Lägg till användare</button>	
			<p className={styles.feedbackText} style={{ color: submitted ? 'green' : 'red' }}>{feedback}</p>
		</div>
	)
}
