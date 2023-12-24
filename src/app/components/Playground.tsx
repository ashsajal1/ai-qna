'use client';
import { useState } from "react";

export default function Playground() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [context, setContext] = useState('')
    const [isLoadng, setIsLoading] = useState(false)

    async function getData(question: string, context: string) {
        const response = await fetch(
            "/api",
            {
                cache: "no-store",
                method: "POST",
                body: JSON.stringify({
                    "question": question,
                    "context": context
                }),
            }
        );

        const result = await response.json();
        setAnswer(result.answer)
    }

    const handleContext = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // console.log(e.target.value)
        setContext(e.target.value)
    }

    const handleQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)
        setQuestion(e.target.value)
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        // console.log("Submitted")
        await getData(question, context)
        setIsLoading(false)
    }

    return (
        <>
            <h1 className='text-xl md:text-3xl font-bold bg-gradient-to-tr from-blue-600 to-violet-600 text-transparent bg-clip-text'>AI Question answering</h1>

            <div className={`px-12 pt-4 w-full md:w-[650px] ${isLoadng ? "animate-pulse" : ""}`}>
                <p className="rounded border border-blue-400 p-6  bg-gradient-to-tr from-blue-600 to-violet-600 text-transparent bg-clip-text">
                    {answer ? (
                        <span> {isLoadng ? "Hold on! Answering question..." : answer}</span>
                    ) : (
                        <span>
                            {isLoadng ? "Hold on! Answering question..." : "Answer will appear here!"}
                        </span>
                    )}
                </p>
            </div>


            <div className="flex flex-col gap-2 px-12 pt-4 w-full md:w-[650px]">
                <textarea className="p-2 h-[300px] outline-none border rounded" value={context} onChange={handleContext} placeholder="Enter Context" />
                <input className="p-2 outline-none border rounded" value={question} onChange={handleQuestion} type="text" placeholder="Enter question" />
                <button disabled={isLoadng} className={`p-2 outline-none border rounded bg-gradient-to-tr from-blue-600 to-violet-600 text-slate-50 hover:to-violet-800 ${isLoadng ? "animate-pulse" : ""}`} onClick={handleSubmit}>Get Answer</button>
            </div>
        </>
    )
}
