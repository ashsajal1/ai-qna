import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question, context } = await req.json();
  console.log(question, context)

  const response = await fetch(
    "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
    {
      headers: { Authorization: process.env.HUGGING_FACE_SECRET as string },
      method: "POST",
      body: JSON.stringify({
        inputs: {
          question,
          context,
        },
      }),
    }
  );

  const result = await response.json();
  // console.log(result)

  return NextResponse.json(result)
}
