// Global toast object api to wrap the context usage and expose simple functions

import type { useToast } from "./ToastProvider"

export const toast = {
    success: (msg: string, duration?: number) => {
        if (typeof window !== "undefined") {
            const ctx = (window as any).__toastCtx as ReturnType<typeof useToast>
            ctx?.showToast(msg, "success", duration)
        }
    },

    error: (msg: string, duration?: number) => {
        if (typeof window !== "undefined") {
            const ctx = (window as any).__toastCtx as ReturnType<typeof useToast>
            ctx?.showToast(msg, "error", duration)
        }
    },

    info: (msg: string, duration?: number) => {
        if (typeof window !== "undefined") {
            const ctx = (window as any).__toastCtx as ReturnType<typeof useToast>
            ctx?.showToast(msg, "info", duration)
        }
    },

    warning: (msg: string, duration?: number) => {
        if (typeof window !== "undefined") {
            const ctx = (window as any).__toastCtx as ReturnType<typeof useToast>
            ctx?.showToast(msg, "warning", duration)
        }
    },
}