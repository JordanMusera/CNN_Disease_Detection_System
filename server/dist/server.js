"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const child_process_1 = require("child_process");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "20mb" }));
app.listen(5000, () => console.log("Node Server running on http://localhost:5000"));
app.post("/post", (req, res) => {
    const { model, image } = req.body;
    if (!image) {
        return res.status(400).json({ message: "No image provided" });
    }
    // Spawn Python process
    const pythonProcess = (0, child_process_1.spawn)("python", [
        `C:\\Projects\\python\\deep_learning\\chest_xray_phneumonia_detection_CNN\\trained_models\\${model}_model.py`
    ]);
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
        }
        catch (err) {
            console.error("JSON parse error:", err);
            res.status(500).json({ error: "Invalid response from Python script" });
        }
    });
});
