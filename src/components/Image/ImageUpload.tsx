import { useEffect, useRef, useState } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { TbPhotoPlus } from 'react-icons/tb'
import { ProductFormData } from '../../schema/productSchema'

interface Props {
  image?: string
  register: UseFormRegister<ProductFormData>
  setValue: UseFormSetValue<ProductFormData>
}

declare global {
  interface Window {
    cloudinary: any
  }
}

export default function ImageUpload({ image, register, setValue }: Props) {
  const [imageUrl, setImageUrl] = useState<string>('')
  const widgetRef = useRef<any>(null)

  useEffect(() => {
    const createWidget = () => {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: 'dpyuoj9gg',
          uploadPreset: 'p44gwruf',
          maxFiles: 1,
        },
        (error: any, result: any) => {
          if (!error && result.event === 'success') {
            const url = result.info.secure_url
            setImageUrl(url)
            setValue('image', url) 
          }
        }
      )
    }

    if (!window.cloudinary) {
      const script = document.createElement('script')
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js'
      script.async = true
      script.onload = createWidget
      document.body.appendChild(script)
    } else {
      createWidget()
    }
  }, []) 

  const openWidget = () => {
    widgetRef.current && widgetRef.current.open()
  }

  return (
    <div className="space-y-4 mt-5">
      <label className="text-slate-800 font-semibold text-lg block">Imagen del Producto</label>

      <div
        onClick={openWidget}
        className="relative cursor-pointer hover:opacity-70 transition p-10 border border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
      >
        <TbPhotoPlus size={50} />
        <p className="text-lg font-semibold">Agregar Imagen</p>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Vista previa"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}
      </div>

      {image && !imageUrl && (
        <div className="space-y-2">
          <p className="font-semibold">Imagen actual:</p>
          <img
            src={image}
            alt="Imagen actual"
            className="w-64 h-64 object-contain border border-gray-300"
          />
        </div>
      )}

      <input 
        type="hidden"
        {...register('image', { required: 'La imagen es obligatoria' })}
      />
    </div>
  )
}
