/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import dummyData from "@/assets/dummy.json";

import { seeso } from "../../utils/seeso";

export default function HomePage() {
  const searchParams = useSearchParams();

  const [focusedId, setFocusedId] = useState<string>();

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

  function hideGazeDotOnDom() {
    const canvas = document.getElementById("output") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  }

  useEffect(() => {
    if (searchParams.has("calibrationData")) {
      const calibrationData = searchParams.get("calibrationData");
      if (calibrationData) {
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
      }
    }
  }, []);

  return (
    <main className={clsx("w-screen", "h-screen", "relative")}>
      <canvas
        id="seeso-canvas"
        className={clsx("absolute", "top-0", "left-0")}
      ></canvas>
      <div
        className={clsx(
          "flex",
          "absolute",
          "inset-0",
          "p-10",
          "flex-wrap",
          "gap-x-10",
          "gap-y-0",
        )}
      >
        {dummyData.sentences.map((sentence, s_index) => {
          return (
            <Fragment key={s_index}>
              {sentence.words.map((word, w_index) => {
                const id = `sent-${s_index}-word-${w_index}`;

                return (
                  <span
                    id={id}
                    key={w_index}
                    className={clsx(
                      "text-[4.5rem]",
                      "leading-[8rem]",
                      "font-semibold",
                      "cursor-pointer",
                      "border",
                      "border-black",
                      id === focusedId && "bg-red-500",
                    )}
                  >
                    {word.word}
                  </span>
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </main>
  );
}
