import { cva, VariantProps } from "class-variance-authority"

const spinnerVariants = cva("border-4 rounded-full border-cyan-200 border-t-cyan-700 animate-spin duration-700", {
    variants:{
        size:{
            sm:"size-6 border-4",
            md:"size-8 border-6",
            lg:"size-10 border-8"
        }
    }, 
    defaultVariants:{
        size:"md"
    }
})

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
    className?:string
}

const LoadingSpinner = ({size, className}:LoadingSpinnerProps) => {
    return (
        <div className="flex items-center justify-center">
            <div className={spinnerVariants({size, className})} />

        </div>
    )
}

export default LoadingSpinner