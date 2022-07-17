import * as React from 'react';
import {Routes, Route, useLocation, Navigate, Outlet} from 'react-router-dom';
import {AppContext, AppContextType, AppProvider} from './helpers/AppContext';

import Home from './pages/Home';
import Login from './pages/Login/Login';
import Menu from './components/Menu';

const Images = React.lazy(() => import('./pages/Images'));
const Image = React.lazy(() => import('./pages/Image'));
const Videos = React.lazy(() => import('./pages/Videos'));
const Video = React.lazy(() => import('./pages/Video/Video'));
const VideoUpload = React.lazy(() => import('./pages/VideoUpload/VideoUpload'));

/**
 * Use Auth function
 *
 * @returns {AppProvider} AppContext
 */
function useAppContext(): AppContextType {
  return React.useContext(AppContext);
}

/**
 * @param {object[]} props React props object
 * @param {boolean} props.loading Loading state boolean
 * @param {Function} props.setLoading set loading function
 * @returns {React.ReactElement} Main layout of application
 */
function ProtectedLayout(props: {
  loading: boolean;
  setLoading: (arg0: boolean) => void;
}): React.ReactElement {
  const [content, setContent] = React.useState(<>loading...</>);
  const context = useAppContext();
  const location = useLocation();

  React.useEffect(() => {
    if (props.loading) {
      props.setLoading(false);

      context.refresh().then((response) => {
        if (response) {
          setContent(<>
            <Menu />
            <React.Suspense fallback={<>...</>}>
              <Outlet />
            </React.Suspense>
          </>);
        } else {
          setContent(<Navigate to="/login" state={{from: location}} replace />);
        }
      }).catch((_error) => {
        setContent(<Navigate to="/login" state={{from: location}} replace />);
      });
    } else {
      if (context.user) {
        setContent(<>
          <Menu />
          <React.Suspense fallback={<>...</>}>
            <Outlet />
          </React.Suspense>
        </>);
      }
    }
  }, []);

  return content;
}

/**
 * Main element of the react application
 *
 * @returns {React.ReactElement} Main react app element
 */
export default function App(): React.ReactElement {
  const [loading, setLoading] = React.useState(true);

  return (
    <>
      <AppProvider>
        <AppContext.Consumer>
          {(context) => (
            <div className="App" data-theme={context.theme}>
              <Routes>
                <Route path="login" element={<Login />} />
                <Route
                  element={
                    <ProtectedLayout
                      loading={loading}
                      setLoading={setLoading}
                    />
                  }
                >
                  <Route path="/" element={<Home />} />
                  <Route path="home" element={<Home />} />
                  <Route path="images" element={<Images />} />
                  <Route path="image/:imageId" element={<Image />} />
                  <Route path="videos" element={<Videos />} />
                  <Route path="video/:videoId" element={<Video />} />
                  <Route path="video/upload" element={<VideoUpload />} />
                </Route>
              </Routes>
            </div>
          )}
        </AppContext.Consumer>
      </AppProvider>
    </>
  );
}
