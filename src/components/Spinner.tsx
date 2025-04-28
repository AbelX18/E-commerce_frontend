import { clsx } from "clsx"

export default function Spinner({ className = "" }: { className?: string }) {

    return (
        <div className={clsx(
            "inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent",
            "bg-gradient-to-r from-transparent via-transparent to-transparent",
            "dark:border-arkadia-gradient-dark border-arkadia-gradient",
            className
            )}>
            <span className="sr-only">Cargando...</span>
        </div>
    )
}