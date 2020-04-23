import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import ArtistRoute from './ArtistRoute';

import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from '../../actions';

// yaeji is default artist:
const DEFAULT_ARTIST_ID = '2RqrWplViWHSGLzlhmDcbt';

const App = () => {
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(requestAccessToken());
    if ( !dispatch(requestAccessToken())){
      return;
    }
    fetch('/spotify_access_token')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if ( !dispatch(receiveAccessToken(json.access_token)) ){
          return;
        }
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);
  
  return (<Router>
      <Switch>
        <Route path="/artist/:artistId">
          <ArtistRoute />
        </Route>
        <Redirect to={`/artist/${DEFAULT_ARTIST_ID}`} />
      </Switch>
    <GlobalStyles />
  </Router>
  );
};

export default App;
