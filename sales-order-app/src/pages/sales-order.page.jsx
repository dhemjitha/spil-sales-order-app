import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { addOrder, updateOrder } from '@/lib/features/salesOrderSlice'
import { clientsApi, itemsApi, salesOrdersApi } from '@/lib/services/api/api'
import PageHeader from '../components/shared/PageHeader'
import OrderHeader from '../components/shared/OrderForm/OrderHeader'
import OrderLines from '../components/shared/OrderForm/OrderLines'
import OrderTotals from '../components/shared/OrderForm/OrderTotals'
import { Button } from '../components/ui/button'
import { toast } from 'sonner'

const emptyLine = {
  itemId: null, note: '', quantity: 0,
  price: 0, taxRate: 0, exclAmount: 0,
  taxAmount: 0, inclAmount: 0
}

const toNonNegativeNumber = (value) => {
  const numberValue = Number(value)
  if (!Number.isFinite(numberValue)) return 0
  return Math.max(0, numberValue)
}

const normalizeLine = (line) => {
  const quantity = toNonNegativeNumber(line.quantity)
  const price = toNonNegativeNumber(line.price)
  const taxRate = toNonNegativeNumber(line.taxRate)
  const exclAmount = quantity * price
  const taxAmount = exclAmount * taxRate / 100

  return {
    ...line,
    quantity,
    price,
    taxRate,
    exclAmount,
    taxAmount,
    inclAmount: exclAmount + taxAmount,
  }
}

const SalesOrder = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [clients, setClients] = useState([])
  const [items, setItems] = useState([])
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    clientId: null, invoiceNo: '', invoiceDate: '',
    referenceNo: '', note: '', address1: '', address2: '',
    address3: '', suburb: '', state: '', postCode: '',
  })
  const [lines, setLines] = useState([{ ...emptyLine }])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [clientsData, itemsData] = await Promise.all([
          clientsApi.getAll(),
          itemsApi.getAll(),
        ])
        setClients(clientsData)
        setItems(itemsData)

        if (id) {
          const order = await salesOrdersApi.getById(id)
          setFormData({
            clientId: order.clientId,
            invoiceNo: order.invoiceNo,
            invoiceDate: order.invoiceDate,
            referenceNo: order.referenceNo,
            note: order.note || '',
            address1: order.address1,
            address2: order.address2,
            address3: order.address3,
            suburb: order.suburb,
            state: order.state,
            postCode: order.postCode,
          })
          setLines(order.orderLines.map(l => normalizeLine({
            itemId: l.itemId,
            note: l.note,
            quantity: l.quantity,
            price: l.price,
            taxRate: l.taxRate,
          })))
        }
      } catch (err) {
        toast.error('Failed to load data')
      }
    }

    loadData()
  }, [id])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleClientChange = (clientId) => {
    const client = clients.find(c => c.clientId === parseInt(clientId))
    if (client) {
      setFormData(prev => ({
        ...prev,
        clientId: client.clientId,
        address1: client.address1,
        address2: client.address2,
        address3: client.address3,
        suburb: client.suburb,
        state: client.state,
        postCode: client.postCode,
      }))
    }
  }

  const handleLineChange = (index, field, value) => {
    setLines(prev => {
      const updated = [...prev]
      updated[index] = normalizeLine({ ...updated[index], [field]: value })
      return updated
    })
  }

  const totalExcl = lines.reduce((sum, l) => sum + (l.exclAmount || 0), 0)
  const totalTax = lines.reduce((sum, l) => sum + (l.taxAmount || 0), 0)
  const totalIncl = lines.reduce((sum, l) => sum + (l.inclAmount || 0), 0)

  const handleSave = async () => {
    // Basic validation
    if (!formData.clientId) {
      toast.error('Please select a customer')
      return
    }
    if (!formData.invoiceNo) {
      toast.error('Please enter an invoice number')
      return
    }
    if (!formData.invoiceDate) {
      toast.error('Please select an invoice date')
      return
    }
    if (lines.some(l => !l.itemId)) {
      toast.error('Please select an item for all lines')
      return
    }

    try {
      setSaving(true)
      const payload = {
        ...formData,
        clientId: parseInt(formData.clientId),
        invoiceDate: new Date(formData.invoiceDate).toISOString(),
        totalExcl,
        totalTax,
        totalIncl,
        orderLines: lines.map(l => ({
          itemId: l.itemId,
          note: l.note || '',
          quantity: l.quantity,
          price: l.price,
          taxRate: l.taxRate,
          exclAmount: l.exclAmount,
          taxAmount: l.taxAmount,
          inclAmount: l.inclAmount,
        }))
      }

      if (id) {
        const updated = await salesOrdersApi.update(id, payload)
        dispatch(updateOrder(updated))
        toast.success('Order updated successfully')
      } else {
        const created = await salesOrdersApi.create(payload)
        dispatch(addOrder(created))
        toast.success('Order created successfully')
      }

      navigate('/')
    } catch (err) {
      toast.error('Failed to save order')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <PageHeader title="Sales Order">
        <Button variant="outline" onClick={() => navigate('/')}>← Back</Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : '💾 Save Order'}
        </Button>
      </PageHeader>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <OrderHeader
          clients={clients}
          formData={formData}
          onChange={handleChange}
          onClientChange={handleClientChange}
        />
        <OrderLines
          lines={lines}
          items={items}
          onChange={handleLineChange}
          onAdd={() => setLines(prev => [...prev, { ...emptyLine }])}
          onRemove={(i) => setLines(prev => prev.filter((_, idx) => idx !== i))}
        />
        <OrderTotals
          totalExcl={totalExcl}
          totalTax={totalTax}
          totalIncl={totalIncl}
        />
      </div>
    </div>
  )
}

export default SalesOrder