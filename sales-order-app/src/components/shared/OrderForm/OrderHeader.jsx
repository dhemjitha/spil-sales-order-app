import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Button } from '../../ui/button'
import { Calendar } from '../../ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'

const OrderHeader = ({ clients, formData, onChange, onClientChange }) => {
  const [calendarOpen, setCalendarOpen] = useState(false)

  return (
    <div className="grid grid-cols-2 gap-8 mb-6">

      {/* Left Side - Customer Info */}
      <div className="space-y-3">

        {/* Customer Dropdown */}
        <div className="flex items-center gap-3">
          <Label className="w-28 shrink-0 text-gray-600">Customer Name</Label>
          <Select
            value={formData.clientId?.toString()}
            onValueChange={onClientChange}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              {clients.map(c => (
                <SelectItem key={c.clientId} value={c.clientId.toString()}>
                  {c.customerName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Address Fields */}
        {[
          { field: 'address1', label: 'Address 1' },
          { field: 'address2', label: 'Address 2' },
          { field: 'address3', label: 'Address 3' },
          { field: 'suburb',   label: 'Suburb' },
          { field: 'state',    label: 'State' },
          { field: 'postCode', label: 'Post Code' },
        ].map(({ field, label }) => (
          <div key={field} className="flex items-center gap-3">
            <Label className="w-28 shrink-0 text-gray-600">{label}</Label>
            <Input
              className="flex-1"
              value={formData[field] || ''}
              onChange={e => onChange(field, e.target.value)}
            />
          </div>
        ))}

      </div>

      {/* Right Side - Invoice Info */}
      <div className="space-y-3">

        {/* Invoice No */}
        <div className="flex items-center gap-3">
          <Label className="w-28 shrink-0 text-gray-600">Invoice No</Label>
          <Input
            className="flex-1"
            value={formData.invoiceNo || ''}
            onChange={e => onChange('invoiceNo', e.target.value)}
          />
        </div>

        {/* Invoice Date - shadcn Calendar */}
        <div className="flex items-center gap-3">
          <Label className="w-28 shrink-0 text-gray-600">Invoice Date</Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                {formData.invoiceDate
                  ? format(new Date(formData.invoiceDate), 'PPP')
                  : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.invoiceDate ? new Date(formData.invoiceDate) : undefined}
                onSelect={(date) => {
                  onChange('invoiceDate', date?.toISOString())
                  setCalendarOpen(false)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Reference No */}
        <div className="flex items-center gap-3">
          <Label className="w-28 shrink-0 text-gray-600">Reference No</Label>
          <Input
            className="flex-1"
            value={formData.referenceNo || ''}
            onChange={e => onChange('referenceNo', e.target.value)}
          />
        </div>

        {/* Note Textarea */}
        <div className="flex items-start gap-3">
          <Label className="w-28 shrink-0 text-gray-600 mt-2">Note</Label>
          <textarea
            className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm resize-none h-24 focus:outline-none focus:ring-1 focus:ring-black"
            value={formData.note || ''}
            onChange={e => onChange('note', e.target.value)}
          />
        </div>

      </div>
    </div>
  )
}

export default OrderHeader