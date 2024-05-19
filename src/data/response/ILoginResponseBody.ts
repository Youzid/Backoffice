export interface ILoginResponseBody {
    namespaceId: string;
    namespace: string;
    email: string;
    username: string;
    fullname: string;
    language?: string;
    isAdmin: boolean;
    isConnected: boolean;
    token: string;
    permissions: {
        canCreateUser: string;
        user: string;
        canChangePermission: string;
        notification: string;
        invoices: string;
        epayment: string;
    }
};