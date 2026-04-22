import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { InvoiceList } from './pages/InvoiceList';
import { InvoiceDetail } from './pages/InvoiceDetail';
import { InvoiceForm } from './pages/InvoiceForm';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: InvoiceList,
      },
      {
        path: 'invoice/new',
        Component: InvoiceForm,
      },
      {
        path: 'invoice/edit/:id',
        Component: InvoiceForm,
      },
      {
        path: 'invoice/:id',
        Component: InvoiceDetail,
      },
    ],
  },
]);
