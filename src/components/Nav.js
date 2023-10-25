import whiteLogo from '../images/tinder_logo_white.png'
import colorLogo from '../images/tinder_logo_color.png'


export const Nav = ( {minimal, authToken} ) => {
    return (
    <nav>
        <div className="logo-container">
            <img className="logo" src={minimal ? colorLogo : whiteLogo} alt="Tinder Logo"/>
        </div>
        {!authToken && !minimal && <button className="nav-button">Log in</button>}
    </nav>
  )
}

export default Nav