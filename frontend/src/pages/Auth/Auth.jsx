import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { userContext } from '../../contexts/userContext'

import Icon from '../../components/UI/Icon/Icon'
import Heading from '../../components/Heading'
import Btn from '../../components/UI/Btn/Btn'
import Splitter from '../../components/UI/Splitter/Splitter'

import css from './Auth.module.css'

const Auth = () => {
	// Navigation & user
	const { user, setUser } = useContext(userContext),
		navigate = useNavigate()

	// Redirection
	useEffect(() => { user && navigate("/profile") }, [ user ])

	// Form
	const { register,
			handleSubmit,
			watch,
			formState: {errors, isSubmitting}
		} = useForm(),
		
		password = watch('password')

	// Form password visibility
	const [isPasswordVisible, setPasswordVisibility] = useState(false),
		togglePassword = () => ()=> setPasswordVisibility(prev => !prev)

	const [entryWay, setEntryWay] = useState('signIn'),
		changeEntryWay = method => () => setEntryWay(method)

	// Immitation of successful backend request
	async function onSubmit (data) {
		if (entryWay === 'signUp') {
			data.username.trim()
			try {
				await new Promise(resolve => {
					setTimeout(() => {
						resolve('successfully registered') // Pretending data parsing from
										// the "200, OK" server request
						console.log(data) // Debug
						setUser(data)
						navigate('/')
					}, 2000)
				})
			} catch(err) { errors.root && <span>{err}</span> }
		} else { 
			try {
				await new Promise(resolve => {
					setTimeout(() => {
						resolve('successfully logged in')
						// Recieving missing data such as username or tokens
						data.username = data.email.match(/^[^@]+/)[0].replace(/[\._-]/g, ' ') // Temp. plug
						setUser(data)
						navigate('/')
					}, 2000)
				})
			} catch (err) { errors.root && <span>{err}</span> }
		}
	}

	const data = {
		signUp: {
			title: 'Sign Up',
			description: 'Small description for the title above some morenguage worldwide economy',
			info: <div>
					<span>Already have an account?</span>
					<Btn func={changeEntryWay('signIn')}
						classes="btn-none">Login!</Btn>
				</div>,
			form: <form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<input {...register('username', {
							required: entryWay === 'signUp',
							minLength: 4,
							maxLength: 15
						})}
							type="username"
							placeholder="Username"/>
						{errors.username && <span>Username must be 4-15 characters long</span>}
					</div>

					<div>
						<input {...register('email', {
								required: true,
								pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
							})}
							type="email"
							placeholder="E-mail"/>
						{errors.email && <span>Email address is not valid</span>}
					</div>

					<div className={css.form_password}>
						<input {...register('password', {
								required: true,
								minLength: 8
							})}
							type={isPasswordVisible  ? 'text' : 'password'}
							placeholder="Password"/>
						<div onClick={togglePassword()}>
							<Icon id={isPasswordVisible ? 'visible' : 'invisible'}/>
						</div>
					</div>
					{errors.password && <span>Password must contain at least 8 characters</span>}

					{entryWay === 'signUp' && (
						<div>
							<input {...register('password_repeat', {
									required: true,
									validate: value => value === password || 'Passwords do not match'
								})}
								type={isPasswordVisible ? 'text' : 'password'}
								placeholder="Confirm Password" />
							{errors.password_repeat
								&& errors.password_repeat.message !== ''
								&& <span>{errors.password_repeat.message}</span>}
						</div>
					)}

					<Btn isDisabled={isSubmitting} classes="btn-black" type="submit">
						{isSubmitting ? 'Processing...' : 'Sign Up!'}
					</Btn>
				</form>
		},
		signIn: {
			title: 'Sign In',
			description: 'Lorem ipsum dolor sit amet, consion for the title above psum dolor',
			info: <div>
					<span>Don't have an account?</span>
					<Btn func={changeEntryWay('signUp')}
						classes="btn-none">Sign Up!</Btn>
				</div>,
			form: <form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<input {...register('email', {
								required: true,
								pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
							})}
							type="email"
							placeholder="E-mail"/>
						{errors.email && <span>Email address is not valid</span>}
					</div>

					<div className={css.form_password}>
						<input {...register('password', {
								required: true,
								minLength: 8
							})}
							type={isPasswordVisible  ? 'text' : 'password'}
							placeholder="Password"/>
						<div onClick={togglePassword()}>
							<Icon id={isPasswordVisible ? 'visible' : 'invisible'}/>
						</div>
					</div>
					{errors.password && <span>Password must contain at least 8 characters</span>}

					<Btn isDisabled={isSubmitting} classes="btn-black" type="submit">
						{isSubmitting ? 'Processing...' : 'Sign In!'}
					</Btn>
				</form>
		}
	}

	return <section className={css.auth__section}>
		<div className={css.auth__container}>
			<div className={css.container_intro}>
				<Heading size="massive">Welcome</Heading>
				<p>{data[entryWay].description}</p>
				{data[entryWay].info}
			</div>
			<div className={css.container_form}>
				<div><Heading size="massive">{data[entryWay].title}</Heading></div>
				<div className="form__wrapper">{data[entryWay].form}</div>
				<Splitter/>
				<div>
					<Btn classes="btn-white"><Icon id="google"/>Continue with Google</Btn>
					<Btn link="/">Back Home</Btn>
				</div>
			</div>
		</div>
	</section>
}

export default Auth