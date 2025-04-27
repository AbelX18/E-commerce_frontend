import { useContext, useEffect, useRef } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { TbPhotoPlus } from 'react-icons/tb'
import { ProductFormData } from '../../schema/productSchema'
import { ThemeContext } from '../../context/ThemeProvider'
import { clsx } from 'clsx'

interface Props {
  image?: string
  register: UseFormRegister<ProductFormData>
  setValue: UseFormSetValue<ProductFormData>
  readOnly?: boolean
}

declare global {
  interface Window {
    cloudinary: any
  }
}

export default function ImageUpload({ image, register, setValue, readOnly }: Props) {
  const { darkMode } = useContext(ThemeContext)
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
  }, [setValue]) 

  const openWidget = () => {
    widgetRef.current?.open()
  }

  return (
    <div className="space-y-6 mt-6">
      {!readOnly && (
        <>
          <label className={clsx(
            "text-lg font-semibold block",
            darkMode ? "text-gray-300" : "text-gray-800"
          )}>
            Imagen del Producto
          </label>

          <div
            onClick={openWidget}
            className={clsx(
              "relative cursor-pointer transition-all duration-300 p-8 flex flex-col justify-center items-center gap-4",
              "rounded-xl border-2 border-dashed hover:shadow-lg",
              "group hover:-translate-y-1",
              darkMode 
                ? "border-gray-600 bg-gray-700/50 text-gray-300 hover:border-red-500 hover:bg-gray-700/80 hover:shadow-red-900/30"
                : "border-gray-300 bg-gray-100 text-gray-600 hover:border-blue-500 hover:bg-gray-200 hover:shadow-blue-900/20"
            )}
          >
            <TbPhotoPlus 
              size={50} 
              className={clsx(
                "transition-colors duration-300",
                darkMode ? "group-hover:text-red-400" : "group-hover:text-blue-600"
              )} 
            />
            <p className="text-lg font-semibold">Agregar Imagen</p>
            <p className="text-sm opacity-80">Haz clic para subir</p>
          </div>
        </>
      )}

      {image && (
        <div className="space-y-4">
          <p className={clsx(
            "font-semibold",
            darkMode ? "text-gray-300" : "text-gray-700"
          )}>
            Imagen actual:
          </p>
          <div className={clsx(
            "p-2 rounded-lg inline-block",
            darkMode ? "bg-gray-700/50 border border-gray-600" : "bg-gray-100 border border-gray-300"
          )}>
            <img
              src={image}
              alt="Imagen actual del producto"
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>
      )}

      <input 
        type="hidden"
        disabled={readOnly}
        {...register('image', { required: 'La imagen es obligatoria' })}
      />
    </div>
  )
}