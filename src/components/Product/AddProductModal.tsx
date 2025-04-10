import { Fragment } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate} from "react-router-dom"
import { ProductFormData } from "../../schema/productSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct } from "../../api/ProductAPI"
import {toast} from "react-toastify"
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import ProductForm from "./ProductForm"


export default function AddProductModal() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalProduct = queryParams.get('newProduct')
    const show = modalProduct ? true : false


    const { register,handleSubmit, reset, setValue} = useForm<ProductFormData>({})
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createProduct,
        onError:(error) =>{
            toast.error(error.message)
        },
        onSuccess:(data) => {
            queryClient.invalidateQueries({queryKey:['products']})
            toast.success(data)
            reset()
            navigate(location.pathname,{replace: true})
        }
    })

    const handleCreateProduct = (formData: ProductFormData) => {
        console.log(formData)    
        mutate(formData)
    }

    return (
    <>
    <Transition appear show={show} as={Fragment}>
               <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname,{replace: true})}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
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
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nuevo Producto
                                    </DialogTitle>

                                    <p className="text-xl font-bold">Llena el formulario y carga  {''}
                                        <span className="text-red-600">un producto</span>
                                    </p>
                                    <form 
                                        className='mt-10 space-y-3'
                                        noValidate
                                        onSubmit= {handleSubmit(handleCreateProduct)}
                                    >
                                        <ProductForm 
                                            product={null}
                                            register={register}
                                            setValue={setValue}
                                        />
                                        <input type="submit" 
                                            className=" bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
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
