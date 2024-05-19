export interface IInvoicesFilterRequestBody {
    invoiceNumber: string | null;
    clientNumber: string | null;
    date: string | null;
    reference: string | null;
    status: string | null;
}