import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color={showAdd ? 'red': 'greennpm '} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}></Button>
    </header>
  )
}
Header.defaultProps ={
    title:'Todo app'
}

Header.propTypes={
    title: PropTypes.string.isRequired
}
export default Header
