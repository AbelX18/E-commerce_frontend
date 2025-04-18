import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react'

interface MercadoPagoButtonProps {
  preferenceId: string
  onSuccess?: () => void
  onError?: () => void
}

const MercadoPagoButton = ({ preferenceId, onSuccess, onError }: MercadoPagoButtonProps) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Aqui se inicializa mp con la clave pública
    // Abel si lees esto es fundamental que se pase como VITE_algo
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
        customization={{ texts: { valueProp: 'smart_option' } }}
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  )
}

export default MercadoPagoButton 