export type WealthManagementGraphDataType =  {
  month: string;
  balance: number;
};

export type TransactionType = {
  id: number;
  date: string;
  merchant: string;
  status: string;
  amount: number;
  accounttype: string;
  user: string;
};