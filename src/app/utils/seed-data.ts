import { Invoice } from '../types/invoice';
import { loadInvoices, saveInvoices } from './storage';

const sampleInvoices: Invoice[] = [
  {
    id: 'RT3080',
    createdAt: '2024-08-18',
    paymentDue: '2024-09-17',
    description: 'Re-branding',
    paymentTerms: 30,
    clientName: 'Jensen Huang',
    clientEmail: 'jensenh@mail.com',
    status: 'paid',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '106 Kendell Street',
      city: 'Sharrington',
      postCode: 'NR24 5WQ',
      country: 'United Kingdom',
    },
    items: [
      {
        id: '1',
        name: 'Brand Guidelines',
        quantity: 1,
        price: 1800.90,
        total: 1800.90,
      },
    ],
    total: 1800.90,
  },
  {
    id: 'XM9141',
    createdAt: '2024-08-21',
    paymentDue: '2024-09-20',
    description: 'Graphic Design',
    paymentTerms: 30,
    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@mail.com',
    status: 'pending',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '84 Church Way',
      city: 'Bradford',
      postCode: 'BD1 9PB',
      country: 'United Kingdom',
    },
    items: [
      {
        id: '1',
        name: 'Banner Design',
        quantity: 1,
        price: 156.00,
        total: 156.00,
      },
      {
        id: '2',
        name: 'Email Design',
        quantity: 2,
        price: 200.00,
        total: 400.00,
      },
    ],
    total: 556.00,
  },
  {
    id: 'RG0314',
    createdAt: '2024-09-24',
    paymentDue: '2024-10-01',
    description: 'Website Redesign',
    paymentTerms: 7,
    clientName: 'John Morrison',
    clientEmail: 'jm@myco.com',
    status: 'draft',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '79 Dover Road',
      city: 'Westhall',
      postCode: 'IP19 3PF',
      country: 'United Kingdom',
    },
    items: [
      {
        id: '1',
        name: 'Website Redesign',
        quantity: 1,
        price: 14002.33,
        total: 14002.33,
      },
    ],
    total: 14002.33,
  },
  {
    id: 'RT2080',
    createdAt: '2024-10-11',
    paymentDue: '2024-10-25',
    description: 'Logo Concept',
    paymentTerms: 14,
    clientName: 'Alysa Werner',
    clientEmail: 'alysa@email.co.uk',
    status: 'pending',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '63 Warwick Road',
      city: 'Carlisle',
      postCode: 'CA20 2TG',
      country: 'United Kingdom',
    },
    items: [
      {
        id: '1',
        name: 'Logo Sketches',
        quantity: 1,
        price: 102.04,
        total: 102.04,
      },
    ],
    total: 102.04,
  },
  {
    id: 'AA1449',
    createdAt: '2024-10-07',
    paymentDue: '2024-10-14',
    description: 'Re-branding',
    paymentTerms: 7,
    clientName: 'Mellisa Clarke',
    clientEmail: 'mellisa.clarke@example.com',
    status: 'pending',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: 'The Barn',
      city: 'Cambridge',
      postCode: 'CB22 3AD',
      country: 'United Kingdom',
    },
    items: [
      {
        id: '1',
        name: 'New Logo',
        quantity: 1,
        price: 1532.33,
        total: 1532.33,
      },
      {
        id: '2',
        name: 'Brand Guidelines',
        quantity: 1,
        price: 2500.00,
        total: 2500.00,
      },
    ],
    total: 4032.33,
  },
];

export const initializeSeedData = () => {
  const existingInvoices = loadInvoices();
  if (existingInvoices.length === 0) {
    saveInvoices(sampleInvoices);
  }
};
