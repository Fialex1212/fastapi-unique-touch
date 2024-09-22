import { useForm } from 'react-hook-form'
// import axios from 'axios'

import Icon from '../../../components/UI/Icon/Icon'
import Btn from '../../../components/UI/Btn/Btn'
import Heading from "../../../components/Heading"

import data from '../../../data/contactsContent'

import css from './Content.module.css'

const Content = () => {
    const { register,
            handleSubmit,
            watch,
            formState: { errors, isSubmitting }
        } = useForm()

    const formMessage = watch('message')

    const onSubmit = async (data) => {
        try {
            // const res = axios.post('url', data)
            const res = await new Promise(resolve => {
                setTimeout(() => {
                    resolve('Message sent!')
                }, 1300)
            })
            console.log(res, data)
        } catch (error) { console.error(error) }
    }
    
    return <section className={css.contacts_content__section}>
         <div className="content__wrapper">
            <Heading size="massive">Contact us</Heading>
            <div>
                <div className={css.contacts_cells}>
                    {data.map(({ icon, title, sub }, key ) => {
                        return (
                            <div key={`contacts_item_${key}`}>
                                <Icon id={icon}/>
                                <div>
                                    <Heading size="large">{title}</Heading>
                                    <span data-font-accent="medium">{sub}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={`form__wrapper ${css.contacts_form}`}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Heading size="massive">Send Message</Heading>
                        <p data-font-accent="medium">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure saepe facilis eos non omnis ipsum quod, cumque</p>
                        <div className={css.form__container}>
                            <div>
                                <input {...register('username', {
                                    required: true,
                                    minLength: 4
                                })} type="text" placeholder='First Name'/>
                                { errors.username && <span>Name must be at least 4 characters</span> }
                            </div>
                            <div>
                                <input {...register('email', {
                                    required: true,
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                                })} type="email" placeholder='Email'/>
                                { errors.email && <span>Invalid email address</span> }
                            </div>
                            <div>
                                <input {...register('phone', {
                                        minLength: 10,
                                        maxLength: 12
                                    })} type="tel" placeholder="Phone number (optional)"/>
                            </div>
                            <div>
                                <input {...register('subject', {
                                    required: true,
                                    validate: value => (value.trim().length >= 4)
                                })} type="text" placeholder="Subject"/>
                                { errors.subject && <span>Subject must be at least 4 characters</span> }
                            </div>
                        </div>
                        <div>
                            <textarea {...register('message', {
                                required: true,
                                minLength: 15,
                                maxLength: 300
                            })} type="text" placeholder="Your message"/>
                            <span data-font-accent="medium">
                                { `${formMessage ? formMessage.length : 0} / 300` }
                            </span>
                            { errors.message && <span>Message is way short, min 15 characters</span> }
                        </div>
                        <Btn isDisabled={isSubmitting} classes="btn-accept" type="submit">
                            {isSubmitting ? 'Sending...' : 'Send'}
                        </Btn>
                    </form>
                </div>
            </div>
         </div>
    </section>
}

export default Content