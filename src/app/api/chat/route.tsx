import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// CONFIGURATION
const API_KEY = process.env.UNI_API_KEY || "sk-cdcf6b22d0c841898118378ba6e47d2b";

// CORRECTION 1: Use the URL specified in Slide 80 + the 'chat' endpoint from Slide 84
const BASE_URL = "https://genai-01.uni-hildesheim.de/ollama/api/chat"; 

// CORRECTION 2: Use a recommended model from Slide 112
const MODEL_NAME = "qwen3:32b";

function loadFullContext(): string {
  try {
    const filePath = path.join(process.cwd(), "data.jsonl");
    if (!fs.existsSync(filePath)) return "";
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return fileContent
      .split("\n")
      .filter(line => line.trim())
      .map(line => {
        try {
          const j = JSON.parse(line);
          return `Title: ${j.title}\nContent: ${j.content}`;
        } catch { return ""; }
      })
      .join("\n\n");
  } catch (e) {
    return "";
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const fullContext = loadFullContext();

    const systemPrompt = `
    You are "Campus Compass AI". Use this context to answer:
    ${fullContext.slice(0, 20000)}
    `;

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}` // Slide 95
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        stream: false // CORRECTION 3: Slide 104 - Essential for simple JSON parsing
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`University API Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    
    // CORRECTION 4: Parse Ollama structure (data.message)
    let aiResponse = data.message?.content || "";

    // CORRECTION 5: Strip <think> tags as advised in Slide 121
    aiResponse = aiResponse.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

    return NextResponse.json({ role: "assistant", content: aiResponse });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}