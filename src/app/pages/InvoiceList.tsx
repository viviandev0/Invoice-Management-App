import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Invoice, InvoiceStatus } from '../types/invoice';
import { loadInvoices } from '../utils/storage';
import { InvoiceListItem } from '../components/InvoiceListItem';
import { FilterDropdown } from '../components/FilterDropdown';
import { Button } from '../components/ui/button';
import { Plus, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState<InvoiceStatus | 'all'>('all');

  useEffect(() => {
    const loadedInvoices = loadInvoices();
    setInvoices(loadedInvoices);
  }, []);

  const filteredInvoices =
    filter === 'all'
      ? invoices
      : invoices.filter(inv => inv.status === filter);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Invoices</h1>
              <p className="text-muted-foreground">
                {filteredInvoices.length === 0
                  ? 'No invoices'
                  : `${filteredInvoices.length} ${
                      filteredInvoices.length === 1 ? 'invoice' : 'invoices'
                    }`}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <FilterDropdown value={filter} onChange={setFilter} />
              <Link to="/invoice/new">
                <Button className="gap-2">
                  <Plus className="size-5" />
                  <span className="hidden sm:inline">New Invoice</span>
                  <span className="sm:hidden">New</span>
                </Button>
              </Link>
            </div>
          </div>

          {filteredInvoices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="bg-muted/50 p-8 rounded-full mb-6">
                <FileText className="size-16 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">No invoices found</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                {filter === 'all'
                  ? 'Create an invoice to get started'
                  : `No ${filter} invoices at the moment`}
              </p>
              {filter === 'all' && (
                <Link to="/invoice/new">
                  <Button size="lg" className="gap-2">
                    <Plus className="size-5" />
                    Create Invoice
                  </Button>
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {filteredInvoices.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <InvoiceListItem invoice={invoice} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
