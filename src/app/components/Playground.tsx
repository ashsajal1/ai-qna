'use client';
import { useState } from "react";
import Error from "./Error";

export default function Playground() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [context, setContext] = useState('')
    const [isLoadng, setIsLoading] = useState(false)
    const [error, setError] = useState('')

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
        if (result.error) {
            setError("The AI model is loading. Please try again in a few seconds.")
        } else {
            setError('')
            setAnswer(result.answer)
        }

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

    const handleExample = () => {
        setContext(`Albert Einstein (German: [ˈalbɛɐt ˈʔaɪnʃtaɪn]; 14 March 1879 – 18 April 1955) was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time. Best known for developing the theory of relativity, Einstein also made important contributions to quantum mechanics and was a central figure in the reshaping of the scientific understanding of nature in the early 20th century. His mass–energy equivalence formula E = mc², which arises from relativity theory, is often referred to as "the world's most famous equation." He received the 1921 Nobel Prize in Physics for his work on theoretical physics and the discovery of the law of the photoelectric effect, which was a crucial development in the field of quantum theory. Einstein's work also had a significant impact on the philosophy of science. In a 1999 poll of 130 leading physicists worldwide, Einstein was ranked as the greatest physicist of all time. His intellectual achievements and originality have made the name "Einstein" synonymous with genius.`)
        setQuestion("Who is Albert Einstein?")
    }

    return (
        <>
            <h1 className='text-xl md:text-3xl font-bold bg-gradient-to-tr from-blue-600 to-violet-600 text-transparent bg-clip-text'>AI Question answering</h1>

            <div className={`px-4 md:px-2 pt-4 w-full md:w-[650px] ${isLoadng ? "animate-pulse" : ""}`}>
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

            {error && (
                <Error errorText={error}></Error>
            )}


            <div className="flex flex-col gap-2 px-4 md:px-2 pt-4 w-full md:w-[650px] mb-[30px] md:mb-0 text-sm">
                <textarea className="p-2 h-[280px] outline-none border rounded" value={context} onChange={handleContext} placeholder="Enter Context" />
                <input className="p-2 outline-none border rounded" value={question} onChange={handleQuestion} type="text" placeholder="Enter question" />
                <button disabled={isLoadng} className={`p-2 outline-none border rounded bg-gradient-to-tr from-blue-600 to-violet-600 text-slate-50 hover:to-violet-800 ${isLoadng ? "animate-pulse" : ""}`} onClick={handleSubmit}>Get Answer</button>
                <button disabled={isLoadng} className={`p-2 outline-none border rounded text-slate-500`} onClick={handleExample}>See Example Usage</button>
            </div>
        </>
    )
}
