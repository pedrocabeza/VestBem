import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './ProductApp'
import './styles.css'
import './product.css'
import './enhancements.css'
import './experience.css'
import './member.css'

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
)
