// Importar createRoot de react-dom
import { createRoot } from 'react-dom/client'
import { App } from './src/App.jsx'
import './index.css'

// Con createRoot obtengo donde quiero renderizar mi app.
const root = createRoot(document.getElementById('app'))

// Primer componente de React que voy a renderizar.
root.render(<App />)
