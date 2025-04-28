import { Fragment } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { ProductFormData } from "../../schema/productSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct } from "../../api/ProductAPI"
import { toast } from "react-toastify"
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import ProductForm from "./ProductForm"
import { clsx } from "clsx"
import { ThemeContext } from "../../context/ThemeProvider"
import { useContext } from "react"

export default function AddProductModal() {
    const { darkMode } = useContext(ThemeContext)
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalProduct = queryParams.get('newProduct')
    const show = modalProduct ? true : false

    const { register, handleSubmit, reset, setValue } = useForm<ProductFormData>({})
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createProduct,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success('Producto cargado con éxito!!')
            reset()
            navigate(location.pathname, { replace: true })
        }
    })

    const handleCreateProduct = (formData: ProductFormData) => {
        mutate(formData)
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
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
                                    "w-full max-w-4xl transform overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all p-8 md:p-12",
                                    darkMode 
                                        ? "bg-gray-800 shadow-red-900/30 border border-gray-700" 
                                        : "bg-white shadow-blue-900/20 border border-gray-200"
                                )}>
                                    <DialogTitle
                                        as="h3"
                                        className={clsx(
                                            "font-black text-3xl md:text-4xl mb-6",
                                            darkMode 
                                                ? "text-arkadia-gradient-dark" 
                                                : "text-arkadia-gradient"
                                        )}
                                    >
                                        Nuevo Producto
                                    </DialogTitle>

                                    <p className={clsx(
                                        "text-lg md:text-xl font-bold mb-8",
                                        darkMode ? "text-gray-300" : "text-gray-600"
                                    )}>
                                        Llena el formulario y carga {''}
                                        <span className={clsx(
                                            darkMode ? "text-red-400" : "text-red-600",
                                            "font-extrabold"
                                        )}>
                                            un producto
                                        </span>
                                    </p>

                                    <form
                                        className='mt-6 space-y-6'
                                        noValidate
                                        onSubmit={handleSubmit(handleCreateProduct)}
                                    >
                                        <ProductForm
                                            product={null}
                                            register={register}
                                            setValue={setValue}
                                            readOnly={false}
                                        />
                                        <input
                                            type="submit"
                                            className={clsx(
                                                "w-full py-3 px-6 rounded-lg font-bold uppercase cursor-pointer transition-all duration-300",
                                                "hover:shadow-lg hover:-translate-y-0.5 active:scale-95",
                                                darkMode 
                                                    ? "bg-gradient-to-r from-red-700 to-red-900 hover:shadow-red-900/40 hover:from-red-800 hover:to-red-950" 
                                                    : "bg-gradient-to-r from-red-600 to-red-800 hover:shadow-red-900/30 hover:from-red-700 hover:to-red-900",
                                                "text-white"
                                            )}
                                            value='Cargar Producto'
                                        />
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}