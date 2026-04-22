import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Invoice } from '../types/invoice';
import { getInvoiceById, deleteInvoice, updateInvoice } from '../utils/storage';
import { formatInvoiceDate, formatCurrency } from '../utils/invoice-helpers';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (id) {
      const loaded = getInvoiceById(id);
      if (loaded) {
        setInvoice(loaded);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (id) {
      deleteInvoice(id);
      navigate('/');
    }
  };

  const handleMarkAsPaid = () => {
    if (invoice && invoice.status !== 'paid') {
      const updatedInvoice = { ...invoice, status: 'paid' as const };
      updateInvoice(invoice.id, updatedInvoice);
      setInvoice(updatedInvoice);
    }
  };

  if (!invoice) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-foreground hover:text-primary mb-8 transition-colors group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Go back
          </Link>

          <div className="bg-card border border-border rounded-lg p-6 mb-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Status</span>
              <StatusBadge status={invoice.status} />
            </div>

            <div className="flex items-center gap-3">
              <Link to={`/invoice/edit/${invoice.id}`}>
                <Button variant="outline" className="gap-2">
                  <Edit className="size-4" />
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                className="gap-2"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
              {invoice.status === 'pending' && (
                <Button onClick={handleMarkAsPaid}>Mark as Paid</Button>
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <div className="flex justify-between mb-12 flex-wrap gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  <span className="text-muted-foreground">#</span>
                  {invoice.id}
                </h2>
                <p className="text-muted-foreground">{invoice.description}</p>
              </div>

              <div className="text-right text-muted-foreground">
                <p>{invoice.senderAddress.street}</p>
                <p>{invoice.senderAddress.city}</p>
                <p>{invoice.senderAddress.postCode}</p>
                <p>{invoice.senderAddress.country}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div>
                <p className="text-muted-foreground mb-2">Invoice Date</p>
                <p className="font-semibold">{formatInvoiceDate(invoice.createdAt)}</p>
              </div>

              <div>
                <p className="text-muted-foreground mb-2">Payment Due</p>
                <p className="font-semibold">{formatInvoiceDate(invoice.paymentDue)}</p>
              </div>

              <div>
                <p className="text-muted-foreground mb-2">Bill To</p>
                <p className="font-semibold mb-2">{invoice.clientName}</p>
                <div className="text-muted-foreground">
                  <p>{invoice.clientAddress.street}</p>
                  <p>{invoice.clientAddress.city}</p>
                  <p>{invoice.clientAddress.postCode}</p>
                  <p>{invoice.clientAddress.country}</p>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground mb-2">Sent to</p>
                <p className="font-semibold">{invoice.clientEmail}</p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 sm:p-8">
              <div className="hidden sm:grid sm:grid-cols-4 gap-4 mb-6 text-muted-foreground">
                <div className="col-span-2">Item Name</div>
                <div className="text-center">QTY</div>
                <div className="text-right">Price</div>
                <div className="text-right">Total</div>
              </div>

              {invoice.items.map((item, index) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-2 sm:grid-cols-4 gap-4 items-center ${
                    index !== invoice.items.length - 1 ? 'mb-6 pb-6 border-b border-border' : 'mb-6'
                  }`}
                >
                  <div className="col-span-2">
                    <p className="font-semibold mb-2 sm:mb-0">{item.name}</p>
                    <p className="text-muted-foreground sm:hidden">
                      {item.quantity} x {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="hidden sm:block text-center text-muted-foreground">
                    {item.quantity}
                  </div>
                  <div className="hidden sm:block text-right text-muted-foreground">
                    {formatCurrency(item.price)}
                  </div>
                  <div className="text-right font-semibold col-span-2 sm:col-span-1">
                    {formatCurrency(item.total)}
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center bg-primary text-primary-foreground rounded-lg p-6 mt-8">
                <span>Amount Due</span>
                <span className="text-3xl font-bold">{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
