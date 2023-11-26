"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

type Quiz = {
  question: string;
  answer: string;
  options: string[];
};

type Entry = {
  sentence: {
    sentence: string;
  };
  word: {
    word: string;
  };
};

export default function HomePage() {
  const router = useRouter();
  const correct = false;

  const [topEntries, setTopEntries] = useState<Entry[]>(
    JSON.parse(localStorage.getItem("top10Entries") ?? "[]") as Entry[],
  );
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const { data, isLoading } = useSWR(
    [selectedIdx, topEntries],
    async ([idx, topEntries]: [number, Entry[]]) => {
      if (topEntries.length === 0) return null;

      const { sentence, word } = topEntries[idx]!;

      const res = await fetch(
        "https://furiosa-server-vkfwbwiv6a-du.a.run.app/make-quiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sentence: sentence.sentence,
            word: word.word,
          }),
        },
      );

      const data = (await res.json()) as Quiz;

      return data;
    },
  );

  const onClickNext = () => {
    if (selectedIdx === 9) {
      router.push(`/result?correctCount=${correctCount + 1}`);
      return;
    }

    setSelectedIdx((prev) => prev + 1);
  };

  const onGuess = (selectedOption: string) => {
    if (selectedOption === data?.answer) {
      alert("Correct!");
      const correct = true;
      // setTimeout
      setCorrectCount((prev) => prev + 1);
    } else {
      alert("Wrong!");
    }
    onClickNext();
  };

  return (
    <main
      className={clsx("w-screen", "h-screen", "relative", "flex", "flex-col")}
    >
      <div className="navbar h-[100px] bg-base-100">
        <div className="navbar-start">
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn btn-circle btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-5xl">EYENG</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-circle btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="btn btn-circle btn-ghost">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>

              <span className="badge indicator-item badge-primary badge-xs"></span>
            </div>
          </button>
        </div>
      </div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
            {/* Sidebar content here */}
            <h5
              id="drawer-navigation-label"
              className="hidden text-base font-semibold uppercase text-gray-500 dark:text-gray-400"
            >
              Menu
            </h5>
            <li>
              <Link href="/">Main Page</Link>
            </li>
            <li>
              <Link href="/">Main Page</Link>
            </li>
          </ul>
        </div>
        <div></div>
      </div>

      <div className="prose mt-32 flex w-full flex-col items-center gap-y-4 border-black  px-[200px] text-black">
        <div className=" flex h-52 w-full items-center justify-center text-3xl font-extrabold">
          {data ? (
            <p>{data?.question}</p>
          ) : (
            <button className="btn-ghost loading mx-auto" />
          )}
        </div>
        {data?.options.map((option, idx) => (
          <button
            className="border-5 btn btn-active h-20 w-full rounded-lg border-black bg-base-300 px-12 text-start  text-[25px]"
            key={idx}
            onClick={() => onGuess(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={onClickNext}
        className="btn btn-active absolute bottom-0 mt-32 h-[60px] w-full text-[30px]"
      >
        Next
      </button>
    </main>
  );
}
