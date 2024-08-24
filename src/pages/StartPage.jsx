
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useSubmit from "../hooks/useSubmit";

const StartPage = () => {
  const {
    setComplexity,
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

  const setComplexityHandler = (complexity) => {
    setComplexity(complexity);
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
        <div className="difficulties">
          <div
            className={`difficulty ${complexity === 1 && "active"}`}
            onClick={() => setComplexityHandler(1)}
          >
            1
          </div>
          <div
            className={`difficulty ${complexity === 2 && "active"}`}
            onClick={() => setComplexityHandler(2)}
          >
            2
          </div>
          <div
            className={`difficulty ${complexity === 3 && "active"}`}
            onClick={() => setComplexityHandler(3)}
          >
            3
          </div>
          <div
            className={`difficulty ${complexity === 4 && "active"}`}
            onClick={() => setComplexityHandler(4)}
          >
            4
          </div>
          <div
            className={`difficulty ${complexity === 5 && "active"}`}
            onClick={() => setComplexityHandler(5)}
          >
            5
          </div>
          <div
            className={`difficulty ${complexity === 6 && "active"}`}
            onClick={() => setComplexityHandler(6)}
          >
            6
          </div>
          <div
            className={`difficulty ${complexity === 7 && "active"}`}
            onClick={() => setComplexityHandler(7)}
          >
            7
          </div>
          <div
            className={`difficulty ${complexity === 8 && "active"}`}
            onClick={() => setComplexityHandler(8)}
          >
            8
          </div>
          <div
            className={`difficulty ${complexity === 9 && "active"}`}
            onClick={() => setComplexityHandler(9)}
          >
            9
          </div>
          <div
            className={`difficulty ${complexity === 10 && "active"}`}
            onClick={() => setComplexityHandler(10)}
          >
            10
          </div>
        </div>

        <button type="submit">Play</button>
        {loading && <Spinner />}
      </form>

      {scoreboard.length > 0 && (
        <div className="scoreboard-container">
          <h1>Scoreboard</h1>
          <table className="scoreboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Complexity</th>
              </tr>
            </thead>
            <tbody>
              {scoreboard
                .sort((a, b) => b.score - a.score)
                .map((score, index) => (
                  <tr key={index}>
                    <td>{score.name}</td>
                    <td>{Math.floor(score.score)}</td>
                    <td>{Number(score.complexity)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StartPage;
