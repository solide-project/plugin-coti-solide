import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SolidePluginProvider } from "@/lib/plugins/provider.tsx"
import { NativePluginProvider } from './components/native-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SolidePluginProvider>
      <NativePluginProvider>
        <App />
      </NativePluginProvider>
    </SolidePluginProvider>
  </StrictMode>,
)
