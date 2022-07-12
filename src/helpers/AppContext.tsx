import * as React from 'react';
import axios from 'axios';

interface AppContextType {
  user: any;
  theme: string;
  changeTheme: (theme: string) => void;
  signin: (
    user: string,
    password: string,
    remember: boolean,
    callback: Function
  ) => void;
  refresh: () => Promise<boolean>;
  signout: (callback: VoidFunction) => void;
}

const AppContext = React.createContext<AppContextType>(null!);

/**
 * AppProvider element
 *
 * @param {React.ReactNode} children Children of component
 * @returns {React.ReactElement} AuthContext
 */
function AppProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [user, setUser] = React.useState<any>(null);
  const [theme, setTheme] = React.useState('dark');

  /**
   *
   * @param {string} theme String containing the theme
   */
  const changeTheme = (theme: string) => {
    setTheme(theme);
  };

  /**
   * @param {string} user User string
   * @param {string} password Password string
   * @param {boolean} remember Remember user between page reloads
   * @param {Function} callback Callback function
   */
  const signin = (
      user: string,
      password: string,
      remember: boolean,
      callback: Function,
  ) => {
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/auth',
      data: {
        user: user,
        password: password,
        remember: remember,
      },
      withCredentials: true,
    })
        .then((response) => {
          if (response.data.user !== null) {
            setUser(response.data.user);
          }
          callback();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
  };

  /**
   * Refresh info of the user on browser reload
   */
  async function refresh():Promise<boolean> {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:8000/api/auth/info',
      withCredentials: true,
    });

    if (response.data.user !== null) {
      setUser(response.data.user);
      return true;
    }

    return false;
  };

  /**
   * Signout function
   *
   * @param {Function} callback Callback
   */
  const signout = (callback: VoidFunction) => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/api/auth/logout',
      withCredentials: true,
    })
        .then(() => {
          setUser(null);
          setTheme('dark');
          callback();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
  };

  const value = {
    user,
    theme,
    changeTheme,
    signin,
    refresh,
    signout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export {AppContext, AppContextType, AppProvider};
