import { Fragment } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category, CategoryForm } from "../../schema/categorySchema";
import { updateCategory } from "../../api/CategoryAPI";
import { toast } from "react-toastify";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useForm } from "react-hook-form";

type EditCategoryModalProps={
    id: Category['id']
    category: Category['name']
    onClose: () => void
}

export default function EditCategoryModal({id,category, onClose}: EditCategoryModalProps) {
    let show = id? true: false

    const { register, handleSubmit, reset} = useForm<CategoryForm>({})
    const queryClient = useQueryClient()
    
    const {mutate} = useMutation({
        mutationFn: updateCategory,
        onError(error){
            toast.error(error.message)
        },
        onSuccess(){
            queryClient.invalidateQueries({queryKey:['Categories']})
            toast.success('Categoria fue editada correctamente!!')
            reset()
            onClose()
        }
    })

    const handleEditCategory = (formData:CategoryForm) => {
        const data ={
            formData,
            id
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
                                    <DialogPanel
                                        className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                        <DialogTitle
                                            as="h3"
                                            className="font-black text-4xl  my-5"
                                        >
                                            Editar Categoria
                                        </DialogTitle>
    
                                        <p className="text-xl font-bold">Llena el formulario y edita la Categoria
                                        </p>
                                        <form 
                                            className='mt-10 space-y-3'
                                            noValidate
                                            onSubmit= {handleSubmit(handleEditCategory)}
                                        >
                                            <div className="flex flex-col gap-5">
                                                <label className="font-normal text-2xl" >
                                                Categoria
                                                </label>
                                                <input
                                                type="Category"
                                                placeholder="Categoria"
                                                className="w-full p-3  border-gray-300 border"
                                                defaultValue={category}
                                                {...register("name", {
                                                    required: "La Categoria es obligatorio"
                                                })}
                                                />
                                                </div>  
    
                                            <input type="submit" 
                                                className=" bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                                value='Editar Categoria'
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
