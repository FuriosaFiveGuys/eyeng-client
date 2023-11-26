"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { createClient } from "@supabase/supabase-js";

import type { ChangeEvent } from "react";

type MainPageProps = {
  searchParams: {
    calibrationData?: string;
  };
};

export default function index({ searchParams }: MainPageProps) {
  const router = useRouter();

  const onChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (input.files?.[0]) {
      const file = input.files[0];
      const supabase = createClient(
        "https://ugeaykndinohskzxlbfa.supabase.co/",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZWF5a25kaW5vaHNrenhsYmZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA5MjkzOTIsImV4cCI6MjAxNjUwNTM5Mn0.m1UuaGOEniBnxnrGZIKYBY0pE5IlpTtyP5DN7GR3nZQ",
      );

      const { data } = await supabase.storage
        .from("furiosa-image-upload")
        .upload(file.name, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (data) {
        const data_path =
          "https://ugeaykndinohskzxlbfa.supabase.co/storage/v1/object/public/furiosa-image-upload/" +
          data.path;
        console.log("hi");
        router.push(
          `/home?calibrationData=${searchParams.calibrationData}&imageUrl=${data_path}`,
        );
      }
    }
  };

  useEffect(() => {
    if (!searchParams.calibrationData) router.replace("/calib");
  }, []);

  return (
    <main>
      <div>
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-red-500">
          <div className=" flex-none ">
            <Image
              src="/logo_-_.png"
              alt="logo"
              className="h-[200px] w-[200px]"
              width="64"
              height="64"
            />
          </div>
          <div className="mt-8 flex-none">
            <a className="text-stroke btn btn-ghost text-[150px] normal-case text-white">
              FIVE GUYS EYENG
            </a>
          </div>
          <div
            className={clsx(
              "modal-box",
              "flex",
              "flex-col",
              "items-center",
              "justify-center",
              "mt-10",
            )}
          >
            <h3 className={clsx("text-3xl", "font-bold")}>
              Your 파일을 올려주세요
            </h3>

            <label
              htmlFor="dropzone-file"
              className={clsx(
                "flex",
                "flex-col",
                "items-center",
                "justify-center",
                "w-full",
                "mt-12",
                "h-64",
                "border-2",
                "border-gray-300",
                "border-dashed",
                "rounded-lg",
                "cursor-pointer",
                "bg-gray-50",
                "dark:hover:bg-bray-800",
                "dark:bg-gray-700",
                "hover:bg-gray-100",
                "dark:border-gray-600",
                "dark:hover:border-gray-500",
                "dark:hover:bg-gray-600",
              )}
            />
            <div
              className={clsx(
                "flex",
                "flex-col",
                "items-center",
                "justify-center",
                "pt-5",
                "pb-6",
              )}
            >
              <svg
                className={clsx(
                  "w-8",
                  "h-8",
                  "mb-4",
                  "text-gray-500",
                  "dark:text-gray-400",
                )}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p
                className={clsx(
                  "mb-2",
                  "text-sm",
                  "text-gray-500",
                  "dark:text-gray-400",
                )}
              >
                <span className={clsx("font-semibold")}>Click to upload</span>{" "}
                or drag and drop
              </p>
              <p
                className={clsx(
                  "text-xs",
                  "text-gray-500",
                  "dark:text-gray-400",
                )}
              >
                JSON (Only coco format)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept=".jpg"
              onChange={onChangeImg}
              className={clsx("hidden")}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
