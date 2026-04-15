import { getWalletOverview } from '../service/walletService.js';

export async function getWallet(req, res) {
  const overview = await getWalletOverview(req.userId);
  res.json(overview);
}
