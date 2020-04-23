import React from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtistProfile } from '../../helpers/api-helpers';
import styled from 'styled-components';
import { requestAllArtistInfo, receiveArtistProfile, finishReceivingAllArtistInfo, receiveArtistError } from '../../actions';

const ArtistRoute = () => {
    const accessToken = useSelector(state => state.auth.token);
    const getArtistId = useParams();
    const artistId = Object.entries(getArtistId).map(([key,value])=>{
        return value.toString();
    })
    //fetchArtistProfile(accessToken, artistId);
    //console.log( fetchArtistProfile(accessToken, artistId));
    //console.log(useSelector(state => state.artists));
    // 1fsCfvdiomqjKJFR6xI8e4 -> to test another artist in the url param - works!
    
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!accessToken) {
          return;
        }
    
        dispatch(requestAllArtistInfo());
    
        const artistProfilePromise = fetchArtistProfile(accessToken, artistId).then(
          json => {
            dispatch(receiveArtistProfile(json));
          }
        );
    
        Promise.all([artistProfilePromise])
          .then(() => dispatch(finishReceivingAllArtistInfo()))
          .catch(err => {
            console.error(err);
            dispatch(receiveArtistError(err));
          });
      }, [accessToken, artistId]);

      //console.log(artistProfile);
      const artistProfile = useSelector(state => state.artists.currentArtist);

      if (!artistProfile) {
        // until artist actually loads:
        return 'Loading...';
      }
  
    //   Several images of the artist - TO FINISH

    // slice genres array at 2: 
    var size = 2;
    var items = artistProfile.genres.slice(0, size).map(i => {
        return <li key={i}>{i}</li>
    });
    // format followers number:
    // from: https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }

    return (
        <>
        <Wrapper>
          <Section>
            <div class="circular">
              <img src={artistProfile.images[0].url}></img>
            </div>
            <h1>{artistProfile.name}</h1>
            <p><span>{kFormatter(artistProfile.followers.total)}</span> followers</p>
          </Section>
          <Section>
            <h2>tags</h2>
            <ul>{items}</ul>
          </Section>
        </Wrapper>
        </>
      );
  };
  
const Wrapper = styled.div`
  padding: 59px 53px 45px 54px;
  background: #0B0F14;
  color: #FFFFFF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Section = styled.section`
  padding-bottom: 64px;
  position: relative;
  .circular {
    width: 175px;
    height: 175px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
  }
  .circular img {
    // https://stackoverflow.com/questions/26759594/css-circular-image-at-any-size
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  h1{
    position: absolute;
    font-size: 48px;
    line-height: 59px;
    font-weight: bold;
    font-family: Montserrat;
    font-style: normal;
    top: 77px;
    text-align: center;
    width: 100%;
  }
  p{
    text-align: center;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-transform: lowercase;
    padding-top: 23px;
  }
  span{
    color: #FF4FD8;
  }
  h2{
    text-align: center;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 21px;
    line-height: 26px;
    text-transform: lowercase;
  }
  ul{
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    li{
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 11px;
      line-height: 13px;
      text-transform: lowercase;
      background: rgba(75, 75, 75, 0.4);
      border-radius: 4px;
      padding: 8px 20px;
      margin: 23px 16px;
      min-width: 144px;
      min-height: 29px;
      text-align: center;
    }
  }
`;

export default ArtistRoute;