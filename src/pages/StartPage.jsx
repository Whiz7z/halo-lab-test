import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useSubmit from "../hooks/useSubmit";
import Scoreboard from "../components/Scoreboard";
import Difficulties from "../components/Difficulties";

const StartPage = () => {
  const {
    setCoordinates,
    playerId,
    token,
    scoreboard,
    complexity,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { submitInitialRequest } = useSubmit();
  const WS_URL = "wss://cave-drone-server.shtoa.xyz/cave";
  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => false,
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    await submitInitialRequest(complexity, name);
  };

  useEffect(() => {
    if (readyState === ReadyState.OPEN && token && playerId) {
      console.log("token", token, "playerId", playerId);
      sendMessage(`player:${playerId}-${token}`);
    }

    if (readyState === ReadyState.CLOSED) {
      console.log("connection closed, trying to reconnect");
    }
  }, [readyState, token, playerId, sendMessage, navigate]);

  useEffect(() => {
    console.log(`Got a new message: ${lastMessage}`);

    if (lastMessage && lastMessage.data !== "finished") {
      setCoordinates(lastMessage.data);
    }

    if (lastMessage && lastMessage.data === "finished") {
      setLoading(false);

      navigate("/game");
    }
  }, [lastMessage, setCoordinates, navigate]);

  return (
    <div className="container">
      <form action="" onSubmit={(e) => onSubmitHandler(e)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <label htmlFor="difficulty">Difficulty</label>

        <Difficulties />
        <button type="submit">Play</button>
        {loading && <Spinner />}
      </form>

      <Scoreboard scoreboard={scoreboard} />
    </div>
  );
};

export default StartPage;
