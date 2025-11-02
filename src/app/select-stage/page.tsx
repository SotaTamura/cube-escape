"use client";

import { STAGE_LEN } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LeftSvg, StageButton } from "../components";

export default function SelectStage() {
    const { user } = useAuth();
    const [completedStageIds, setCompletedStageIds] = useState<number[]>([]);

    useEffect(() => {
        if (!user) return;
        (async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${user.id}`, {
                    cache: "no-store",
                });
                if (!res.ok) {
                    setCompletedStageIds([]);
                    return;
                }
                const data = await res.json();
                setCompletedStageIds(data.user.completedStageIds || []);
            } catch (error) {
                console.error(error);
                setCompletedStageIds([]);
            }
        })();
    }, []);
    return (
        <div className="stageSelectScreen backGround">
            <Link className="btn back" href={"/"}>
                <LeftSvg />
            </Link>
            <div className="selectStageText">ステージを選択</div>
            <div className="stageWrapperContainer">
                <div className="stageWrapper">
                    {process.env.NODE_ENV === "development" && <StageButton i={0} key={0} isCompleted={completedStageIds.includes(0)} />}
                    {Array.from({ length: STAGE_LEN }, (_, k) => (
                        <StageButton i={k + 1} key={k + 1} isCompleted={completedStageIds.includes(k + 1)} />
                    ))}
                </div>
            </div>
        </div>
    );
}
