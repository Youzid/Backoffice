
import { rest } from 'msw';
import endpoints from '../api/endpoints';
import { mockClientForm, mockClientsList, mockId } from './clientMocks';


export const handlers = [
  rest.get(endpoints.CLIENTS_GET_LIST_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json({response:mockClientsList,totalCount:mockClientsList.length}));
  }),
  rest.post(endpoints.CLIENTS_CREATE_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json({response:mockClientForm}));
  }),
  rest.patch(`${endpoints.CLIENTS_ACTIVATE_BY_ID_ENDPOINT}${mockId}`, (req, res, ctx) => {
    return res(ctx.json({response:mockClientsList.find(client => client.id === "3")}));
  }),
  rest.delete(`${endpoints.CLIENTS_DELETE_BY_ID_ENDPOINT}${mockId}`, (req, res, ctx) => {
    return res(ctx.json({response:mockClientsList.find(client => client.id === "3")}));
  }),
];
