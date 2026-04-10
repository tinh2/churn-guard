import { Router, Request, Response } from "express";
import { sendWinbackEmail, WinbackEmailOptions } from "../services/sendgrid";

const router = Router();

router.post("/winback", async (req: Request, res: Response): Promise<void> => {
  const options = req.body as WinbackEmailOptions;

  if (!options.to || !options.subject || !options.body) {
    res.status(400).json({ error: "to, subject, and body are required" });
    return;
  }

  try {
    await sendWinbackEmail(options);
    res.json({ sent: true });
  } catch (err) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: "Email send failed" });
  }
});

export { router as emailRouter };
