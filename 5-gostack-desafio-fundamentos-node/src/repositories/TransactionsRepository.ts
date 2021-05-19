import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = { income: 0, outcome: 0, total: 0 };

    balance.income = this.transactions.reduce(((income, transaction) => {
      if (transaction.type === 'income') {
        balance.total += transaction.value;
        return transaction.value + income;
      }
      balance.total -= transaction.value;
      balance.outcome += transaction.value;
      return income;
    }), 0);

    if (balance.total < 0) {
      throw Error('No Found');
    }
    return balance;
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    const total: number = this.transactions.reduce(((Total, transactionValues) => {
        if (transactionValues.type === 'income') {
          return transactionValues.value + Total;
        }
        return total - transactionValues.value;
    }), 0);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
