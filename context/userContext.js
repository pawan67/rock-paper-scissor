import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);
export const UserContextProvider = ({ children }) => {
  const [view, setView] = useState("first");
  const [iconId, setIconId] = useState();
  const [computerChoosed, setComputerChoosed] = useState();
  const [score, setScore] = useState(0);
  let computerChoosedNumber;

  useEffect(() => {
    // window.localStorage.setItem("score", score);
    // console.log(window.localStorage.getItem("score"));
    // setScore(window.localStorage.getItem("score"));
  }, [score]);

  const contextValue = {
    view,
    setView,
    iconId,
    setIconId,
    computerChoosed,
    setComputerChoosed,
    computerChoosedNumber,
    score,
    setScore,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
