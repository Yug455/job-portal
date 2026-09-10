import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import appRouter from './components/Routes/Routes'
import { Provider } from 'react-redux'
import appStore from './utilites/store'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
    <RouterProvider router={appRouter}/>
    </Provider>
  </StrictMode>,
)
