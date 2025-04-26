import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { StaffFormData } from '../../schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registerStaff } from '../../api/UserAPI'
import { toast } from 'react-toastify'

export default function AddStaffModal() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalStaff = queryParams.get('newStaff')
    const show = modalStaff ? true : false

    const { register, handleSubmit, reset } = useForm<StaffFormData>({})
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: registerStaff,
        onError:(error) =>{
        toast.error(error.message)
        },
        onSuccess:() => {
        queryClient.invalidateQueries({queryKey:['Staff']})
        toast.success('Miembro del Staff fue cargado con exito!!')
        reset()
        navigate(location.pathname,{replace: true})
        }
    })

    const handleCreateStaff = (formData: StaffFormData) => {
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
                                                Miembro del Staff
                                            </DialogTitle>
        
                                            <p className="text-xl font-bold">Llena el formulario y carga al miembro 
                                            </p>
                                            <form 
                                                className='mt-10 space-y-3'
                                                noValidate
                                                onSubmit= {handleSubmit(handleCreateStaff)}
                                            >
                                            <div className="flex flex-col gap-5">
                                                    <label className="font-normal text-2xl" >
                                                    Username
                                                    </label>
                                                    <input
                                                    type="userName"
                                                    placeholder="Username"
                                                    className="w-full p-3  border-gray-300 border"
                                                    {...register("userName", {
                                                        required: "El Nombre de usuario es obligatorio"
                                                    })}
                                                    />
                                                    </div>

                                                <div className="flex flex-col gap-5">
                                                    <label className="font-normal text-2xl">
                                                    Email
                                                    </label>
                                                    <input
                                                    type="email"
                                                    placeholder="Email"
                                                    className="w-full p-3  border-gray-300 border"
                                                    {...register("email", {
                                                        required: "El Email de registro es obligatorio",
                                                        pattern: {
                                                        value: /\S+@\S+\.\S+/,
                                                        message: "E-mail no válido",
                                                        },
                                                    })}
                                                    />

                                                </div>

                                                <div className="flex flex-col gap-5">
                                                    <label className="font-normal text-2xl">Nombre</label>
                                                    <input
                                                    type="name"
                                                    placeholder="Nombre"
                                                    className="w-full p-3  border-gray-300 border"
                                                    {...register("name", {
                                                        required: "El Nombre es obligatorio",
                                                    })}
                                                    />
                                                    
                                                </div>
                                                    <div className="flex flex-col gap-5">
                                            <label className="font-normal text-2xl">Password</label>

                                            <input
                                            type="password"
                                            placeholder="Password"
                                            className="w-full p-3  border-gray-300 border"
                                            {...register("password", {
                                                required: "El Password es obligatorio",
                                                minLength: {
                                                value: 8,
                                                message: "El Password debe ser mínimo de 8 caracteres",
                                                },
                                            })}
                                            />
                                            
                                        </div>
                                                <input type="submit" 
                                                    className=" bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                                    value='Cargar Staff'
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
