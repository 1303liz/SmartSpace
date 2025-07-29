import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react"
import { useEffect, useState } from "react"

type ToasterProps = {
    message: string
    type?: 'success' | 'error' | 'info' | 'warning'
    duration?: number // in seconds
}

const toastVariants = {
  success: {
    icon: CheckCircle2,
    style: "bg-green-600 shadow-green-600",
    closeStyle: "bg-green-600 hover:bg-green-700",
  },
  error: {
    icon: XCircle,
    style: "bg-red-600 shadow-red-600",
    closeStyle: "bg-red-600 hover:bg-red-700",
  },
  info: {
    icon: Info,
    style: "bg-blue-600 shadow-blue-600",
    closeStyle: "bg-blue-600 hover:bg-blue-700",
  },
  warning: {
    icon: AlertTriangle,
    style: "bg-orange-500 shadow-orange-500",
    closeStyle: "bg-orange-500 hover:bg-orange-600",
  },
} as const

const Toaster = ({ message, type = "success", duration = 7}: ToasterProps) => {
    const [showToast, setShowToast] = useState(true)
    const durationInSecs = duration * 1000
    const variant = toastVariants[type]
    const Icon = variant.icon // Specified type icon

    // Show the notification for the specified seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowToast(false), durationInSecs)
        return () => clearTimeout(timer)
    }, [durationInSecs])

    if (!showToast) return null

  return (
    <div className="fixed top-4 right-4 z-50">
        <div className={`${variant.style} max-w-80 flex items-center gap-3 px-4 py-3 text-white shadow-sm rounded`}>
            <Icon className="min-w-[16px] min-h-[16px]"/>
            <span>{ message }</span>
            {/* close button */}
            <button className={``}>
                <X onClick={() => setShowToast(false)} className={`${variant.closeStyle} absolute ml-4 p-[1px] cursor-pointer -top-[5px] -right-[5px] text-gray-50 hover:border-white hover:text-white w-4 h-4 rounded-full border border-gray-50`}/>
            </button>
        </div>
    </div>
  )
}

export default Toaster