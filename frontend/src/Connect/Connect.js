import React from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../Auth';
import './Connect.css';

function Connect(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  return (
    <div className='connectBox'>
      <img
        src='https://i.pinimg.com/originals/27/ff/ef/27ffef483a50588e27e9d86d4cbd55fb.png'
        alt='game logo'
      />

      {!auth0Client.isAuthenticated() ? (
        <div>
          <hr />
          <p> Welcome to this multiplayer game built upon React. </p>
          <p> To play, connect below.</p>
          <hr />

          <button onClick={auth0Client.signIn}>Connect</button>
        </div>
      ) : (
        <div>
          <hr />
          <p> Welcome back, {auth0Client.getProfile().name}! </p>
          <p> To go to the game screen, click the button below</p>
          <hr />

          <button
            onClick={() => {
              props.history.push('/game');
            }}
          >
            {' '}
            Play{' '}
          </button>

          <button
            className='exit-buttton'
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
export default withRouter(Connect);
