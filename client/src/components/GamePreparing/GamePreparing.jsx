import { useTimer } from 'react-timer-hook';

const GamePreparing = ({ name, opponentName }) => {
  const { seconds } = useTimer({
    expiryTimestamp: new Date(Date.now() + 1000 * 5),
  });
  return (
    <div className="bg-white rounded-md  w-11/12 sm:w-120">
      <p className="text-azureish-white font-bold text-4xl text-center p-5 rounded-tl-md rounded-tr-md mb-5 bg-purple-navy">
        Ready!
      </p>
      <div className="flex justify-between p-5">
        <div className="w-5/12">
          <small>You</small>
          <p className="font-bold text-2xl">{name}</p>
        </div>
        <div className="flex-grow text-center font-bold">vs</div>
        <div className="w-5/12 text-right">
          <small>Opponent</small>
          <p className="font-bold text-2xl">{opponentName}</p>
        </div>
      </div>
      <div className="animate-bounce font-bold text-6xl m-auto mt-12 mb-12 p-6 rounded-full w-28 h-28 border-4 border-sage text-center flex justify-center items-center">
        <span>{seconds}</span>
      </div>
    </div>
  );
};

export default GamePreparing;
