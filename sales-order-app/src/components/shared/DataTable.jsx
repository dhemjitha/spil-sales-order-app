import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

const DataTable = ({ columns, data, onRowDoubleClick }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <Table>

        <TableHeader className="bg-gray-50">
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className="font-medium text-gray-600">
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-16 text-gray-400"
              >
                No orders found. Click "Add New" to create one.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow
                key={i}
                onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(row)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                {columns.map((col) => (
                  <TableCell key={col.key} className="text-gray-800">
                    {col.render ? col.render(row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>

      </Table>
    </div>
  )
}

export default DataTable