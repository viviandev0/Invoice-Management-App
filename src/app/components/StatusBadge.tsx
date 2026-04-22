import { InvoiceStatus } from '../types/invoice';

interface StatusBadgeProps {
  status: InvoiceStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    paid: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    pending: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    draft: 'bg-slate-500/10 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400',
  };

  const dots = {
    paid: 'bg-emerald-600 dark:bg-emerald-400',
    pending: 'bg-amber-600 dark:bg-amber-400',
    draft: 'bg-slate-600 dark:bg-slate-400',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${styles[status]}`}>
      <div className={`size-2 rounded-full ${dots[status]}`} />
      <span className="capitalize">{status}</span>
    </div>
  );
};
