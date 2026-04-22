import { Link } from 'react-router';
import { Invoice } from '../types/invoice';
import { formatInvoiceDate, formatCurrency } from '../utils/invoice-helpers';
import { StatusBadge } from './StatusBadge';
import { ChevronRight } from 'lucide-react';

interface InvoiceListItemProps {
  invoice: Invoice;
}

export const InvoiceListItem = ({ invoice }: InvoiceListItemProps) => {
  return (
    <Link
      to={`/invoice/${invoice.id}`}
      className="block bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200 hover:shadow-md group"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <div className="min-w-[100px]">
            <p className="font-semibold text-foreground">
              <span className="text-muted-foreground">#</span>
              {invoice.id}
            </p>
          </div>

          <div className="min-w-[120px] hidden md:block">
            <p className="text-muted-foreground">
              Due {formatInvoiceDate(invoice.paymentDue)}
            </p>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-muted-foreground truncate">{invoice.clientName}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <p className="font-bold text-xl">{formatCurrency(invoice.total)}</p>

          <div className="hidden sm:block">
            <StatusBadge status={invoice.status} />
          </div>

          <ChevronRight className="size-5 text-primary group-hover:translate-x-1 transition-transform" />
        </div>

        <div className="sm:hidden w-full">
          <StatusBadge status={invoice.status} />
        </div>
      </div>
    </Link>
  );
};
