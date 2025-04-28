import { Fragment, useContext } from 'react'
import { updateProduct } from '../../api/ProductAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product, ProductFormData } from '../../schema/productSchema'
import ProductForm from './ProductForm'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { clsx } from 'clsx'
import { ThemeContext } from '../../context/ThemeProvider'

type EditProductModalProps = {
    product: ProductFormData
    productId: Product['id']
    onClose: () => void
}

export default function EditProductModal({product, productId, onClose}: EditProductModalProps) {
    const { darkMode } = useContext(ThemeContext)
    const show = productId ? true : false

    const queryClient = useQueryClient()

    const {register, handleSubmit, setValue} = useForm<ProductFormData>({
        defaultValues: {
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            image: product.image,
            categoryId: product.categoryId
        }
    })
    
    const {mutate} = useMutation({
        mutationFn: updateProduct,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ['products']})
            toast.success("Producto Actualizado Correctamente")
            onClose()
        },
    })

    const handleUpdateProduct = (formData: ProductFormData) => {
        const data = {
            productId,
            formData
        }
        mutate(data)
    }

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
                                    Editar Producto
                                </DialogTitle>

                                <p className={clsx(
                                    "text-lg md:text-xl font-bold mb-8",
                                    darkMode ? "text-gray-300" : "text-gray-600"
                                )}>
                                    Modifica los datos de:{' '}
                                    <span className={clsx(
                                        darkMode ? "text-red-400" : "text-red-600",
                                        "font-extrabold"
                                    )}>
                                        {product.name}
                                    </span>
                                </p>

                                <form 
                                    className='mt-6 space-y-6'
                                    noValidate
                                    onSubmit={handleSubmit(handleUpdateProduct)}
                                >
                                    <ProductForm 
                                        product={product}
                                        register={register}
                                        setValue={setValue}
                                        readOnly={false}
                                    />

                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className={clsx(
                                                "flex-1 py-3 rounded-lg font-bold uppercase transition-all duration-300",
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
                                            type="submit"
                                            className={clsx(
                                                "flex-1 py-3 rounded-lg font-bold uppercase transition-all duration-300",
                                                "hover:shadow-lg hover:-translate-y-0.5 active:scale-95",
                                                darkMode
                                                    ? "bg-gradient-to-r from-red-700 to-red-900 hover:shadow-red-900/40 hover:from-red-800 hover:to-red-950"
                                                    : "bg-gradient-to-r from-red-600 to-red-800 hover:shadow-red-900/30 hover:from-red-700 hover:to-red-900",
                                                "text-white"
                                            )}
                                        >
                                            Guardar Cambios
                                        </button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}