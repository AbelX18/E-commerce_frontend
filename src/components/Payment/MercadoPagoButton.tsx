import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react'

interface MercadoPagoButtonProps {
  preferenceId: string
  onSuccess?: () => void
  onError?: () => void
}

const MercadoPagoButton = ({ preferenceId }: MercadoPagoButtonProps) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_PUBLIC_KEY_MP, {
      locale: 'es-AR'
    })
    setIsReady(true)
  }, [])

  if (!isReady) {
    return <div>Cargando...</div>
  }

  return (
    <div className="w-full">
      <Wallet 
        initialization={{ preferenceId }}
      />
    </div>
  )
}

export default MercadoPagoButton 