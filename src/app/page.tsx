/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

"use client";

import { useEffect } from "react";

import { calibrate, seeso } from "../utils/seeso";

export default function HomePage() {
  useEffect(() => {
    const init = async () => {
      calibrate("/home");
      await seeso.init(
        "dev_6rrd63vcmgu99crhz8h23l4vuode23n7os1g109q",
        () => {
          console.log("Seeso initialized");
        },
        () => {
          console.log("Seeso failed to initialize");
        },
      );
    };
    void init();
  }, []);

  return <main></main>;
}
