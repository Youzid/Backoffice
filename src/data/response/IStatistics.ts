export interface TransactionsCountAndClients {
    namespaceId:string
    merchantName:string
    clientsNumber: number,
    invoicesNumber: number,
    transactionsCompletedNumber: number,
  }
  export interface MonthlyIncome {
    date: string,
    income: number
    }
  export interface YearlyIncome {
    month: string,
    income: number
    }
  export interface StatusCount {
    status: string,
    numberOfInvoices: number
    }
    