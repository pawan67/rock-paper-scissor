import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "../context/userContext";
import party from "party-js";
import { IconContainer } from "../pages";
import { motion } from "framer-motion";
// import Confetti from "./Confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
const Result = () => {
  const { width, height } = useWindowSize();

  const {
    iconId,
    computerChoosed,
    setComputerChoosed,
    computerChoosedNumber,
    setView,
    score,
    setScore,
  } = useUserContext();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();
  const [confett, setConfett] = useState(false);
  const winRef = useRef(null);
  const loseRef = useRef(null);
  useEffect(() => {
    if (score >= 5) {
      window.location.href = "https://www.youtube.com/watch?v=GtL1huin9EE";
    }

    const random = Math.floor(Math.random() * (3 - 1) + 1);

    computerChoosedNumber = random;
    const randomChoose = () => {
      console.log("random", random);
      setComputerChoosed(random);
      setLoading(false);
      console.log("You : ", iconId);
      console.log("Computer : ", random && random);
      if (iconId == random) {
        console.log("Tied");
        setResult("Tied");
        navigator.vibrate(100);
        loseRef.current.play();
      } else if (iconId == 1 && random == 2) {
        console.log("loss");
        setResult("loss");
        navigator.vibrate(100);
        setScore(score - 1);
        // loseRef.current.play();
      } else if (iconId == 2 && random == 3) {
        console.log("loss");
        setScore(score - 1);
        navigator.vibrate(100);
        // loseRef.current.play();

        setResult("loss");
      } else if (iconId == 3 && random == 1) {
        console.log("loss");
        setResult("loss");
        setScore(score - 1);
        navigator.vibrate(100);
        // loseRef.current.play();
      } else {
        setScore(score + 1);
        navigator.vibrate(100);
        console.log("win");
        setResult("win");
        setConfett(true);
        winRef.current.play();
      }
    };

    setTimeout(randomChoose, 2000);
  }, []);
  return (
    <>
      <audio ref={loseRef} src="/mixkit-circus-lose-2030.wav"></audio>
      <audio ref={winRef} src="/mixkit-retro-game-notification-212.wav"></audio>
      <div className=" max-w-4xl mx-auto mt-20 flex justify-between">
        <div className=" flex justify-center flex-col items-center">
          <div className=" text-white my-10 md:text-3xl text-2xl font-bold uppercase ">
            You Picked
          </div>
          <IconContainer iconId={iconId} />
        </div>
        {result && (
          <div className=" hidden md:block mt-20  mx-auto ">
            <div className=" text-6xl uppercase font-bold rounded-md p-3 text-white text-center mt-10">
              YOu {result && result}
            </div>
            <div
              onClick={() => setView("first")}
              className=" text-xl bg-white rounded-md p-3 text-blue-900 text-center mt-5 font-medium uppercase cursor-pointer "
            >
              play Again
            </div>
          </div>
        )}
        <div className=" flex justify-center flex-col items-center">
          <div className=" text-white my-10 md:text-3xl text-2xl font-bold uppercase ">
            House picked
          </div>

          {loading ? (
            <div className=" relative flex justify-center items-center">
              <div className="   w-40 bg-black/70 aspect-square rounded-full  ">
                <div className=" absolute  w-40 animate-ping bg-gray-500 aspect-square rounded-full  "></div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ rotate: 120, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
            >
              <IconContainer iconId={computerChoosed} />
            </motion.div>
          )}
        </div>
      </div>
      {result && (
        <motion.div className=" md:hidden mt-10  mx-auto ">
          <motion.div
            id="result"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className=" text-6xl uppercase font-bold rounded-md p-3 text-white text-center mt-10"
          >
            YOu {result && result}
          </motion.div>
          <motion.div
            initial={{ scale: 0, translateY: 100 }}
            animate={{ rotate: 0, scale: 1, translateY: 0 }}
            onClick={() => {
              navigator.vibrate(100);
              setView("first");
            }}
            className=" text-xl bg-white rounded-md p-3 text-blue-900 text-center mt-5 font-medium uppercase cursor-pointer "
          >
            play Again
          </motion.div>
        </motion.div>
      )}
      {confett && <Confetti width={width} height={height} />}
    </>
  );
};

export default Result;
