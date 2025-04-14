import { Fragment } from "react"
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Staff, UserUpdateFrom } from "../../schema"
import { updateStaff } from "../../api/UserAPI"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"

type EditStaffModalProps ={
  staff: UserUpdateFrom
  staffId: Staff['id']
  onClose: () => void
}

export default function EditStaffModal({staff, staffId, onClose}: EditStaffModalProps){
  let show = staffId ? true : false
  
  const { register, handleSubmit} = useForm<UserUpdateFrom>({})
  const queryClient = useQueryClient() 

  const {mutate} = useMutation({
    mutationFn: updateStaff,
    onError(error){
      toast.error(error.message)
    },
    onSuccess(){
      queryClient.invalidateQueries({queryKey:['Staff']})
      toast.success('Miembro del Staff Eliminado Correctamente')
      onClose()
    }
  })

  const handleUpdateStaff = (formData: UserUpdateFrom) => {
    const data ={
      staffId,
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
                                            onSubmit= {handleSubmit(handleUpdateStaff)}
                                        >
                                        <div className="flex flex-col gap-5">
                                        <label className="font-normal text-2xl" >
                                          Username
                                        </label>
                                        <input
                                          type="userName"
                                          placeholder="Username"
                                          className="w-full p-3  border-gray-300 border"
                                          defaultValue={staff.userName}
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
                                          defaultValue={staff.email}
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
                                          defaultValue={staff.name}
                                          {...register("name", {
                                            required: "El Nombre es obligatorio",
                                          })}
                                        />
                                        
                                      </div>
                                                      <input type="submit" 
                                                          className=" bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                                          value='Eliminar Miembro del Staff'
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
