import { Fragment, useContext } from "react"
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Staff, UserUpdateFrom } from "../../schema"
import { updateStaff } from "../../api/UserAPI"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { clsx } from "clsx"
import { ThemeContext } from "../../context/ThemeProvider"

type EditStaffModalProps = {
  staff: UserUpdateFrom
  staffId: Staff['id']
  onClose: () => void
}

export default function EditStaffModal({staff, staffId, onClose}: EditStaffModalProps) {
  const { darkMode } = useContext(ThemeContext)
  const  show = staffId ? true : false
  
  const { register, handleSubmit, formState: { errors } } = useForm<UserUpdateFrom>({
    defaultValues: {
      userName: staff.userName,
      email: staff.email,
      name: staff.name
    }
  })

  const queryClient = useQueryClient() 
  const {mutate} = useMutation({
    mutationFn: updateStaff,
    onError(error){
      toast.error(error.message)
    },
    onSuccess(){
      queryClient.invalidateQueries({queryKey:['Staff']})
      toast.success('Miembro del Staff Actualizado Correctamente')
      onClose()
    }
  })

  const handleUpdateStaff = (formData: UserUpdateFrom) => {
    const data = {
      staffId,
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
                "w-full max-w-2xl transform overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all p-8 md:p-10",
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
                  Editar Miembro del Staff
                </DialogTitle>

                <p className={clsx(
                  "text-lg md:text-xl font-bold mb-8",
                  darkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Actualiza la información del miembro
                </p>

                <form 
                  className='mt-6 space-y-6'
                  noValidate
                  onSubmit={handleSubmit(handleUpdateStaff)}
                >
                  <div className="space-y-4">
                    <div>
                      <label 
                        className={clsx(
                          "block text-lg font-medium mb-2",
                          darkMode ? "text-gray-300" : "text-gray-700"
                        )}
                        htmlFor="userName"
                      >
                        Nombre de Usuario
                      </label>
                      <input
                        id="userName"
                        type="text"
                        placeholder="Nombre de usuario"
                        className={clsx(
                          "w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all",
                          darkMode 
                            ? "bg-gray-700 border-gray-600 focus:border-red-500 focus:ring-red-900/50 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/50 text-gray-800 placeholder-gray-500",
                          errors.userName && "border-red-500"
                        )}
                        {...register("userName", {
                          required: "El Nombre de usuario es obligatorio"
                        })}
                      />
                      {errors.userName && (
                        <p className="mt-1 text-sm text-red-500">{errors.userName.message}</p>
                      )}
                    </div>

                    <div>
                      <label 
                        className={clsx(
                          "block text-lg font-medium mb-2",
                          darkMode ? "text-gray-300" : "text-gray-700"
                        )}
                        htmlFor="email"
                      >
                        Correo Electrónico
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        className={clsx(
                          "w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all",
                          darkMode 
                            ? "bg-gray-700 border-gray-600 focus:border-red-500 focus:ring-red-900/50 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/50 text-gray-800 placeholder-gray-500",
                          errors.email && "border-red-500"
                        )}
                        {...register("email", {
                          required: "El Email es obligatorio",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "E-mail no válido",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label 
                        className={clsx(
                          "block text-lg font-medium mb-2",
                          darkMode ? "text-gray-300" : "text-gray-700"
                        )}
                        htmlFor="name"
                      >
                        Nombre Completo
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Nombre completo"
                        className={clsx(
                          "w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all",
                          darkMode 
                            ? "bg-gray-700 border-gray-600 focus:border-red-500 focus:ring-red-900/50 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/50 text-gray-800 placeholder-gray-500",
                          errors.name && "border-red-500"
                        )}
                        {...register("name", {
                          required: "El Nombre es obligatorio",
                        })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
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
                          ? "bg-gradient-to-r from-blue-700 to-blue-900 hover:shadow-blue-900/40 hover:from-blue-800 hover:to-blue-950"
                          : "bg-gradient-to-r from-blue-600 to-blue-800 hover:shadow-blue-900/30 hover:from-blue-700 hover:to-blue-900",
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