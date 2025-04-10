import {useForm} from 'react-hook-form'
import { registerStaff } from '../../api/UserAPI';
import { StaffRegisterForm } from '../../schema';

export default function StaffForm() {

    const initalValues : StaffRegisterForm= {
        userName:'',
        name:'',
        email:'',
        password:''
    }

    const { register, handleSubmit, reset } = useForm<StaffRegisterForm>({defaultValues: initalValues})
    const onSubmit = async (formData: StaffRegisterForm) => {
        console.log("Formulario enviado:", formData)
        try {
          const response = await registerStaff(formData); 
          console.log("Staff cargado con éxito:", response);
          reset(); 
        } catch (error) {
          console.error("Error al cargar el staff:", error);
        }
      };

  
    return (
      <>
        <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
        <p className="text-2xl font-light text-white mt-5">
          Llena el formulario para {""}
          <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 p-10 bg-white mt-10"
          noValidate
        >
            <div className="flex flex-col gap-5">
            <label className="font-normal text-2xl" >
              Username
            </label>
            <input
              type="userName"
              placeholder="Username de Registro"
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
              placeholder="Email de Registro"
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
              placeholder="Nombre de Registro"
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
              placeholder="Password de Registro"
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




          <input
            type="submit"
            value="Cargar Staff"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
          />
        </form>
      </>
    );
}
