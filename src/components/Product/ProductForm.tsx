import { useEffect, useState, useContext } from "react"
import { getAllCategories } from "../../api/CategoryAPI"
import { Category } from "../../schema/categorySchema"
import { UseFormRegister, UseFormSetValue } from "react-hook-form"
import { ProductFormData } from "../../schema/productSchema"
import ImageUpload from "../Image/ImageUpload"
import { clsx } from "clsx"
import { ThemeContext } from "../../context/ThemeProvider"

type ProductFormProps = {
  product: ProductFormData | null
  register: UseFormRegister<ProductFormData>
  setValue: UseFormSetValue<ProductFormData>
  readOnly?: boolean
}

export default function ProductForm({ product, register, setValue, readOnly }: ProductFormProps) {
  const { darkMode } = useContext(ThemeContext)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getAllCategories().then(data => setCategories(data))
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <label 
          className={clsx(
            "font-semibold text-lg md:text-xl",
            darkMode ? "text-gray-300" : "text-gray-700"
          )} 
          htmlFor="name"
        >
          Nombre del Producto
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className={clsx(
            "w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all",
            darkMode 
              ? "bg-gray-700 border-gray-600 focus:border-red-500 focus:ring-red-900/50 text-white placeholder-gray-400" 
              : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/50 text-gray-800 placeholder-gray-500",
            readOnly && "opacity-70 cursor-not-allowed"
          )}
          placeholder="Nombre del producto"
          defaultValue={product?.name}
          disabled={readOnly}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label 
          className={clsx(
            "font-semibold text-lg md:text-xl",
            darkMode ? "text-gray-300" : "text-gray-700"
          )} 
          htmlFor="price"
        >
          Precio
        </label>
        <input
          {...register("price", { valueAsNumber: true })}
          id="price"
          type="number"
          step="0.01"
          className={clsx(
            "w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all",
            darkMode 
              ? "bg-gray-700 border-gray-600 focus:border-red-500 focus:ring-red-900/50 text-white placeholder-gray-400" 
              : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/50 text-gray-800 placeholder-gray-500",
            readOnly && "opacity-70 cursor-not-allowed"
          )}
          placeholder="Precio del Producto"
          defaultValue={product?.price}
          disabled={readOnly}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label 
          className={clsx(
            "font-semibold text-lg md:text-xl",
            darkMode ? "text-gray-300" : "text-gray-700"
          )} 
          htmlFor="quantity"
        >
          Cantidad
        </label>
        <input
          {...register("quantity", { valueAsNumber: true })}
          id="quantity"
          type="number"
          className={clsx(
            "w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all",
            darkMode 
              ? "bg-gray-700 border-gray-600 focus:border-red-500 focus:ring-red-900/50 text-white placeholder-gray-400" 
              : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/50 text-gray-800 placeholder-gray-500",
            readOnly && "opacity-70 cursor-not-allowed"
          )}
          placeholder="Cantidad del Producto"
          defaultValue={product?.quantity}
          disabled={readOnly}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label 
          className={clsx(
            "font-semibold text-lg md:text-xl",
            darkMode ? "text-gray-300" : "text-gray-700"
          )} 
          htmlFor="categoryId"
        >
          Categoría
        </label>
        {readOnly ? (
          <input
            type="text"
            className={clsx(
              "block w-full p-3 rounded-lg border",
              darkMode 
                ? "bg-gray-700 border-gray-600 text-gray-300" 
                : "bg-gray-100 border-gray-300 text-gray-700",
              "cursor-not-allowed"
            )}
            value={categories.find(c => c.id === product?.categoryId)?.name ?? ''}
            readOnly
          />
        ) : (
          <select
            {...register("categoryId", { valueAsNumber: true })}
            className={clsx(
              "block w-full p-3 rounded-lg border focus:ring-2 focus:outline-none",
              darkMode 
                ? "bg-gray-700 border-gray-600 focus:border-red-500 focus:ring-red-900/50 text-white" 
                : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/50 text-gray-800"
            )}
            id="categoryId"
            defaultValue={product?.categoryId}
          >
            <option value="">-- Seleccione --</option>
            {categories?.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <label 
          className={clsx(
            "font-semibold text-lg md:text-xl",
            darkMode ? "text-gray-300" : "text-gray-700"
          )} 
          htmlFor="description"
        >
          Descripción del producto
        </label>
        <textarea
          {...register("description")}
          id="description"
          rows={4}
          className={clsx(
            "w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all",
            darkMode 
              ? "bg-gray-700 border-gray-600 focus:border-red-500 focus:ring-red-900/50 text-white placeholder-gray-400" 
              : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/50 text-gray-800 placeholder-gray-500",
            readOnly && "opacity-70 cursor-not-allowed"
          )}
          placeholder="Descripción del producto"
          defaultValue={product?.description}
          disabled={readOnly}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label 
          className={clsx(
            "font-semibold text-lg md:text-xl",
            darkMode ? "text-gray-300" : "text-gray-700"
          )}
        >
          Imagen del producto
        </label>
        <ImageUpload 
          image={product?.image} 
          register={register} 
          setValue={setValue} 
          readOnly={readOnly}
        />
      </div>
    </div>
  )
}