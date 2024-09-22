import { useState } from 'react'
import Calendar from 'react-calendar'

import Icon from '../../../components/UI/Icon/Icon'
import Heading from '../../../components/Heading'
import Btn from '../../../components/UI/Btn/Btn'

import css from './Booking.module.css'

const BookingDateSelection = ({date, setDate, selectedOptions, setSelectedOptions}) => {
    const changeSelectedOption = (date) => {
        const formattedDate = date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

        setSelectedOptions({...selectedOptions, day: formattedDate})
        setDate(date)
    }
    
    return <>
        <span className={css.booking_selection} data-font-accent="medium">
            {`Selected: ${date.toLocaleString('default', {month: 'long', day: 'numeric'})}`}
        </span>
        <Calendar
            next2Label={null}
            prev2Label={null}
            minDate={new Date()}
            value={date}
            onClickDay={changeSelectedOption}
        />
    </>
}

const BookingMassageSelection = ({selectedOptions, setSelectedOptions}) => {
    const changeSelectedOption = (type) => { setSelectedOptions({...selectedOptions, massage: type}) }
    return (
        <>
            <span className={css.booking_selection} data-font-accent="medium">
                What type of massage do you need?
            </span>
            <div className={css.booking_sessions__container}>
                {[{name: "Nutrition", text: "Nutrition description"},
                  {name: "Reflexology", text: "Reflexology description"},
                  {name: "Osteopathy", text: "Osteopathy description"}].map((type, index) => (
                    <div key={index} onClick={() => {changeSelectedOption(type.name)}}>
                        <div className="inline_heading">
                            <Heading size="large">{type.name}</Heading>
                            { type.name === selectedOptions.massage && <Icon id="location"/> }
                        </div>
                        <p data-font-accent="medium">{type.text}</p>
                    </div>
                ))}
            </div>
        </>
    )}

const BookingTimeSelection = ({ selectedOptions, setSelectedOptions }) => {
    return (
        <>
            <span className={css.booking_selection} data-font-accent="medium">
                Session appointment
            </span>
            <div className={css.booking_time__container}>
                {["Morning", "Afternoon", "Evening"].map((period, index) => (
                    <div key={index}>
                        <Heading>{period}</Heading>
                        <div>
                            {["9:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00", "20:30"]
                                .slice(index * 3, index * 3 + 3)
                                .map((time, idx) => (
                                    <Btn key={idx}
                                        func={() => {setSelectedOptions({...selectedOptions, time: time})}}
                                        // Simulating unavailable (taken) slots
                                        classes={ time === "12:30"
                                            || time === "15:30"
                                            || time === "17:00"
                                            || time === "18:30"
                                        ? "btn-disabled" : (time === selectedOptions.time ? 'btn-accept' : '')}>
                                        { time }
                                    </Btn>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <span className={css.booking_selection} data-font-accent="medium">
                Session duration
            </span>
            <div className={`${css.booking_sessions__container} ${css.booking_duration__container}`}>
                {[
                    { duration: "30 mins", cost: 49},
                    { duration: "45 mins", cost: 75},
                    { duration: "60 mins", cost: 99},
                    { duration: "90 mins", cost: 149}
                ].map(({ duration, cost }, index) => (
                    <div key={index} onClick={() => {setSelectedOptions({...selectedOptions, duration: duration})}}>
                        <div className="inline_heading">
                            <Heading size="large">{duration}</Heading>
                            { duration === selectedOptions.duration && <Icon id="location"/> }
                        </div>
                        <span data-font-accent="medium">CAD ${cost}</span>
                    </div>  
                ))}
            </div>
        </>
    )
}

const BookingConfirmation = ({ selectedOptions, transitTo }) => {
    return (
        <>
            <span className={css.booking_selection} data-font-accent="medium">
                Submit or edit your booking by clicking
            </span>
            <div className={css.booking_sessions__container}>
                {steps.map((step, i) => {
                    if (i !== steps.length - 1) {
                        return (<div onClick={() => {transitTo(i)}}>
                            <Heading size="lage">{steps[i]?.options?.join(' & ')}</Heading>
                            <span data-font-accent="medium">{step.options?.map((option, i) => (
                                <>
                                    {selectedOptions[option].toString()}
                                    {i !== step.options.length - 1 && ' | '}
                                </>
                            ))}</span>
                        </div>)
                    }
                })}
            </div>
        </>
    )
}

const steps = [
    { component: BookingDateSelection, label: 'Pick a day', options: ['day']},
    { component: BookingMassageSelection, label: 'Pick the massage type', options: ['massage']},
    { component: BookingTimeSelection, label: 'Pick a time', options: ['time', 'duration']},
    { component: BookingConfirmation, label: 'Confirm your choice' }
]

const Booking = () => {
    const [ isProcessing, setProcessing ] = useState(false)
    const [ selectedOptions, setSelectedOptions ] = useState({})
    
    const [ date, setDate ] = useState(new Date())
    const [ step, setStep ] = useState(0)

    const StepComponent = steps[step].component,
        stepLabel = steps[step].label

    // Sending data to server
    const handleBookingSubmit = async () => {
        setProcessing(true)
        console.log('Submitting booking...')

        try {
            const res = await new Promise(resolve => {
                setTimeout(() => {
                    resolve('Booking submitted!')
                }, 1000)
            })
            console.log(res)
            console.log(selectedOptions)
        } catch (err) { console.error(err) }
        
        setProcessing(false)
    }

    // Steps controller
    const handleStepBack = () => { setStep(prev => prev - 1) },
        handleNextStep = () => {
            (
                !!selectedOptions?.time
                && !!selectedOptions?.duration
                && step === steps.length - 1
            )
                ? handleBookingSubmit()
                : setStep(prev => prev + 1)
        }
    
    // Btn disabled behaviour
    const validateIfDisabled = () => {
        if (steps[step]?.options === undefined) {
            return false
        } else { return steps[step]?.options.some(option => !selectedOptions[option]) }
    }
    
    return (
        <div className={css.booking}>
            <div>
                <div className='inline_heading'>
                    <Heading size='massive'>Booking</Heading>
                    <div className={css.completion_circle}>
                        <Heading>{`${step + 1} / ${steps.length}`}</Heading>
                    </div>
                </div>
                <hr/>
                <div className={css.booking_content}>
                    <Heading size='large'>{stepLabel}</Heading>
                    <StepComponent
                        date={date} setDate={setDate}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                        transitTo={setStep}
                    />
                </div>
            </div>
            <div>
                { step > 0 && <Btn func={handleStepBack}>Back</Btn> }
                { !!(!!selectedOptions?.time & !!selectedOptions?.duration | step < steps.length - 1)
                    && <Btn classes="btn-accept"
                            isDisabled={validateIfDisabled() | isProcessing}
                            func={handleNextStep}>
                                {isProcessing
                                    ? 'Processing...'
                                    : (step === steps.length - 1 ? 'Submit' : 'Next')}
                        </Btn> }
            </div>
        </div>
    )
}

export default Booking