import { playRoulette } from '../service/rouletteService.js';

export async function playRouletteRound(req, res) {
  const result = await playRoulette({
    userId: req.userId,
    rawBet: req.validatedBody,
  });

  res.json(result);
}
