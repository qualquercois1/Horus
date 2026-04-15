import assert from 'node:assert/strict';
import test from 'node:test';

import { listTransactions } from '../src/service/transactionService.js';

test('listTransactions returns items with pagination metadata', async () => {
  const calls = [];
  const db = {
    transaction: {
      count: async ({ where }) => {
        calls.push({ method: 'count', where });
        return 25;
      },
      findMany: async (args) => {
        calls.push({ method: 'findMany', args });
        return [
          { id: 1, userId: args.where.userId, amountCents: 100 },
          { id: 2, userId: args.where.userId, amountCents: -50 },
        ];
      },
    },
  };

  const result = await listTransactions(9, { page: 2, pageSize: 10 }, db);

  assert.equal(result.items.length, 2);
  assert.deepEqual(result.pagination, {
    page: 2,
    pageSize: 10,
    totalItems: 25,
    totalPages: 3,
    hasNextPage: true,
    hasPreviousPage: true,
  });
  assert.deepEqual(calls[1].args, {
    where: { userId: 9 },
    orderBy: { createdAt: 'desc' },
    skip: 10,
    take: 10,
  });
});
