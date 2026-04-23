import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setOrders, setLoading, removeOrder } from '@/lib/features/salesOrderSlice'
import { salesOrdersApi } from '@/lib/services/api/api'
import PageHeader from '../components/shared/PageHeader'
import DataTable from '../components/shared/DataTable'
import { Button } from '../components/ui/button'
import { toast } from 'sonner'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orders, loading, error } = useSelector(state => state.salesOrder)

  const loadOrders = async () => {
    try {
      dispatch(setLoading(true))
      const data = await salesOrdersApi.getAll()
      dispatch(setOrders(data))
    } catch (err) {
      dispatch(setError(err.message))
      toast.error('Failed to load orders')
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleDelete = async (orderId) => {
    try {
      await salesOrdersApi.delete(orderId)
      dispatch(removeOrder(orderId))
      toast.success('Order deleted successfully')
    } catch (err) {
      toast.error('Failed to delete order')
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const columns = [
    { key: 'orderId', label: 'Order ID' },
    { key: 'invoiceNo', label: 'Invoice No' },
    { key: 'customerName', label: 'Customer' },
    {
      key: 'invoiceDate', label: 'Invoice Date',
      render: (row) => new Date(row.invoiceDate).toLocaleDateString()
    },
    { key: 'referenceNo', label: 'Reference No' },
    {
      key: 'totalExcl', label: 'Total Excl',
      render: (row) => row.totalExcl.toLocaleString()
    },
    {
      key: 'totalTax', label: 'Total Tax',
      render: (row) => row.totalTax.toLocaleString()
    },
    {
      key: 'totalIncl', label: 'Total Incl',
      render: (row) => row.totalIncl.toLocaleString()
    },
    {
      key: 'actions', label: '',
      render: (row) => (
        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/sales-order/${row.orderId}`)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(row.orderId)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ]

  return (
    <div>
      <PageHeader title="Home">
        <Button onClick={() => navigate('/sales-order')}>
          + Add New
        </Button>
      </PageHeader>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : (
        <DataTable
          columns={columns}
          data={orders}
          onRowDoubleClick={(row) => navigate(`/sales-order/${row.orderId}`)}
        />
      )}
    </div>
  )
}

export default Home