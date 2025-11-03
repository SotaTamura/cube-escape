"use client";

import { useAuth } from "@/app/context";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function AddStage() {
    const router = useRouter();
    const { user } = useAuth();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const codeRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: titleRef.current?.value,
                creatorId: user?.id,
                description: descriptionRef.current?.value,
                code: codeRef.current?.value,
            }),
        });
        router.push("/editor");
        router.refresh();
    };

    return (
        <>
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                    <p className="text-2xl font-bold p-3">新規作成</p>
                    <form onSubmit={handleSubmit}>
                        <input ref={titleRef} placeholder="タイトルを入力" type="text" className="rounded-md px-4 w-full py-2 my-2" />
                        <textarea ref={descriptionRef} placeholder="記事詳細を入力" className="rounded-md px-4 py-2 w-full my-2"></textarea>
                        <textarea ref={codeRef} placeholder="コードを入力" className="rounded-md px-4 py-2 w-full my-2"></textarea>
                        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">投稿</button>
                    </form>
                </div>
            </div>
        </>
    );
}
