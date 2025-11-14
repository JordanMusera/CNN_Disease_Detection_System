import express from "express";
import cors from "cors";
import { spawn } from "child_process";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.listen(5000, () => console.log("Node Server running on http://localhost:5000"));

app.post("/post", (req, res) => {
  const { model,image } = req.body;

  if (!image) {
    return res.status(400).json({ message: "No image provided" });
  }

  // Spawn Python process
   const modelPath = path.join(__dirname, "..", "trained_models", "tuberculosis_model.py");
   const pythonProcess = spawn("python3", [modelPath]);

  // Send input to Python
  pythonProcess.stdin.write(JSON.stringify({ input: image }));
  pythonProcess.stdin.end();

  let output = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("Python error:", data.toString());
  });

  pythonProcess.on("close", () => {
    try {
      const result = JSON.parse(output.trim());
      res.json(result);
    } catch (err) {
      console.error("JSON parse error:", err);
      res.status(500).json({ error: "Invalid response from Python script" });
    }
  });
});
