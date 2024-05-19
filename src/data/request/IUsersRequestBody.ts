export interface IUsersRequestBody {
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password?: string | null,
  language: string
  isActivated?:boolean
}
