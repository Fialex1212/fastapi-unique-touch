import icons from '../../../data/icons'

const Icon = ({ id, dark }) => {
    dark ||= false
    const SvgIcon = icons[id]

    if (!SvgIcon) { return null }
    return <div className='svg_icon'>
        <img style={{
            filter: dark
                ? 'brightness(0)'
                : 'initial'
            }} src={SvgIcon}/>
    </div>
}

export default Icon