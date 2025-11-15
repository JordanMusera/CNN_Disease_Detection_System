import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

const PYTHON_API_URL = "https://cnn-disease-detection-system-models.onrender.com";

app.listen(5000, () =>
  console.log("Node Server running on http://localhost:5000")
);

async function callPythonModel(model: string, imageBase64: string) {
  try {
    const response = await fetch(`${PYTHON_API_URL}/predict/${model}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_base64: imageBase64 }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Python API error: ${text}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error calling Python API:", err);
    return { status: "error", message: err || "Unknown error" };
  }
}

app.post("/post", async (req: Request, res: Response) => {
  const { model, image } = req.body;

  if (!image) {
    return res.status(400).json({ message: "No image provided" });
  }

  const result = await callPythonModel(model, image);
  res.json(result);
});
