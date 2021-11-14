import React from 'react';
import { Link } from 'react-router-dom';

const Info = () => {
  return (
    <div className="bg-white rounded-md  w-11/12 md:w-188 mb-8 mt-8">
      <h1 className="text-azureish-white font-bold text-4xl text-center p-5 rounded-tl-md rounded-tr-md mb-5 bg-purple-navy">How to Play Unscrambla</h1>
      <div className="p-5">
        <p className="text-center text-lg">Unscrambla is an online multiplayer game where two players battle it out to see who can unscramble the most English words within three (3) minutes. Think you have what it takes? Challenge your friends now!</p>
        <div className="info-container">
          <div className="info-number">1</div>
          <div className="info-text">A game is created by a host and a game code is generated.</div>
        </div>
        <div className="info-container">
          <div className="info-number">2</div>
          <div className="info-text">Host shares game code with the other player.</div>
        </div>
        <div className="info-container">
          <div className="info-number">3</div>
          <div className="info-text">Player visits the web app and enters the code.</div>
        </div>
        <div className="info-container">
          <div className="info-number">4</div>
          <div className="info-text">Players get 5 seconds to prepare.</div>
        </div>
        <div className="info-container">
          <div className="info-number">5</div>
          <div className="info-text">Game Starts. The intial scrambled word is displayed at the top of the messages area.</div>
        </div>
        <div className="info-container">
          <div className="info-number">6</div>
          <div className="info-text">After 180 seconds (3 minutes), game ends.</div>
        </div>
        <div className="info-container">
          <div className="info-number">7</div>
          <div className="info-text">Game result is displayed.</div>
        </div>
        <div className="info-container">
          <div className="info-number">8</div>
          <div className="info-text">Users can play again.</div>
        </div>
      </div>
      <div>
        <Link to='/play'>
          <button className="rounded-md p-3 bg-purple-navy text-white font-bold w-48 mb-6 block m-auto">HOST A GAME</button>
        </Link>
      </div>
    </div>
  )
}

export default Info;