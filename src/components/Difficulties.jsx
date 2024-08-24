import { useStore } from "../store/store";

const Difficulties = () => {

  const { complexity, setComplexity } = useStore();

  return (
    <div className="difficulties">
      <div
        className={`difficulty ${complexity === 1 && "active"}`}
        onClick={() => setComplexity(1)}
      >
        1
      </div>
      <div
        className={`difficulty ${complexity === 2 && "active"}`}
        onClick={() => setComplexity(2)}
      >
        2
      </div>
      <div
        className={`difficulty ${complexity === 3 && "active"}`}
        onClick={() => setComplexity(3)}
      >
        3
      </div>
      <div
        className={`difficulty ${complexity === 4 && "active"}`}
        onClick={() => setComplexity(4)}
      >
        4
      </div>
      <div
        className={`difficulty ${complexity === 5 && "active"}`}
        onClick={() => setComplexity(5)}
      >
        5
      </div>
      <div
        className={`difficulty ${complexity === 6 && "active"}`}
        onClick={() => setComplexity(6)}
      >
        6
      </div>
      <div
        className={`difficulty ${complexity === 7 && "active"}`}
        onClick={() => setComplexity(7)}
      >
        7
      </div>
      <div
        className={`difficulty ${complexity === 8 && "active"}`}
        onClick={() => setComplexity(8)}
      >
        8
      </div>
      <div
        className={`difficulty ${complexity === 9 && "active"}`}
        onClick={() => setComplexity(9)}
      >
        9
      </div>
      <div
        className={`difficulty ${complexity === 10 && "active"}`}
        onClick={() => setComplexity(10)}
      >
        10
      </div>
    </div>
  );
}

export default Difficulties
