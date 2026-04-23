import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'

const OrderLines = ({ lines, items, onChange, onAdd, onRemove }) => {
  return (
    <div className="mb-6">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Item Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Tax %</TableHead>
              <TableHead>Excl Amount</TableHead>
              <TableHead>Tax Amount</TableHead>
              <TableHead>Incl Amount</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.map((line, i) => (
              <TableRow key={i}>

                {/* Item Code Dropdown */}
                <TableCell>
                  <Select
                    value={line.itemId?.toString()}
                    onValueChange={(val) => {
                      const item = items.find(it => it.itemId === parseInt(val))
                      onChange(i, 'itemId', parseInt(val))
                      onChange(i, 'price', item?.price || 0)
                    }}
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {items.map(it => (
                        <SelectItem key={it.itemId} value={it.itemId.toString()}>
                          {it.itemCode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* Description Dropdown */}
                <TableCell>
                  <Select
                    value={line.itemId?.toString()}
                    onValueChange={(val) => {
                      const item = items.find(it => it.itemId === parseInt(val))
                      onChange(i, 'itemId', parseInt(val))
                      onChange(i, 'price', item?.price || 0)
                    }}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Description" />
                    </SelectTrigger>
                    <SelectContent>
                      {items.map(it => (
                        <SelectItem key={it.itemId} value={it.itemId.toString()}>
                          {it.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* Note */}
                <TableCell>
                  <Input
                    className="w-24"
                    value={line.note || ''}
                    onChange={e => onChange(i, 'note', e.target.value)}
                  />
                </TableCell>

                {/* Quantity */}
                <TableCell>
                  <Input
                    className="w-16"
                    type="number"
                    min="0"
                    value={line.quantity || ''}
                    onChange={e => onChange(i, 'quantity', parseFloat(e.target.value) || 0)}
                  />
                </TableCell>

                {/* Price - readonly */}
                <TableCell>
                  <Input
                    className="w-24 bg-gray-50"
                    readOnly
                    value={line.price || ''}
                  />
                </TableCell>

                {/* Tax Rate */}
                <TableCell>
                  <Input
                    className="w-16"
                    type="number"
                    min="0"
                    value={line.taxRate || ''}
                    onChange={e => onChange(i, 'taxRate', parseFloat(e.target.value) || 0)}
                  />
                </TableCell>

                {/* Excl Amount - readonly */}
                <TableCell>
                  <Input
                    className="w-28 bg-gray-50"
                    readOnly
                    value={line.exclAmount?.toFixed(2) || '0.00'}
                  />
                </TableCell>

                {/* Tax Amount - readonly */}
                <TableCell>
                  <Input
                    className="w-28 bg-gray-50"
                    readOnly
                    value={line.taxAmount?.toFixed(2) || '0.00'}
                  />
                </TableCell>

                {/* Incl Amount - readonly */}
                <TableCell>
                  <Input
                    className="w-28 bg-gray-50"
                    readOnly
                    value={line.inclAmount?.toFixed(2) || '0.00'}
                  />
                </TableCell>

                {/* Remove Button */}
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(i)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ✕
                  </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Line Button */}
      <Button variant="outline" size="sm" onClick={onAdd} className="mt-3">
        + Add Line
      </Button>
    </div>
  )
}

export default OrderLines