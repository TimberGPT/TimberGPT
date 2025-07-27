"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "../../../../components/form/CustomForm";
import CustomInput from "../../../../components/form/CustomInput";
import CustomSelect from "../../../../components/form/CustomSelect";
import Breadcrumb from "../../../../components/common/Breadcrumb";

// Validation schema using Zod
const invoiceSchema = z.object({
  invoice_number: z.string().min(1, "Invoice number is required"),
  customer_name: z.string().min(1, "Customer name is required"),
  product_description: z.string().min(1, "Product description is required"),
  quantity: z.string().min(1, "Quantity is required"),
  unit_price: z.string().min(1, "Unit price is required"),
  total_amount: z.string().min(1, "Total amount is required"),
  invoice_status: z.string().min(1, "Invoice status is required"),
  due_date: z.string().min(1, "Due date is required"),
  issue_date: z.string().min(1, "Issue date is required"),
});

const InvoiceForm = ({ onSubmit }) => {
  const handleSubmit = (data) => {
    console.log("Invoice form submitted:", data);
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const statusOptions = [
    { value: "", label: "Select status" },
    "Paid",
    "Pending",
    "Overdue",
    "Cancelled",
    "Draft",
  ];

  return (
    <>
      <Breadcrumb
        items={[{ label: "Sales", href: "/dashboard/sales" }]}
        currentPage="Create Invoice"
      />

      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:pt-2 lg:pb-0 mx-auto">
        <div className="bg-white rounded-xl shadow-xs p-4 sm:p-7">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">New Invoice</h1>

          <CustomForm
            onSubmit={handleSubmit}
            resolver={zodResolver(invoiceSchema)}
            defaultValues={{
              invoice_number: "",
              customer_name: "",
              product_description: "",
              quantity: "",
              unit_price: "",
              total_amount: "",
              invoice_status: "",
              due_date: "",
              issue_date: "",
            }}
          >
            {/* Invoice Number and Customer Name row */}
            <div className="flex flex-row gap-4 mb-5">
              <div className="w-1/2">
                <label
                  htmlFor="invoice-number"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Invoice Number
                </label>
                <CustomInput
                  name="invoice_number"
                  id="invoice-number"
                  placeholder="INV-0001"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="customer-name"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Customer Name
                </label>
                <CustomInput
                  name="customer_name"
                  id="customer-name"
                  placeholder="Enter customer name"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Product and Quantity row */}
            <div className="flex flex-row gap-4 mb-5">
              <div className="w-1/2">
                <label
                  htmlFor="product-description"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Product Description
                </label>
                <CustomInput
                  name="product_description"
                  id="product-description"
                  placeholder="Enter product details"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Quantity
                </label>
                <CustomInput
                  name="quantity"
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Unit Price and Total Amount row */}
            <div className="flex flex-row gap-4 mb-5">
              <div className="w-1/2">
                <label
                  htmlFor="unit-price"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Unit Price
                </label>
                <CustomInput
                  name="unit_price"
                  id="unit-price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="total-amount"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Total Amount
                </label>
                <CustomInput
                  name="total_amount"
                  id="total-amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Status, Due Date, and Issue Date row */}
            <div className="flex flex-row gap-4 mb-8">
              <div className="w-1/3">
                <label
                  htmlFor="invoice-status"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Status
                </label>
                <CustomSelect
                  name="invoice_status"
                  id="invoice-status"
                  options={statusOptions}
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="w-1/3">
                <label
                  htmlFor="due-date"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Due Date
                </label>
                <CustomInput
                  name="due_date"
                  id="due-date"
                  type="date"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="w-1/3">
                <label
                  htmlFor="issue-date"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Issue Date
                </label>
                <CustomInput
                  name="issue_date"
                  id="issue-date"
                  type="date"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:outline-hidden focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Create Invoice
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-400 text-white hover:bg-gray-500 focus:outline-hidden focus:bg-gray-500 disabled:opacity-50 disabled:pointer-events-none"
              >
                Cancel
              </button>
            </div>
          </CustomForm>
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;
