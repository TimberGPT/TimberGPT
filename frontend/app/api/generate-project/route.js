export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
  }

  const { prompt } = await request.json();

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Generate a project plan based on this description: "${prompt}"

You must respond with ONLY a valid JSON object in this exact format (no additional text or formatting):
{
  "projectName": "string (max 100 chars)",
  "description": "detailed string",
  "category": "one of: Web Development, Mobile App, UI/UX Design, Branding, Marketing, Content Creation, SEO, Other",
  "status": "Active",
  "priorityLevel": "one of: Low, Medium, High, Critical",
  "dueDate": "YYYY-MM-DD format date"
}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      topK: 1,
      topP: 1,
      maxOutputTokens: 1024,
    },
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.error("API Error:", json);
      return Response.json(
        {
          error: json.error?.message || "Unknown error",
          details: json,
        },
        { status: response.status }
      );
    }

    const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text) {
      return Response.json(
        { error: "Empty response from AI" },
        { status: 422 }
      );
    }

    try {
      // Try to clean the response if needed
      const cleanText = text.replace(/```json\n|\n```/g, "").trim();
      const parsed = JSON.parse(cleanText);

      // Validate required fields
      if (
        !parsed.projectName ||
        !parsed.description ||
        !parsed.category ||
        !parsed.status ||
        !parsed.priorityLevel ||
        !parsed.dueDate
      ) {
        return Response.json(
          { error: "Missing required fields in AI response", raw: cleanText },
          { status: 422 }
        );
      }

      return Response.json(parsed);
    } catch (parseError) {
      console.error("Parse Error:", parseError, "\nRaw Text:", text);
      return Response.json(
        {
          error: "Invalid JSON in AI response",
          raw: text,
          parseError: parseError.message,
        },
        { status: 422 }
      );
    }
  } catch (err) {
    console.error("Unexpected Error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
