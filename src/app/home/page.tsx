/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

"use client";

import clsx from "clsx";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

import { seeso } from "../../utils/seeso";

import type dummyData from "@/assets/dummy.json";

type ImageToTextResult = typeof dummyData;

const focusCount: Record<string, number> = {};

type HomePageProps = {
  searchParams: {
    calibrationData: string;
    imageUrl: string;
  };
};

export default function HomePage({ searchParams }: HomePageProps) {
  // const router = useRouter();
  const { calibrationData, imageUrl } = searchParams;
  // // 현재 경로에 'quiz'를 추가합니다.
  // const quizPath = `${router.asPath}/quiz`;

  const { data, isLoading } = useSWR(imageUrl, async (url) => {
    const res = await fetch(
      "https://furiosa-server-vkfwbwiv6a-du.a.run.app/image-to-text",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: url }),
      },
    );

    const data = (await res.json()) as ImageToTextResult;

    return data;
  });

  const [focusedId, setFocusedId] = useState<string>();

  // 기존의 dictionary 객체

  if (focusedId && focusedId !== "seeso-canvas") {
    if (focusCount[focusedId] !== undefined) {
      focusCount[focusedId] += 1;
    } else {
      focusCount[focusedId] = 0;
    }
  }

  const showGazeDotOnDom = (gazeInfo: any) => {
    const canvas = document.getElementById("seeso-canvas") as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "#FF0000";
    }

    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx?.beginPath();
    ctx?.arc(gazeInfo.x, gazeInfo.y, 10, 0, Math.PI * 2, true);
    ctx?.fill();

    const currentFocusedId =
      isFinite(gazeInfo.x) &&
      isFinite(gazeInfo.y) &&
      (document.elementFromPoint(gazeInfo.x, gazeInfo.y) as HTMLSpanElement)
        ?.id;

    if (currentFocusedId && focusedId !== currentFocusedId) {
      setFocusedId(currentFocusedId);
    }
  };

  function getTop10Entries() {
    // 사전의 항목을 배열로 변환하고, 값에 따라 내림차순 정렬
    const sortedEntries = Object.entries(focusCount).sort(
      (a, b) => b[1] - a[1],
    ); // b[1] - a[1]는 내림차순 정렬

    // 상위 10개 항목만 선택
    return sortedEntries.slice(0, 10);
  }

  // 버튼 클릭 이벤트 핸들러
  function onButtonClick() {
    const top10Entries = getTop10Entries();

    if (top10Entries.length < 10) {
      alert("단어를 더 많이 보세요!");
      return;
    }

    if (data?.sentences) {
      const quizData = top10Entries.map((ent) => {
        const [id] = ent;
        // const [_, sentIdx, __, wordIdx] = id.split("-");
        const splitted = id.split("-") as [string, string, string, string];
        const sentIdx = splitted[1];
        const wordIdx = splitted[3];
        const sentence = data.sentences[parseInt(sentIdx)];
        const word = sentence!.words[parseInt(wordIdx)];

        return {
          sentence,
          word,
        };
      });

      localStorage.setItem("top10Entries", JSON.stringify(quizData));
    }
  }

  useEffect(() => {
    const parsedConfig = JSON.parse(calibrationData);

    seeso.init(
      "dev_6rrd63vcmgu99crhz8h23l4vuode23n7os1g109q",
      async () => {
        seeso.setCalibrationData(parsedConfig);
        seeso.setCameraPosition(window.outerWidth / 2, true);
        seeso.startTracking(showGazeDotOnDom);
      }, // callback when init succeeded.
      () => console.log("callback when init failed."), // callback when init failed.
    );

    return () => {
      seeso.stopTracking();
      // hideGazeDotOnDom();
    };
  }, []);

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
      <div className="relative grid">
        <canvas
          id="seeso-canvas"
          className={clsx("absolute", "top-0", "left-0", "border")}
        ></canvas>

        <div
          className={clsx(
            "flex",
            "absolute",
            "inset-0",
            "p-10",
            "top-0",
            "left-0",
            "flex-wrap",
            "gap-x-10",
            "gap-y-0",
          )}
        >
          {data?.sentences.map((sentence, s_index) => {
            return (
              <Fragment key={s_index}>
                {sentence.words.map((word, w_index) => {
                  const id = `sent-${s_index}-word-${w_index}`;

                  return (
                    <span
                      id={id}
                      key={w_index}
                      className={clsx(
                        "text-[3rem]",
                        "leading-[5rem]",
                        "font-semibold",
                        "cursor-pointer",
                        "border-black",
                        id === focusedId,
                      )}
                    >
                      {word.word}
                    </span>
                  );
                })}
              </Fragment>
            );
          })}
          <label
            htmlFor="my_modal_6"
            className="btn fixed bottom-[200px] right-[200px] h-[100px] w-[300px] text-3xl"
            onClick={onButtonClick}
          >
            Quiz
          </label>
        </div>
      </div>
      {/* <label htmlFor="my_modal_6" className="btn">open modal</label> */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">모르는 단어 추출을 완료했습니다.</p>
          <div className="modal-action">
            <button className="btn">
              <Link href="/quiz">Solve Quiz</Link>
            </button>
          </div>
        </div>
      </div>

      <input
        type="checkbox"
        id="my_modal_7"
        className="modal-toggle"
        readOnly
        checked={isLoading}
      />
      <div className="modal" role="dialog">
        <div className="modal-box flex h-[400px] w-[500px] flex-col items-center justify-center ">
          <span className="loading loading-bars w-[100px]"></span>
          <p className="py-4">지문을 불러오고 있습니다. 잠시 기다려주세요</p>
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
              <Link href="/quiz">Quiz</Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
