import * as React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Checkbox from '../../components/Checkbox';
import InputText from '../../components/InputText';
import styles from './Login.module.css';
import {AppContext} from '../../helpers/AppContext';

/**
 * Login Page
 *
 * @returns {React.ReactElement} Login react page
 */
export default function Login(): React.ReactElement {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const {signin} = React.useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  /**
   * Sets the username and password variables in the state
   *
   * @param {object[]} event Object containing data for the event
   * @param {object[]} event.target Current target of the event
   * @param {string} event.target.value String value of the changed input
   * @param {string} event.target.name String containing the name of the input
   */
  const handleChange = (event: {target: {value: string; name: string}}) => {
    const {name, value} = event.target;

    switch (name) {
      case 'username':
        setUser(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  };

  /**
   * Function that sends the credentials to the API
   */
  function handleSubmit() {
    if (user.length > 0 && password.length > 0) {
      signin(user, password, remember, () => {
        navigate(from, {replace: true});
      });
    }
  }

  /**
   * Handle remember me changes
   */
  function handleChangeChecked() {
    setRemember((value) => !value);
  }

  return (
    <div>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img src="logo.png" alt="Z Home Media Server" />
        </div>
        <InputText
          value={user}
          onChange={handleChange}
          placeholder="Username"
          name="username"
        />
        <InputText
          value={password}
          onChange={handleChange}
          placeholder="Password"
          name="password"
          type="password"
        />
        <div>
          <button className="button" type="button" onClick={handleSubmit}>
            Login
          </button>
        </div>
        <div className={styles.remember}>
          <Checkbox
            label='Remember me'
            checked={remember}
            onChange={handleChangeChecked}
          />
        </div>
        <div className={styles.reset}>
          <Link to="/login">Reset password</Link>
        </div>
      </div>
    </div>
  );
}
