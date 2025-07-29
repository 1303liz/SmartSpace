type ToastType = 'success' | 'error' | 'info' | 'warning'

type ToastContextShape = {
  showToast: (message: string, type?: ToastType, duration?: number) => void
}

type GlobalToastCtx = {
  __toastCtx?: ToastContextShape
} & typeof globalThis

export const toast = {
  success: (msg: string, duration?: number) => {
    const ctx = (globalThis as GlobalToastCtx).__toastCtx
    ctx?.showToast(msg, "success", duration)
  },

  error: (msg: string, duration?: number) => {
    const ctx = (globalThis as GlobalToastCtx).__toastCtx
    ctx?.showToast(msg, "error", duration)
  },

  info: (msg: string, duration?: number) => {
    const ctx = (globalThis as GlobalToastCtx).__toastCtx
    ctx?.showToast(msg, "info", duration)
  },

  warning: (msg: string, duration?: number) => {
    const ctx = (globalThis as GlobalToastCtx).__toastCtx
    ctx?.showToast(msg, "warning", duration)
  },
}
