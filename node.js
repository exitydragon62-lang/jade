import { GoogleGenAI } from "@google/genai";
import express from "express";

const app = express();
app.use(express.json());

// O SDK lê a variável GEMINI_API_KEY automaticamente do ambiente (.env)
const ai = new GoogleGenAI();

app.post("/api/chat", async (req, res) => {
  const { mensagem } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: mensagem,
    });

    res.json({ resposta: response.text });
  } catch (error) {
    console.error("Erro na API:", error);
    res.status(500).json({ erro: "Mestre, o servidor respondeu com um erro." });
  }
});

app.listen(3000, () => {
  console.log("Servidor da Jade rodando na porta 3000");
});
