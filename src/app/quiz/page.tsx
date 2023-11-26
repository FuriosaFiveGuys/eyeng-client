/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

"use client";

import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

// import { useEffect } from "react";

import { calibrate, seeso } from "../../utils/seeso";

import { useRouter } from "next/router";

type Quiz = {
  question: string;
  answer: string;
  options: string[];
};

type Entry = {
  sentence: string;
  word: string;
};

export default function HomePage() {
  const [topEntries, setTopEntries] = useState<Entry[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const [quize, setQuiz] = useState<Quiz>();

  console.log(selectedIdx);
  const onIncrease = () => {
    setSelectedIdx((idx) => idx + 1);
  };

  // const { data, isLoading } = useSWR(
  //   [selectedIdx, topEntries],
  //   async ([idx, topEntries]: [number, Entry[]]) => {
  //     if (topEntries.length === 0) return null;

  //     const { sentence, word } = topEntries[idx]!;

  //     const res = await fetch(
  //       "https://furiosa-server-vkfwbwiv6a-d,u.a.run.app/make-quiz",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           sentence,
  //           word,
  //         }),
  //       },
  //     );

  //     const data = (await res.json()) as Quiz;

  //     return data;
  //   },
  // );

  const fetchQuiz = async () => {
    if (topEntries.length === 0) return;

    const { sentence, word } = topEntries[selectedIdx]!;

    const res = await fetch(
      "https://furiosa-server-vkfwbwiv6a-d,u.a.run.app/make-quiz",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sentence,
          word,
        }),
      },
    );

    const data = (await res.json()) as Quiz;

    setQuiz(data);
  };

  const handleButtonClick = async (idx: number) => {
    setSelectedIdx(idx + 1);
    console.log(idx);
    // console.log(data);
  };

  useEffect(() => {
    const topEntriesString = localStorage.getItem("top10Entries");
    if (topEntriesString) {
      setTopEntries(JSON.parse(topEntriesString));
      void fetchQuiz();
    }
    setTopEntries([]);
  }, []);

  useEffect(() => {
    void fetchQuiz();
  }, [selectedIdx]);

  return (
    <main className={clsx("w-screen", "h-screen", "relative")}>
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
              d
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
          d
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
              className="text-base font-semibold uppercase text-gray-500 dark:text-gray-400"
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

      <div className="carousel w-full ">
        <div id="item1" className="carousel-item w-full">
          <div className="flex h-[1000px] w-full items-center bg-green-200 px-[200px]">
            <div className="grid w-full  gap-10 text-center">
              <div className=" h-64 bg-white">problem</div>
              <div className=" h-20 bg-white">problem</div>
              <div className=" h-20 bg-white">problem</div>
              <div className=" h-20 bg-white">problem</div>
              <div className=" h-20 bg-white">problem</div>
            </div>
          </div>
        </div>

        <div id="item2" className="carousel-item w-full">
          <div className="h-[1000px] w-full bg-green-200">hi</div>
        </div>

        <div id="item3" className="carousel-item w-full">
          <div className="h-[1000px] w-full bg-green-300">hi</div>
        </div>

        <div id="item4" className="carousel-item w-full">
          <div className="h-[1000px] w-full bg-green-400">hi</div>
        </div>

        <div id="item5" className="carousel-item w-full">
          <div className="h-[1000px] w-full bg-green-500">hi</div>
        </div>

        <div id="item6" className="carousel-item w-full">
          <div className="h-[1000px] w-full bg-green-600">hi</div>
        </div>

        <div id="item7" className="carousel-item w-full">
          <div className="h-[1000px] w-full bg-green-700">hi</div>
        </div>

        <div id="item8" className="carousel-item w-full">
          <div className="h-[1000px] w-full bg-green-800">hi</div>
        </div>

        <div id="item9" className="carousel-item w-full">
          <div className="h-[1000px] w-full bg-green-900">hi</div>
        </div>

        <div id="item10" className="carousel-item w-full">
          <div className="h-[1000px] w-full bg-green-300">hi</div>
        </div>
      </div>
      {/* <div className="flex w-full justify-center gap-2 py-2">
        {[...Array(10).keys()].map((idx) => (
          <a
            key={idx}
            href={`#item${idx + 1}`}
            onClick={() => handleButtonClick(idx)}
            className="btn btn-xs"
          >
            {idx + 1}
          </a>
        ))}
      </div> */}
      <button onClick={() => handleButtonClick(1)}>Next</button>
      {/* <div className="flex w-full justify-center gap-2 py-2">
        <a
          href="#item1"
          onClick={() => handleButtonClick(1)}
          className="btn btn-xs"
        >
          1
        </a>
        <a href="#item2" onClick={handleButtonClick} className="btn btn-xs">
          2
        </a>
        <a href="#item3" onClick={handleButtonClick} className="btn btn-xs">
          3
        </a>
        <a href="#item4" onClick={handleButtonClick} className="btn btn-xs">
          4
        </a>
        <a href="#item5" onClick={handleButtonClick} className="btn btn-xs">
          5
        </a>
        <a href="#item6" onClick={handleButtonClick} className="btn btn-xs">
          6
        </a>
        <a href="#item7" onClick={handleButtonClick} className="btn btn-xs">
          7
        </a>
        <a href="#item8" onClick={handleButtonClick} className="btn btn-xs">
          8
        </a>
        <a href="#item9" onClick={handleButtonClick} className="btn btn-xs">
          9
        </a>
        <a href="#item10" onClick={handleButtonClick} className="btn btn-xs">
          10
        </a>
      </div> */}
    </main>
  );
}
