import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Product, ProductFormData } from "../../schema/productSchema"
import { deleteProduct } from "../../api/ProductAPI"
import { toast } from "react-toastify"
import { Transition, Dialog, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/react"
import { Fragment } from "react/jsx-runtime"


type DeleteProductModalProps ={
  product: ProductFormData
  productId: Product['id']
  onClose: () => void
}

export default function DeleteProductModal({product, productId, onClose}: DeleteProductModalProps) {
  let show= productId ? true : false

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: deleteProduct,
    onError(error) {
      toast.error(error.message)
    },
    onSuccess(){
      queryClient.invalidateQueries({queryKey:['products']})
      toast.success('Producto Elminado Correctamente')
      onClose()
    }
  })

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
                                    <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-center align-middle shadow-xl transition-all p-16">
                                        <DialogTitle
                                            as="h3"
                                            className="font-black text-4xl  my-5"
                                        >
                                            Producto
                                        </DialogTitle>
                                        
                                        <p className="text-xl font-bold">Estas seguro de eliminar el producto:{' '}
                                            <span className="text-red-600">{product.name}</span>?
                                        </p>
                                        <div className="flex justify-center my-6">
                                          <img
                                            src={product.image}
                                            alt="Imagen actual"
                                            className="w-64 h-64 object-contain border border-gray-300"
                                          />
                                        </div>
                                        <form 
                                            className='mt-10 space-y-3'
                                            noValidate
                                            onSubmit= {() => mutate({ productId })}
                                        >
                                            <input type="submit" 
                                                className=" bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                                value='Eliminar Producto'
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
