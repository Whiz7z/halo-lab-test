import { useStore } from "../store/store";
import axios from "axios";

const useSubmit = () => {
  const {
    setToken,
    setPlayerId,
    setName,
    setComplexity,
    
  } = useStore();


  const submitInitialRequest = async (difficulty, name) => {
     let token = "";
     console.log("difficulty", difficulty);
     setName(name);
     setComplexity(difficulty);

     await setPlayerId({ name: name, difficulty: Number(difficulty) });
     const updatedPlayerId = useStore.getState().playerId;

     for (let i = 0; i < 4; i++) {
       await axios
         .get(
           `https://cave-drone-server.shtoa.xyz/token/${
             i + 1
           }/?id=${updatedPlayerId}`
         )
         .then((res) => {
           token += res.data.chunk;
           console.log(token);
         });
     }
     console.log("token", token);
     setToken(token);
  }

  return { submitInitialRequest };
};

export default useSubmit;
