import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BuyerFormData } from '../schema';
import { registerBuyer } from '../api/UserAPI';
import { useMutation } from '@tanstack/react-query';
import background from '../assets/background.jpg';


const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyerFormData>();

  const password = watch('password')

  const {mutate} = useMutation({
    mutationFn: registerBuyer,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess:() => {
      toast.success('¡Registro exitoso! Por favor inicia sesión.');
      navigate('/login')
    }
  })
  const onSubmit = async (formData: BuyerFormData) => {
    mutate(formData)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{backgroundImage: `url(${background})`}}>
      <div className="bg-white/10 dark:bg-black/30 backdrop-blur-md shadow-lg rounded-xl p-8 max-w-md w-full space-y-6 border border-white/20">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white drop-shadow-md">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-white/80">
            ¿Ya tienes una cuenta?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Inicia sesión
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
          <div>
              <label htmlFor="userName" className="sr-only">
                Nombre de usuario
              </label>
              <input
                {...register('userName')}
                id="userName"
                type="text"
                className="arkadia-inputs"
                placeholder="Nombre de usuario"
              />
              {errors.userName && (
                <p className="mt-1 text-sm text-red-600">{errors.userName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                Nombre
              </label>
              <input
                {...register('name')}
                id="name"
                type="text"
                className="arkadia-inputs"
                placeholder="Nombre completo"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                className="arkadia-inputs"
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                {...register("password", {
                  required: "El Password es obligatorio",
                  minLength: {
                    value: 6,
                    message: 'El Password debe ser mínimo de 6 caracteres'
                  }
                })}
                id="password"
                type="password"
                className="arkadia-inputs"
                placeholder="Contraseña"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password_confirmation" className="sr-only">
                Confirmar contraseña
              </label>
              <input
                {...register("password_confirmation", {
                  required: "Repetir Password es obligatorio",
                  validate: value => value === password || 'Los Passwords no son iguales'
                })}
                id="password_confirmation"
                type="password"
                className="arkadia-inputs"
                placeholder="Confirmar contraseña"
              />
              {errors.password_confirmation && (
                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group btn-login"
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
