/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

"use client";

import { useEffect } from "react";

import { calibrate } from "../../utils/seeso";

export default function HomePage() {
  useEffect(() => {
    const init = async () => {
      calibrate("/");
    };
    void init();
  }, []);

  return <main></main>;
}
