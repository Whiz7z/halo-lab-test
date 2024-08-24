import { create } from "zustand";
import axios from "axios";

export const useStore = create((set, get) => ({
  name: "",
  complexity: "",
  playerId: "",
  token: "",
  coordinates: [],
  score: 0,
  scoreboard: JSON.parse(localStorage.getItem("scoreboard")) || [],

  setComplexity: (value) => set({ complexity: value }),
  setName: (value) => set({ name: value }),
  setPlayerId: async (value) => {
    console.log("value", value);
    await axios
      .post("https://cave-drone-server.shtoa.xyz/init", {
        name: value.name,
        complexity: value.difficulty,
      })
      .then((res) => {
        console.log(res);
        set({ playerId: res.data.id });
      });
  },
  setToken: async (value) => {
    set({ token: value });
  },

  setCoordinates: (value) => {
    console.log("value", value);
    const [left, right] = value.split(",").map(Number);
    set((state) => ({
      coordinates: [...state.coordinates, [left, right]],
    }));
  },

  incrementScore: (increment) =>
    set((state) => ({ score: state.score + increment })),

  setScore: () => {
    //persist scorebord in local storage [{name: "", score: 0}, {name: "", score: 0}]

    console.log("get scoreboard", get().score);

    set((state) => ({
      scoreboard: [
        ...state.scoreboard,
        { name: get().name, score: get().score, complexity: get().complexity },
      ],
    }));

    localStorage.setItem("scoreboard", JSON.stringify(get().scoreboard));
  },

  clearScore: () => set(() => ({ score: 0 })),
}));
