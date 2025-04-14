import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { CategoryForm } from "../../schema/categorySchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory } from "../../api/CategoryAPI"
import { toast } from "react-toastify"
import { Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"

export default function AddCategoryModal() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryPrams = new URLSearchParams(location.search)
    const modalCategory = queryPrams.get('newCategory')
    const show = modalCategory ? true : false

    const { register, handleSubmit, reset } = useForm<CategoryForm>({})
    const queryClinet = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createCategory,
        onError(error){
            toast.error(error.message)
        },
        onSuccess(){
            queryClinet.invalidateQueries({queryKey:['Categories']})
            toast.success('Categoria fue cargada con exito!!')
            reset()
            navigate(location.pathname,{replace:true})
        }
    })

    const handleCreateCategory = (formData:CategoryForm) => {
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
                                        <DialogPanel 
                                          className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                            <DialogTitle
                                                as="h3"
                                                className="font-black text-4xl  my-5"
                                            >
                                                Categoria
                                            </DialogTitle>
        
                                            <p className="text-xl font-bold">Llena el formulario y carga la Categoria
                                            </p>
                                            <form 
                                                className='mt-10 space-y-3'
                                                noValidate
                                                onSubmit= {handleSubmit(handleCreateCategory)}
                                            >
                                               <div className="flex flex-col gap-5">
                                                    <label className="font-normal text-2xl" >
                                                    Categoria
                                                    </label>
                                                    <input
                                                    type="Category"
                                                    placeholder="Categoria"
                                                    className="w-full p-3  border-gray-300 border"
                                                    {...register("name", {
                                                        required: "La Categoria es obligatorio"
                                                    })}
                                                    />
                                                    </div>  
        
                                                <input type="submit" 
                                                    className=" bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                                    value='Cargar Categoria'
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
