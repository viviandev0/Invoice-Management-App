import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useForm, useFieldArray } from 'react-hook-form';
import { InvoiceFormData, InvoiceItem } from '../types/invoice';
import { getInvoiceById, createInvoice, updateInvoice } from '../utils/storage';
import {
  formDataToInvoice,
  invoiceToFormData,
  calculateItemTotal,
} from '../utils/invoice-helpers';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export const InvoiceForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id !== 'new';
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<InvoiceFormData>({
    defaultValues: {
      createdAt: new Date().toISOString().split('T')[0],
      paymentTerms: 30,
      description: '',
      clientName: '',
      clientEmail: '',
      senderStreet: '',
      senderCity: '',
      senderPostCode: '',
      senderCountry: '',
      clientStreet: '',
      clientCity: '',
      clientPostCode: '',
      clientCountry: '',
      items: [
        {
          id: crypto.randomUUID(),
          name: '',
          quantity: 1,
          price: 0,
          total: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  useEffect(() => {
    if (isEditing && id) {
      const invoice = getInvoiceById(id);
      if (invoice) {
        const formData = invoiceToFormData(invoice);
        Object.keys(formData).forEach((key) => {
          setValue(key as keyof InvoiceFormData, formData[key as keyof InvoiceFormData]);
        });
      } else {
        navigate('/');
      }
    }
  }, [id, isEditing, navigate, setValue]);

  const items = watch('items');

  useEffect(() => {
    items.forEach((item, index) => {
      const total = calculateItemTotal(item.quantity || 0, item.price || 0);
      if (item.total !== total) {
        setValue(`items.${index}.total`, total);
      }
    });
  }, [items, setValue]);

  const onSubmit = (data: InvoiceFormData) => {
    setIsLoading(true);
    const invoice = formDataToInvoice(data, isEditing ? id : undefined, 'pending');
    if (isEditing && id) {
      updateInvoice(id, invoice);
    } else {
      createInvoice(invoice);
    }
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  const onSaveAsDraft = handleSubmit((data) => {
    setIsLoading(true);
    const invoice = formDataToInvoice(data, isEditing ? id : undefined, 'draft');
    if (isEditing && id) {
      updateInvoice(id, invoice);
    } else {
      createInvoice(invoice);
    }
    setTimeout(() => {
      navigate('/');
    }, 300);
  });

  const addNewItem = () => {
    append({
      id: crypto.randomUUID(),
      name: '',
      quantity: 1,
      price: 0,
      total: 0,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
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

          <h1 className="text-3xl font-bold mb-8">
            {isEditing ? `Edit Invoice #${id}` : 'New Invoice'}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-semibold mb-4 text-primary">Bill From</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="senderStreet">Street Address</Label>
                    <Input
                      id="senderStreet"
                      {...register('senderStreet', { required: 'Street address is required' })}
                      className={errors.senderStreet ? 'border-destructive' : ''}
                    />
                    {errors.senderStreet && (
                      <p className="text-destructive text-sm mt-1">{errors.senderStreet.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="senderCity">City</Label>
                      <Input
                        id="senderCity"
                        {...register('senderCity', { required: 'City is required' })}
                        className={errors.senderCity ? 'border-destructive' : ''}
                      />
                      {errors.senderCity && (
                        <p className="text-destructive text-sm mt-1">{errors.senderCity.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="senderPostCode">Post Code</Label>
                      <Input
                        id="senderPostCode"
                        {...register('senderPostCode', { required: 'Post code is required' })}
                        className={errors.senderPostCode ? 'border-destructive' : ''}
                      />
                      {errors.senderPostCode && (
                        <p className="text-destructive text-sm mt-1">{errors.senderPostCode.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="senderCountry">Country</Label>
                      <Input
                        id="senderCountry"
                        {...register('senderCountry', { required: 'Country is required' })}
                        className={errors.senderCountry ? 'border-destructive' : ''}
                      />
                      {errors.senderCountry && (
                        <p className="text-destructive text-sm mt-1">{errors.senderCountry.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-primary">Bill To</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="clientName">Client's Name</Label>
                    <Input
                      id="clientName"
                      {...register('clientName', { required: "Client's name is required" })}
                      className={errors.clientName ? 'border-destructive' : ''}
                    />
                    {errors.clientName && (
                      <p className="text-destructive text-sm mt-1">{errors.clientName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="clientEmail">Client's Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      {...register('clientEmail', {
                        required: "Client's email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className={errors.clientEmail ? 'border-destructive' : ''}
                    />
                    {errors.clientEmail && (
                      <p className="text-destructive text-sm mt-1">{errors.clientEmail.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="clientStreet">Street Address</Label>
                    <Input
                      id="clientStreet"
                      {...register('clientStreet', { required: 'Street address is required' })}
                      className={errors.clientStreet ? 'border-destructive' : ''}
                    />
                    {errors.clientStreet && (
                      <p className="text-destructive text-sm mt-1">{errors.clientStreet.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="clientCity">City</Label>
                      <Input
                        id="clientCity"
                        {...register('clientCity', { required: 'City is required' })}
                        className={errors.clientCity ? 'border-destructive' : ''}
                      />
                      {errors.clientCity && (
                        <p className="text-destructive text-sm mt-1">{errors.clientCity.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="clientPostCode">Post Code</Label>
                      <Input
                        id="clientPostCode"
                        {...register('clientPostCode', { required: 'Post code is required' })}
                        className={errors.clientPostCode ? 'border-destructive' : ''}
                      />
                      {errors.clientPostCode && (
                        <p className="text-destructive text-sm mt-1">{errors.clientPostCode.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="clientCountry">Country</Label>
                      <Input
                        id="clientCountry"
                        {...register('clientCountry', { required: 'Country is required' })}
                        className={errors.clientCountry ? 'border-destructive' : ''}
                      />
                      {errors.clientCountry && (
                        <p className="text-destructive text-sm mt-1">{errors.clientCountry.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="createdAt">Invoice Date</Label>
                  <Input
                    id="createdAt"
                    type="date"
                    {...register('createdAt', { required: 'Invoice date is required' })}
                    className={errors.createdAt ? 'border-destructive' : ''}
                  />
                  {errors.createdAt && (
                    <p className="text-destructive text-sm mt-1">{errors.createdAt.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select
                    value={watch('paymentTerms')?.toString()}
                    onValueChange={(value) => setValue('paymentTerms', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Net 1 Day</SelectItem>
                      <SelectItem value="7">Net 7 Days</SelectItem>
                      <SelectItem value="14">Net 14 Days</SelectItem>
                      <SelectItem value="30">Net 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Project Description</Label>
                <Input
                  id="description"
                  {...register('description', { required: 'Project description is required' })}
                  className={errors.description ? 'border-destructive' : ''}
                />
                {errors.description && (
                  <p className="text-destructive text-sm mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <h3 className="font-semibold mb-6 text-2xl">Item List</h3>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                      <div className="sm:col-span-5">
                        <Label htmlFor={`items.${index}.name`}>Item Name</Label>
                        <Input
                          {...register(`items.${index}.name`, {
                            required: 'Item name is required',
                          })}
                          className={errors.items?.[index]?.name ? 'border-destructive' : ''}
                        />
                        {errors.items?.[index]?.name && (
                          <p className="text-destructive text-sm mt-1">
                            {errors.items[index]?.name?.message}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <Label htmlFor={`items.${index}.quantity`}>Qty</Label>
                        <Input
                          type="number"
                          min="1"
                          {...register(`items.${index}.quantity`, {
                            required: 'Quantity is required',
                            min: { value: 1, message: 'Minimum quantity is 1' },
                          })}
                          className={errors.items?.[index]?.quantity ? 'border-destructive' : ''}
                        />
                        {errors.items?.[index]?.quantity && (
                          <p className="text-destructive text-sm mt-1">
                            {errors.items[index]?.quantity?.message}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <Label htmlFor={`items.${index}.price`}>Price</Label>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          {...register(`items.${index}.price`, {
                            required: 'Price is required',
                            min: { value: 0, message: 'Price must be positive' },
                          })}
                          className={errors.items?.[index]?.price ? 'border-destructive' : ''}
                        />
                        {errors.items?.[index]?.price && (
                          <p className="text-destructive text-sm mt-1">
                            {errors.items[index]?.price?.message}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <Label>Total</Label>
                        <div className="h-10 flex items-center font-semibold text-muted-foreground">
                          £{items[index]?.total?.toFixed(2) || '0.00'}
                        </div>
                      </div>

                      <div className="sm:col-span-1 flex items-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-5" />
                        </Button>
                      </div>
                    </div>

                    {index < fields.length - 1 && <div className="border-b border-border" />}
                  </motion.div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={addNewItem}
                className="w-full mt-6 gap-2"
              >
                <Plus className="size-4" />
                Add New Item
              </Button>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <Link to="/">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onSaveAsDraft}
                  disabled={isLoading}
                >
                  Save as Draft
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isEditing ? 'Save Changes' : 'Create Invoice'}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
