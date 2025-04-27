import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { CategoryForm } from "../../schema/categorySchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory } from "../../api/CategoryAPI"
import { toast } from "react-toastify"
import { Fragment, useContext } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { ThemeContext } from "../../context/ThemeProvider"
import { clsx } from "clsx"

export default function AddCategoryModal() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalCategory = queryParams.get('newCategory')
    const show = modalCategory ? true : false
    const { darkMode } = useContext(ThemeContext)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryForm>({})
    const queryClient = useQueryClient()
    
    const { mutate } = useMutation({
        mutationFn: createCategory,
        onError(error: Error){
            toast.error(error.message)
        },
        onSuccess(){
            queryClient.invalidateQueries({queryKey:['Categories']})
            toast.success('¡Categoría cargada con éxito!')
            reset()
            navigate(location.pathname, {replace:true})
        }
    })

    const handleCreateCategory = (formData: CategoryForm) => {
        mutate(formData)
    }

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => navigate(location.pathname,{replace: true})}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
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
                                className={clsx(
                                    "w-full max-w-md transform overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all p-8",
                                    "border-2",
                                    darkMode 
                                        ? "bg-gray-800 border-red-900 shadow-red-900/30" 
                                        : "bg-white border-blue-200 shadow-blue-900/20"
                                )}>
                                <DialogTitle
                                    as="h3"
                                    className={clsx(
                                        "font-bold text-3xl mb-6",
                                        darkMode ? "text-arkadia-gradient-dark" : "text-arkadia-gradient"
                                    )}
                                >
                                    Nueva Categoría
                                </DialogTitle>

                                <p className={clsx(
                                    "text-lg mb-8",
                                    darkMode ? "text-gray-300" : "text-gray-600"
                                )}>
                                    Completa el formulario para agregar una nueva categoría
                                </p>
                                
                                <form 
                                    className='space-y-6'
                                    noValidate
                                    onSubmit={handleSubmit(handleCreateCategory)}
                                >
                                    <div className="flex flex-col gap-2">
                                        <label className={clsx(
                                            "font-medium text-lg",
                                            darkMode ? "text-gray-300" : "text-gray-700"
                                        )}>
                                            Nombre de la categoría
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ej: Cómics, Mangas, etc."
                                            className={clsx(
                                                "w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2",
                                                "transition-all duration-200",
                                                darkMode
                                                    ? "bg-gray-700 border-gray-600 focus:border-red-500 focus:ring-red-500/30 text-white"
                                                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/30 text-gray-800",
                                                errors.name && "border-red-500"
                                            )}
                                            {...register("name", {
                                                required: "El nombre es obligatorio"
                                            })}
                                        />
                                        {errors.name && (
                                            <span className="text-red-500 text-sm">{errors.name.message}</span>
                                        )}
                                    </div>  

                                    <div className="flex justify-end gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => navigate(location.pathname, {replace: true})}
                                            className={clsx(
                                                "px-6 py-2 rounded-lg font-medium transition-all",
                                                "border-2 hover:shadow-md",
                                                darkMode
                                                    ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
                                                    : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                                            )}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit" 
                                            className={clsx(
                                                "px-6 py-2 rounded-lg font-medium transition-all",
                                                "hover:shadow-lg hover:-translate-y-0.5",
                                                darkMode 
                                                    ? "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 hover:shadow-red-900/40"
                                                    : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 hover:shadow-blue-900/30",
                                                "text-white"
                                            )}
                                        >
                                            Guardar Categoría
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