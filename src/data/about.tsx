import { JSX } from "react";

interface Feature {
    icon: JSX.Element;
    bgColor: string;
    title: string;
    desc: string;
}

export const features: Feature[] = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        ),
        bgColor: "bg-blue-100 dark:bg-blue-900",
        title: "Productos de calidad",
        desc: "Les damos productos de la mejor calidad posible de proveedores confiables a nuestros clientes.",
    },
    {
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ),
        bgColor: "bg-green-100 dark:bg-green-900",
        title: "Mercado envíos",
        desc: "Envío y entrega rápida a nuestros clientes.",
    },
    {
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ),
        bgColor: "bg-purple-100 dark:bg-purple-900",
        title: "Servicio al cliente",
        desc: "Soporte 24/7 para responder a cualquier pregunta o preocupación.",
    },
];
