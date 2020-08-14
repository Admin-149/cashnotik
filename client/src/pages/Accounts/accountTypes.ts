export interface TCreateAccountInput {
  amount: number;
  title: string;
}

export interface TAccount {
  amount: number;
  id: number;
  title: string;
}

export interface TAccountsData {
  accounts: TAccount[];
}
