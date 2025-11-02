"use client";

import { StageType } from "@/constants";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useRef } from "react";

export default function EditStage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = use(params);
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const codeRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stage/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
                title: titleRef.current?.value,
                description: descriptionRef.current?.value,
                code: codeRef.current?.value,
            }),
        });
        router.push("/editor");
        router.refresh();
    };
    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stage/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        router.push("/editor");
        router.refresh();
    };
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stage/${id}`);
                const data = await res.json();
                const stage: StageType = data.stage;
                if (titleRef.current && descriptionRef.current && codeRef.current) {
                    titleRef.current.value = stage.title;
                    descriptionRef.current.value = stage.description;
                    codeRef.current.value = stage.code;
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [id]);

    return (
        <>
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                    <p className="text-2xl font-bold p-3">編集</p>
                    <form>
                        <input ref={titleRef} placeholder="タイトルを入力" type="text" className="rounded-md px-4 w-full py-2 my-2" />
                        <textarea ref={descriptionRef} placeholder="記事詳細を入力" className="rounded-md px-4 py-2 w-full my-2"></textarea>
                        <textarea ref={codeRef} placeholder="コードを入力" className="rounded-md px-4 py-2 w-full my-2"></textarea>
                        <button onClick={handleSubmit} className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                            更新
                        </button>
                        <button onClick={handleDelete} className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
                            削除
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
