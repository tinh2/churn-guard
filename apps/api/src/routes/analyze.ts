import { Router, Request, Response } from "express";
import { analyzeCustomer, CustomerData } from "../services/claude";

const router = Router();

router.post("/customer", async (req: Request, res: Response): Promise<void> => {
  const data = req.body as CustomerData;

  if (!data.customerId) {
    res.status(400).json({ error: "customerId is required" });
    return;
  }

  try {
    const analysis = await analyzeCustomer(data);
    res.json(analysis);
  } catch (err) {
    console.error("Analysis failed:", err);
    res.status(500).json({ error: "Analysis failed" });
  }
});

export { router as analyzeRouter };
