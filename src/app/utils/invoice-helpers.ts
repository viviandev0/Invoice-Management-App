import { Invoice, InvoiceFormData, InvoiceItem } from '../types/invoice';
import { addDays, format } from 'date-fns';

export const generateInvoiceId = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetters = Array.from({ length: 2 }, () =>
    letters[Math.floor(Math.random() * letters.length)]
  ).join('');
  const randomNumbers = Math.floor(1000 + Math.random() * 9000);
  return `${randomLetters}${randomNumbers}`;
};

export const calculateItemTotal = (quantity: number, price: number): number => {
  return quantity * price;
};

export const calculateInvoiceTotal = (items: InvoiceItem[]): number => {
  return items.reduce((sum, item) => sum + item.total, 0);
};

export const calculatePaymentDue = (createdAt: string, paymentTerms: number): string => {
  const date = new Date(createdAt);
  return addDays(date, paymentTerms).toISOString();
};

export const formatInvoiceDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd MMM yyyy');
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount);
};

export const formDataToInvoice = (
  formData: InvoiceFormData,
  id?: string,
  status: 'draft' | 'pending' | 'paid' = 'pending'
): Invoice => {
  const invoiceId = id || generateInvoiceId();
  const paymentDue = calculatePaymentDue(formData.createdAt, formData.paymentTerms);
  const total = calculateInvoiceTotal(formData.items);

  return {
    id: invoiceId,
    createdAt: formData.createdAt,
    paymentDue,
    description: formData.description,
    paymentTerms: formData.paymentTerms,
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    status,
    senderAddress: {
      street: formData.senderStreet,
      city: formData.senderCity,
      postCode: formData.senderPostCode,
      country: formData.senderCountry,
    },
    clientAddress: {
      street: formData.clientStreet,
      city: formData.clientCity,
      postCode: formData.clientPostCode,
      country: formData.clientCountry,
    },
    items: formData.items,
    total,
  };
};

export const invoiceToFormData = (invoice: Invoice): InvoiceFormData => {
  return {
    createdAt: invoice.createdAt,
    paymentTerms: invoice.paymentTerms,
    description: invoice.description,
    clientName: invoice.clientName,
    clientEmail: invoice.clientEmail,
    senderStreet: invoice.senderAddress.street,
    senderCity: invoice.senderAddress.city,
    senderPostCode: invoice.senderAddress.postCode,
    senderCountry: invoice.senderAddress.country,
    clientStreet: invoice.clientAddress.street,
    clientCity: invoice.clientAddress.city,
    clientPostCode: invoice.clientAddress.postCode,
    clientCountry: invoice.clientAddress.country,
    items: invoice.items,
  };
};
