"use client";

import { StageType } from "@/constants";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

export default function Overview({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const [stage, setStage] = useState<StageType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stage/${id}`
        );
        const data = await res.json();
        setStage(data.stage);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  return (
    <div className="w-full m-auto flex my-4">
      <Link
        href={"/online-stages"}
        className="w-20 text-center rounded-md p-2 m-auto bg-slate-300 font-semibold"
      >
        戻る
      </Link>
      <div className="flex flex-col justify-center items-center m-auto">
        <div>{stage?.title}</div>
        <div>{stage?.creatorName}</div>
        <div>{stage?.description}</div>
        <div>{stage?.code}</div>
      </div>
    </div>
  );
}
