

export default function DemoFailure() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-8">
        <div className="max-w-xl text-center">
            <h1 className="text-3xl font-bold text-red-800 mb-6">
                Fallo en la operacion del pago!!!!
            </h1>
            <p className="text-lg text-gray-700 mb-10">
               Por cuestiones de no tener saldo suficiente en la compra, la operacion fallo. Cualquier duda, no dude en contactarnos.
            </p>
            <p className="text-sm text-gray-400">Demo finalizada, muchas gracias por ver !!!</p>
        </div>
    </div>
  )
}
