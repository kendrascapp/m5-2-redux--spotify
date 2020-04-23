const initialState = {
    currentArtist: null,
    status: 'loading',
    error: null,
  };
  
  export default function artistsReducer(state = initialState, action) {
    switch (action.type) {
      case 'REQUEST_ARTIST_INFO': {
        return {
          ...state,
          status: 'loading',
        };
      }

      case 'RECEIVE_ARTIST_INFO': {
        return {
          ...state,
          currentArtist: action.profile,
          status: 'idle',
        };
      }

      case 'RECEIVE_ARTIST_ERROR': {
        return {
          ...state,
          status: 'error',
        };
      }
  
      case 'FINISH_RECEIVING_ALL_ARTIST_INFO': {
        return {
          ...state,
          status: 'idle',
        };
      }
  
      default: {
        return state;
      }
    }
  }