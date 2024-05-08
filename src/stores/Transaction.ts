import { createStore } from 'zustand/vanilla';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Profile } from '@/pages/profile';

export interface TransactionResponse {
  success: boolean
  message: string
  data: Transaction[]
}

export interface Transaction {
  transaction_date_due: string
  amount_incl: number
  currency: string
  status: string
  refrence_external: any
  transaction_method: any
  portal_subscription_id: number
  id: number
  date_updated: string
  amount_excl: number
  transaction_date: string
  transaction_type: string
  reference: string
  transaction_description: string
  portal_end_customer_id: number
  portal_product_id: any
  date_created: string
}

type TransactionStore = {
  transactions: Transaction[];
  setTransaction: (value: Transaction[]) => void;
}

export const transactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  setTransaction: (value: Transaction[]) => set(state => ({ ...state, transactions: value }))
}));

