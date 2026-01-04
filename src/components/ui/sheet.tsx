import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

interface SheetProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface SheetTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

interface SheetContentProps {
  side?: "left" | "right" | "top" | "bottom"
  children: React.ReactNode
  className?: string
}

const SheetContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>({
  open: false,
  onOpenChange: () => {},
})

function Sheet({ children, open, onOpenChange }: SheetProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const actualOpen = open !== undefined ? open : isOpen
  const actualOnOpenChange = onOpenChange || setIsOpen

  React.useEffect(() => {
    if (actualOpen) {
      // Disable body scroll when sheet is open
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable body scroll when sheet is closed
      document.body.style.overflow = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [actualOpen])

  return (
    <SheetContext.Provider value={{ open: actualOpen, onOpenChange: actualOnOpenChange }}>
      {children}
    </SheetContext.Provider>
  )
}

function SheetTrigger({ children, asChild }: SheetTriggerProps) {
  const context = React.useContext(SheetContext)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: () => context.onOpenChange(true),
    })
  }

  return (
    <button onClick={() => context.onOpenChange(true)}>
      {children}
    </button>
  )
}

function SheetContent({ side = "right", children, className }: SheetContentProps) {
  const context = React.useContext(SheetContext)

  const sideClasses = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full",
  }

  return context.open ? (
    <>
      {/* Backdrop - covers everything including sidebar */}
      <div
        className="fixed inset-0 bg-black/50 z-[100] animate-in fade-in duration-200"
        onClick={() => context.onOpenChange(false)}
      />

      {/* Content */}
      <div
        className={cn(
          "fixed z-[110] bg-background shadow-xl border border-border",
          "animate-in slide-in-from-edge duration-300",
          sideClasses[side],
          side === "left" && "translate-x-0",
          side === "right" && "translate-x-0",
          side === "top" && "-translate-y-0",
          side === "bottom" && "translate-y-0",
          className
        )}
      >
        <button
          onClick={() => context.onOpenChange(false)}
          className="absolute top-4 right-4 p-2 hover:bg-accent rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  ) : null
}

export { Sheet, SheetTrigger, SheetContent }
