export interface IClientsRequestBody {
  firstName:string
  lastName: string,
  email: string,
  address: string,
}

export interface IDocClientsRequesBody {
  description: string
  File: string | null,
}