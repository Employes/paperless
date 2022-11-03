export * from './toast-container/toast-container.component';
export * from './toast/toast.component';

import { ToastContainer } from './toast-container/toast-container.component';
import { Toast } from './toast/toast.component';

export const TOAST_COMPONENTS = [Toast, ToastContainer];
