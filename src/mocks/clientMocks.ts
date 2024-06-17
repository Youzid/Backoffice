import { IClientsResponseBody } from '../data/response/IClientsResponseBody';
import { IClientsRequestBody } from '../data/request/IClientsRequestBody';

export const mockClientsList:IClientsResponseBody[] = [
  { id: "3", firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com',lastActive :"2022", isActivated: true },
  { id: "2", firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com',lastActive :"2022", isActivated: false },
];
export const mockClientForm: IClientsRequestBody = {
  firstName: 'John',
  address:"USA, new york",
  lastName: 'Doe',
  email: 'john.doe@example.com',
};
export const mockId = "3";