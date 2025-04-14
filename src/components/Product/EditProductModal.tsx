import { Fragment} from 'react'
import { updateProduct } from '../../api/ProductAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product, ProductFormData } from '../../schema/productSchema'
import ProductForm from './ProductForm'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'

type EditProductModalProps = {
    product: ProductFormData
    productId: Product['id']
    onClose: () => void
}

export default function EditProductModal({product, productId, onClose}: EditProductModalProps) {
    let show = productId ? true : false

    const queryClient = useQueryClient()

    const {register, handleSubmit, setValue} = useForm<ProductFormData>({defaultValues:{
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        image: product.image,
        categoryId: product.categoryId
    }})
    
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
    <>

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
                                            Producto
                                        </DialogTitle>
    
                                        <p className="text-xl font-bold">Modifica el formulario del producto:{' '}
                                            <span className="text-red-600">{product.name}</span>
                                        </p>
                                        <form 
                                            className='mt-10 space-y-3'
                                            noValidate
                                            onSubmit= {handleSubmit(handleUpdateProduct)}
                                        >
                                            <ProductForm 
                                                product={product}
                                                register={register}
                                                setValue={setValue}
                                                readOnly={false}
                                            />
                                            <input type="submit" 
                                                className=" bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                                value='Modifica el Producto'
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
