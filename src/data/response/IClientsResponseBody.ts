export interface IClientsResponseBody {
  id:string
  firstName:string
  lastName:string
  email: string,
  lastActive: string,
  isActivated: boolean,
}

export interface IDocClientsResponseBody {
  id:string
  docNumber: number,
  description:string,
  fileExt:string
  fileUrl:string
}