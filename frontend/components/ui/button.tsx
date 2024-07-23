import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white border-slate-200 border-2 border-b-4 hover:bg-slate-100 text-slate-500 active:border-b-2",
        primary:
          "bg-[#DCAF52] text-primary-foreground hover:bg-[#DCAF52]/90 border-[#C39840] border-b-4 active:border-b-0",
        primaryOutline:
          "bg-white border-4 font-bold text-black hover:border-[#DCAF52] hover:border-4",
        secondary:
          "bg-green-300 text-primary-foreground hover:bg-green-300/90 border-green-500 border-b-4 active:border-b-0",
        secondaryOutline: "bg-white text-green-500 hover:bg-slate-100",
        danger:
          "bg-red-500 text-primary-foreground hover:bg-red-500/90 border-red-600 border-b-4 active:border-b-0",
        dangerOutline: "bg-white text-red-500 hover:bg-slate-100",
        super:
          "bg-slate-500 text-primary-foreground hover:bg-slate-500/90 border-slate-600 border-b-4 active:border-b-0",
        superOutline: "bg-white text-slate-500 hover:bg-slate-100",
        sidebar:
        "font-bold",
        sidebarOutline: "font-bold text-black border-sky-500 border-2 bg-sky-100/90",
        lessonPrimary: 'bg-slate-300 text-black hover:bg-slate-300/90 border-slate-600 border-b-4 border-r-2 border-l-2 active:border-b-2'
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-16",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
