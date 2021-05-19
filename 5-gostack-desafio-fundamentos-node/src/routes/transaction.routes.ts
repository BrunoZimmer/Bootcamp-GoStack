import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    const transactionsList = { transactions, balance };

    return response.json(transactionsList);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, type, value } = request.body;
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );
    if (
      transactionsRepository.getBalance().total - value < 0 &&
      type === 'outcome'
    ) {
      return response.status(400).json({ error: 'Out of money' });
    }

    const transaction = createTransactionService.execute({
      title,
      type,
      value,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
