/**
 * Toast Notification Store
 * Manages toast notifications across the app
 */

export interface ToastOptions {
	message: string
	type?: 'info' | 'success' | 'warning' | 'error'
	icon?: string
	duration?: number
}

export interface Toast extends ToastOptions {
	id: string
}

/**
 * Create toast store
 */
function createToastStore() {
	let toasts = $state<Toast[]>([])

	return {
		get toasts() {
			return toasts
		},

		/**
		 * Show a toast notification
		 */
		show(options: ToastOptions) {
			const id = `toast-${Date.now()}-${Math.random()}`
			const toast: Toast = {
				id,
				...options,
			}

			toasts = [...toasts, toast]

			// Auto-remove after duration
			const duration = options.duration ?? 3000
			if (duration > 0) {
				setTimeout(() => {
					this.remove(id)
				}, duration)
			}

			return id
		},

		/**
		 * Show success toast
		 */
		success(message: string, duration?: number) {
			return this.show({ message, type: 'success', duration })
		},

		/**
		 * Show error toast
		 */
		error(message: string, duration?: number) {
			return this.show({ message, type: 'error', duration })
		},

		/**
		 * Show warning toast
		 */
		warning(message: string, duration?: number) {
			return this.show({ message, type: 'warning', duration })
		},

		/**
		 * Show info toast
		 */
		info(message: string, duration?: number) {
			return this.show({ message, type: 'info', duration })
		},

		/**
		 * Remove a toast
		 */
		remove(id: string) {
			toasts = toasts.filter((t) => t.id !== id)
		},

		/**
		 * Clear all toasts
		 */
		clear() {
			toasts = []
		},
	}
}

export const toastStore = createToastStore()
