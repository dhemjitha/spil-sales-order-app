import { Input } from '../../ui/input'
import { Label } from '../../ui/label'

const OrderTotals = ({ totalExcl, totalTax, totalIncl }) => {
  return (
    <div className="flex justify-end mt-4">
      <div className="space-y-2 w-80">

        <div className="flex items-center gap-3">
          <Label className="w-24 text-right shrink-0 text-gray-600">Total Excl</Label>
          <Input
            className="flex-1 bg-gray-50 font-medium text-right"
            readOnly
            value={totalExcl?.toFixed(2) || '0.00'}
          />
        </div>

        <div className="flex items-center gap-3">
          <Label className="w-24 text-right shrink-0 text-gray-600">Total Tax</Label>
          <Input
            className="flex-1 bg-gray-50 font-medium text-right"
            readOnly
            value={totalTax?.toFixed(2) || '0.00'}
          />
        </div>

        <div className="flex items-center gap-3">
          <Label className="w-24 text-right shrink-0 text-gray-600">Total Incl</Label>
          <Input
            className="flex-1 bg-gray-50 font-bold text-right border-black"
            readOnly
            value={totalIncl?.toFixed(2) || '0.00'}
          />
        </div>

      </div>
    </div>
  )
}

export default OrderTotals