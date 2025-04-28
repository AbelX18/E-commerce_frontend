import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Product, ProductFormData } from "../../schema/productSchema"
import { deleteProduct } from "../../api/ProductAPI"
import { toast } from "react-toastify"
import { Transition, Dialog, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/react"
import { Fragment } from "react/jsx-runtime"
import { clsx } from "clsx"
import { ThemeContext } from "../../context/ThemeProvider"
import { useContext } from "react"

type DeleteProductModalProps = {
  product: ProductFormData
  productId: Product['id']
  onClose: () => void
}

export default function DeleteProductModal({ product, productId, onClose }: DeleteProductModalProps) {
  const { darkMode } = useContext(ThemeContext)
  const show = productId ? true : false

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onError(error) {
      toast.error(error.message)
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Producto Eliminado Correctamente')
      onClose()
    }
  })

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={clsx(
            "fixed inset-0",
            darkMode ? "bg-black/70 backdrop-blur-sm" : "bg-black/60"
          )} />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className={clsx(
                "w-full max-w-2xl transform overflow-hidden rounded-2xl text-center align-middle shadow-xl transition-all p-8 md:p-10",
                darkMode
                  ? "bg-gray-800 shadow-red-900/30 border border-gray-700"
                  : "bg-white shadow-blue-900/20 border border-gray-200"
              )}>
                <DialogTitle
                  as="h3"
                  className={clsx(
                    "font-black text-3xl md:text-4xl mb-4",
                    darkMode
                      ? "text-arkadia-gradient-dark"
                      : "text-arkadia-gradient"
                  )}
                >
                  Eliminar Producto
                </DialogTitle>

                <p className={clsx(
                  "text-lg md:text-xl font-bold mb-6",
                  darkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  ¿Estás seguro de eliminar el producto:{' '}
                  <span className={clsx(
                    "font-extrabold",
                    darkMode ? "text-red-400" : "text-red-600"
                  )}>
                    {product.name}
                  </span>?
                </p>

                <div className="flex justify-center my-6">
                  <img
                    src={product.image}
                    alt="Imagen actual"
                    className={clsx(
                      "w-48 h-48 md:w-64 md:h-64 object-contain rounded-lg",
                      darkMode ? "border-gray-600" : "border-gray-300",
                      "border-2 shadow-inner"
                    )}
                  />
                </div>

                <div className="mt-8 flex gap-4 justify-center">
                  <button
                    onClick={onClose}
                    className={clsx(
                      "px-6 py-3 rounded-lg font-bold uppercase transition-all duration-300",
                      "hover:shadow-lg hover:-translate-y-0.5 active:scale-95",
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 hover:shadow-gray-900/40 text-white"
                        : "bg-gray-200 hover:bg-gray-300 hover:shadow-gray-900/20 text-gray-800",
                      "border",
                      darkMode ? "border-gray-600" : "border-gray-300"
                    )}
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={() => mutate({ productId })}
                    className={clsx(
                      "px-6 py-3 rounded-lg font-bold uppercase transition-all duration-300",
                      "hover:shadow-lg hover:-translate-y-0.5 active:scale-95",
                      darkMode
                        ? "bg-gradient-to-r from-red-700 to-red-900 hover:shadow-red-900/40 hover:from-red-800 hover:to-red-950"
                        : "bg-gradient-to-r from-red-600 to-red-800 hover:shadow-red-900/30 hover:from-red-700 hover:to-red-900",
                      "text-white"
                    )}
                  >
                    Eliminar
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}