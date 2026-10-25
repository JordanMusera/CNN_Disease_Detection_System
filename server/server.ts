import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    const allowed = !origin || origin === "https://cnn-disease-detection-system-client.onrender.com" ||
      /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin) ||
      (process.env.CLIENT_ORIGINS || "").split(",").map((item) => item.trim()).includes(origin);
    callback(null, allowed);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json({ limit: "50mb" }));

const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://127.0.0.1:8000";

const port = Number(process.env.PORT || 5000);
app.listen(port, () =>
  console.log(`Node Server running on http://localhost:${port}`)
);

async function callPythonModel(model: string, imageBase64: string) {
  try {
    const response = await fetch(`${PYTHON_API_URL}/predict/${model}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_base64: imageBase64 }),
    });
    const responseText = await response.text();
    let data: any;
    try {
      data = JSON.parse(responseText);
    } catch {
      const detail = responseText.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 300);
      throw new Error(`Model service returned HTTP ${response.status}${detail ? `: ${detail}` : " with an unreadable response."}`);
    }
    if (!response.ok) {
      throw new Error(data.detail || data.message || `Model service returned HTTP ${response.status}.`);
    }
    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown model service error.";
    console.error("Error calling model service:", message);
    return { status: "error", message };
  }
}

app.post("/post", async (req: Request, res: Response) => {
  const { model, image } = req.body || {};
  const supportedModels = ["bone_fracture", "lung_cancer", "pneumonia", "tuberculosis"];
  if (!supportedModels.includes(model)) {
    return res.status(400).json({ status: "error", message: "Choose a supported disease model." });
  }
  if (typeof image !== "string" || !image.startsWith("data:image/") || !image.includes(",")) {
    return res.status(400).json({ status: "error", message: "Upload a valid image file and try again." });
  }
  const result = await callPythonModel(model, image);
  res.status(result.status === "error" ? 502 : 200).json(result);
});

app.use((err: any, _req: Request, res: Response, _next: any) => {
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ status: "error", message: "Image is too large to upload. Please choose an image smaller than about 36 MB." });
  }
  console.error("API request error:", err);
  return res.status(400).json({ status: "error", message: "The request could not be processed." });
});