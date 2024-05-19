export interface IClientsRequestBody {
  customerNumber:null
  firstName:string
  lastName: string,
  email: string,
  address: string,
  customerTags:null
}

export interface IDocClientsRequesBody {
  description: string
  File: string | null,
}