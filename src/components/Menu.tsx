import * as React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AppContext} from '../helpers/AppContext';

import LogoutSVG from '../../assets/svgr/logout.svg';
import LightModeSVG from '../../assets/svgr/light_mode.svg';
import DarkModeSVG from '../../assets/svgr/dark_mode.svg';
import ProfileSVG from '../../assets/svgr/account_circle.svg';

/**
 * @returns {React.ReactElement} SVG
 */
const Logout: React.FC = (): React.ReactElement => (
  <LogoutSVG className="top-menu-svg-button" />
);
/**
 * @returns {React.ReactElement} SVG
 */
const LightMode: React.FC = (): React.ReactElement => (
  <LightModeSVG className="top-menu-svg-button" />
);
/**
 * @returns {React.ReactElement} SVG
 */
const DarkMode: React.FC = (): React.ReactElement => (
  <DarkModeSVG className="top-menu-svg-button" />
);
/**
 * @returns {React.ReactElement} SVG
 */
const Profile: React.FC = (): React.ReactElement => (
  <ProfileSVG className="top-menu-svg-button" />
);

/**
 *
 * @returns {React.ReactElement} Menu react element
 */
export default function TopMenu(): React.ReactElement {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(true);

  const {user, changeTheme, signout} = React.useContext(AppContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    changeTheme(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  /**
   *
   */
  function handleClick() {
    setMenuVisible((value) => !value);
  }

  /**
   * Logout function
   */
  function handleLogout() {
    signout(() => {
      navigate('/login');
    });
  }

  /**
   *
   */
  function handleChangeTheme() {
    setDarkMode((value) => !value);
  }

  /**
   *
   */
  function handleProfile() {}

  return (
    <>
      {user && (
        <>
          <div className="top-menu">
            <div className="top-menu-left">
              <div className="hamburger-icon" id="icon" onClick={handleClick}>
                <div
                  className={`icon-1 ${menuVisible ? 'a' : ''}`}
                  id="a"
                ></div>
                <div
                  className={`icon-2 ${menuVisible ? 'c' : ''}`}
                  id="b"
                ></div>
                <div
                  className={`icon-3 ${menuVisible ? 'b' : ''}`}
                  id="c"
                ></div>
                <div className="clear"></div>
              </div>
            </div>
            <div className="top-menu-center">
              <Link to="/home">Home</Link>
              <Link to="/videos">Videos</Link>
              <Link to="/images">Images</Link>
            </div>
            <div className="top-menu-right">
              <div onClick={handleProfile} className="menu-profile-container">
                <span>{user}</span> <Profile />
              </div>
              <div onClick={handleChangeTheme}>
                {darkMode ? <LightMode /> : <DarkMode />}
              </div>
              <div onClick={handleLogout}>
                <Logout />
              </div>
            </div>
          </div>

          <nav id="nav" className={`${menuVisible ? 'show' : ''}`}>
            <ul>
              <li>
                <Link to="/video/upload" onClick={handleClick}>
                  Upload video
                </Link>
              </li>
              <li>
                <Link to="/image/upload" onClick={handleClick}>
                  Upload image
                </Link>
              </li>
            </ul>
          </nav>

          <div
            className={`side-menu ${menuVisible ? 'slide' : ''}`}
            id="blue"
          ></div>
        </>
      )}
    </>
  );
}
