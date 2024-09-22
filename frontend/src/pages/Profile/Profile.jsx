import { AP_URL } from '../../utils/constants'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { logout } from '../../utils/logout'

import CommonHero from '../../components/sections/CommonHero/CommonHero'
import Modal from '../../components/UI/Modal/Modal'
import Btn from '../../components/UI/Btn/Btn'
import Heading from '../../components/Heading'
import Booking from './Booking/Booking'

import css from './Profile.module.css'

const Profile = ({user}) => {
    const handleLogOut = () => logout(),
        navigate = useNavigate()
    
    useEffect(() => { !user && navigate('/auth') }, [user])

    const [ isModalOpen, setIsModalOpen ] = useState(false),
        openModal = () => setIsModalOpen(prev => !prev)

    return <>
        <Modal element={<Booking/>} isOpen={isModalOpen} setOpen={openModal}/>
        <CommonHero element={
            <div className={css.user_info__container}>
                <div>
                    <img src="https://images.unsplash.com/photo-1708028674046-0ffc248c0dfb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User Avatar"/>
                    <div>
                        <Heading size="large">{user?.username}</Heading>
                        <p data-font-accent="medium">{user?.email}</p>
                    </div>
                    <div>
                        <div className="inline_heading">
                            <Btn classes="btn-accept" func={handleLogOut}>Log Out</Btn>
                            { user?.username === 'admin'
                                ? <Btn classes="btn-accept" link={AP_URL}>Manage Schedule</Btn>
                                : null }
                        </div>
                    </div>
                </div>
            </div>
        }/>
        <section className={css.profile__section}>
            <div className="content__wrapper">
                {/* Schedule Planner */}
                <div>
                    <div className="inline_heading">
                        <Heading size="massive">Schedule Meeting</Heading>
                        <div><Btn classes="btn-accept" func={openModal}>Book an Appointment</Btn></div>
                    </div>
                    <div>
                        <table className={css.schedule__table}>
                            <caption>[Current week]</caption>
                            <thead>
                                <tr>
                                    <th>Sunday</th>
                                    <th>Monday</th>
                                    <th>Tuesday</th>
                                    <th>Wednesday</th>
                                    <th>Thursday</th>
                                    <th>Friday</th>
                                    <th>Saturday</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Meeting on 15:00</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Profile