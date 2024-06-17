import { renderHook, act, waitFor } from '@testing-library/react';
import { server } from '../mocks/server';
import toast from 'react-hot-toast';
import useHttpRequest from '../utils/useHttpRequest';
import { rest } from 'msw';
import endpoints from '../api/endpoints';
import { mockClientForm, mockClientsList, mockId } from '../mocks/clientMocks';

jest.mock('i18next', () => ({
    t: jest.fn((key) => key),
}));

jest.mock('react-hot-toast', () => ({
    success: jest.fn(),
    error: jest.fn(),
}));

const refetch = jest.fn();

describe('useHttpRequest core tests', () => {

    it('should fetch data on mount for GET request', async () => {
        const { result } = renderHook(() =>
            useHttpRequest({
                endpoint: endpoints.CLIENTS_GET_LIST_ENDPOINT,
                method: 'GET',
            })
        );
        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.isError).toBe(false);
            expect(result.current.data).toEqual(mockClientsList);
        });
    });


    it('should skip fetching data', async () => {
        const { result } = renderHook(() =>
            useHttpRequest({
                endpoint: endpoints.CLIENTS_GET_LIST_ENDPOINT,
                method: 'GET',
                skip: true
            })
        );
        expect(result.current.isLoading).toBe(false);

        await waitFor(() => {
            expect(result.current.isError).toBe(false);
            expect(result.current.data).toEqual(undefined);
        });
    });

    it('should handle errors', async () => {
        server.use(
            rest.get(endpoints.CLIENTS_GET_LIST_ENDPOINT, (req, res, ctx) => {
                return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
            })
        );

        //----------------------------- CRUD TESTS  STARTS HERE -----------------------------

        const { result } = renderHook(() =>
            useHttpRequest({
                endpoint: endpoints.CLIENTS_GET_LIST_ENDPOINT,
                method: 'GET',
            })
        );
        expect(result.current.isLoading).toBe(true);
        
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.isError).toBe(true);
            expect(result.current.data).toBeUndefined();
            expect(toast.error).toHaveBeenCalled();
        });
    });


    it('should handle POST requests and refetch', async () => {
        const { result } = renderHook(() =>
            useHttpRequest({
                endpoint: endpoints.CLIENTS_CREATE_ENDPOINT,
                method: 'POST',
            })
        );
        act(() => {
            result.current.manualRequest(mockClientForm, undefined, "CreatedSuccessfuly", refetch);
        });
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.isError).toBe(false);
            expect(result.current.data).toEqual(mockClientForm);
            expect(toast.success).toHaveBeenCalled();
            expect(refetch).toHaveBeenCalled();
        });
    });

    it('should handle PATCH requests and refetch', async () => {
        const { result } = renderHook(() =>
            useHttpRequest({
                endpoint: endpoints.CLIENTS_ACTIVATE_BY_ID_ENDPOINT,
                method: 'PATCH',
            })
        );
        act(() => {
            result.current.manualRequest({ status: true }, mockId, 'ActivatedSuccessfuly', refetch);
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.isError).toBe(false);
            expect(result.current.data).toEqual(mockClientsList.find(client => client.id === mockId));
            expect(toast.success).toHaveBeenCalled();
            expect(refetch).toHaveBeenCalled();
        });
    });

    it('should handle  delete requests and refetch', async () => {
        const { result } = renderHook(() =>
            useHttpRequest({
                endpoint: endpoints.CLIENTS_DELETE_BY_ID_ENDPOINT,
                method: 'DELETE',
            })
        );
        act(() => {
            result.current.manualRequest(undefined, mockId, 'DeletedSuccessfuly', refetch);
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.isError).toBe(false);
            expect(result.current.data).toEqual(mockClientsList.find(client => client.id === mockId));
            expect(toast.success).toHaveBeenCalled();
            expect(refetch).toHaveBeenCalled();
        });
    });
});
