import { useEffect, useState } from "react"
import { getAllCategories } from "../../api/CategoryAPI"
import { Category } from "../../schema/categorySchema"
import { UseFormRegister, UseFormSetValue } from "react-hook-form"
import { ProductFormData } from "../../schema/productSchema"
import ImageUpload from "../Image/ImageUpload"

type ProductFormProps = {
  product: ProductFormData | null
  register: UseFormRegister<ProductFormData>
  setValue: UseFormSetValue<ProductFormData>
}

export default function ProductForm({ product, register,setValue }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getAllCategories().then(data => setCategories(data))
  }, [])

  return (
    <>
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="name">Nombre del Producto</label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="w-full p-3 border-gray-300 border"
          placeholder="Nombre del producto"
          defaultValue={product?.name}
        />
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="price">Precio:</label>
        <input
          {...register("price", { valueAsNumber: true })}
          id="price"
          className="w-full p-3 border-gray-300 border"
          placeholder="Precio del Producto"
          defaultValue={product?.price}
        />
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="quantity">Cantidad:</label>
        <input
          {...register("quantity", { valueAsNumber: true })}
          id="quantity"
          className="w-full p-3 border-gray-300 border"
          placeholder="Cantidad del Producto"
          defaultValue={product?.quantity}
        />
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="categoryId">Categoría:</label>
        <select
          {...register("categoryId", { valueAsNumber: true })}
          className="block w-full p-3 bg-slate-100"
          id="categoryId"
          defaultValue={product?.categoryId}
        >
          <option value="">-- Seleccione --</option>
          {categories?.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="description">Descripción del producto</label>
        <textarea
          {...register("description")}
          id="description"
          placeholder="Descripción del producto"
          className="w-full p-3 border-gray-300 border"
          defaultValue={product?.description}
        />
      </div>

      <ImageUpload image={product?.image} register={register} setValue={setValue} />
    </>
  )
}
