import { Invoice } from '../types/invoice';

const STORAGE_KEY = 'invoices';

export const loadInvoices = (): Invoice[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load invoices:', error);
    return [];
  }
};

export const saveInvoices = (invoices: Invoice[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  } catch (error) {
    console.error('Failed to save invoices:', error);
  }
};

export const getInvoiceById = (id: string): Invoice | undefined => {
  const invoices = loadInvoices();
  return invoices.find(inv => inv.id === id);
};

export const createInvoice = (invoice: Invoice): void => {
  const invoices = loadInvoices();
  invoices.push(invoice);
  saveInvoices(invoices);
};

export const updateInvoice = (id: string, updatedInvoice: Invoice): void => {
  const invoices = loadInvoices();
  const index = invoices.findIndex(inv => inv.id === id);
  if (index !== -1) {
    invoices[index] = updatedInvoice;
    saveInvoices(invoices);
  }
};

export const deleteInvoice = (id: string): void => {
  const invoices = loadInvoices();
  const filtered = invoices.filter(inv => inv.id !== id);
  saveInvoices(filtered);
};
