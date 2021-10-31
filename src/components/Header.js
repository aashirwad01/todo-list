import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({title ,onAdd , showAdd}) => {
    const onClick=()=>{
        console.log("Click")
    }


    return (
        <header className='header'>
            <h1>{title}</h1>
            
            <Button color={showAdd ?'Red':'Green'} text={showAdd ?'Close Form':'Add Task'} onClick={onAdd}/>
        </header>
    )
}
Header.defaultProps={
title:'Todo Task Tracker'
}

Header.propTypes ={
    title:PropTypes.string,
}



export default Header
