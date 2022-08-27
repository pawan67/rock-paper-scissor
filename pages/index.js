import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Result from "../components/Result";
import { useUserContext } from "../context/userContext";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
export default function Home() {
  const { view, setView, iconId, score } = useUserContext();
  const handleFirst = () => {
    console.log("googli");
  };
  return (
    <div className=" overflow-x-hidden bg-grad p-5 min-h-screen md:pt-20">
      <div>
        <ScoreBoard />
        {view == "first" && (
          <motion.div
            initial={{ rotate: 90 }}
            animate={{ rotate: 0 }}
            className=" mt-40 relative mx-auto w-56 md:w-80 aspect-square  "
          >
            <img src="/images/bg-triangle.svg" alt="" />
            <div className=" absolute -top-20 -left-20">
              <IconContainer iconId={1} />
            </div>

            <div className=" absolute -top-20 -right-20">
              <IconContainer iconId={2} />
            </div>

            <div className=" absolute -bottom-16 -right-[49px] md:right-0 -translate-x-[50%]">
              <IconContainer iconId={3} />
            </div>
          </motion.div>
        )}
        {view == "second" && <Result />}
      </div>
    </div>
  );
}

const ScoreBoard = () => {
  const { view, setView, iconId, score } = useUserContext();
  return (
    <div className=" mx-auto  max-w-4xl border-4 rounded-2xl p-6 border-gray-500 flex justify-between ">
      <img src="/images/logo.svg" alt="" />
      <div className=" aspect-square w-28 flex flex-col items-center justify-center bg-white rounded-lg p-3">
        <div className=" tracking-widest text-blue-800 font-bold ">SCORE</div>
        <div className=" text-gray-700 text-5xl font-bold">{score}</div>
      </div>
    </div>
  );
};

export const IconContainer = ({ iconId, onClick }) => {
  const { setIconId, setView } = useUserContext();
  let src = "";
  let color;
  if (iconId == 1) {
    src = "/images/icon-paper.svg";
    color = "border-red-500";
  } else if (iconId == 2) {
    src = "/images/icon-scissors.svg";
    color = "border-green-500";
  } else if (iconId == 3) {
    src = "/images/icon-rock.svg";
    color = "border-yellow-500";
  }
  const select = () => {
    setIconId(iconId);
    setView("second");
  };
  return (
    <div
      onClick={select}
      className={`bg-white m-0 flex justify-center items-center w-40 aspect-square rounded-full border-[20px] ${color} cursor-pointer`}
    >
      <img className=" " src={src} alt="" />
    </div>
  );
};
