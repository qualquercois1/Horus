import { listTransactions } from '../service/transactionService.js';

export async function getTransactions(req, res) {
  const result = await listTransactions(req.userId, req.validatedQuery);
  res.json(result);
}
