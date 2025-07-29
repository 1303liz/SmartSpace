'use client'

/**
 * Provides a global toast context for displaying toast notifications across the app.
 * Includes the `useToast` hook for accessing the toast system, and registers `showToast` globally
 * on `window.__toastCtx` for access in non-React files.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import Toaster from "./Toaster"

type ToastContextType = {
  showToast: (message: string, type?: "success" | "error" | "info" | "warning", duration?: number) => void
}

const ToastContext = createContext<ToastContextType | null>(null) // Create the toast context

// Hook that returns the toast context, allowing components to trigger toast notifications.
export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) throw new Error("useToast must be used within ToastProvider")
    return context;
}   

// ToasterProvider component
export const ToastProvider = ({ children }: { children : ReactNode }) => {
    const [toasts, setToasts] = useState<
        { id: number; message: string; type?: "success" | "error" | "info" | "warning"; duration?: number }[]
    >([])

  const showToast = (message: string, type?: "success" | "error" | "info" | "warning", duration?: number) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type, duration }])

    // Remove the toast after the given duration
    setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, (duration ?? 8) * 1000); // if duration is undefined or null, default to 8 seconds
  }

  // Make showToast globally accessible via 'window.__toastCtx()
  useEffect(() => {
    if (typeof window !== "undefined") {
        ;(window as any).__toastCtx = { showToast }
    }
  })

  return (
    <ToastContext.Provider value={{ showToast }}>
        {children}
        <div>
            {toasts.map(toast => (
                <Toaster key={toast.id} message={toast.message} type={toast.type} duration={toast.duration}/>
            ))}
        </div>
    </ToastContext.Provider>
  )
}