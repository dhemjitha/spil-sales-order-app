import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import RootLayout from './layouts/root-layout.layout'
import Home from './pages/home.page'
import SalesOrder from './pages/sales-order.page'
import { Provider } from 'react-redux'
import { store } from './lib/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="sales-order" element={<SalesOrder />} />
            <Route path="sales-order/:id" element={<SalesOrder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)