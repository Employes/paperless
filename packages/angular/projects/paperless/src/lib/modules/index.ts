import { OverlayModule } from './overlay';
import { TableModule } from './table';
import { ToastModule } from './toast';

export * from './overlay';
export * from './table';
export * from './toast';

export const MODULES = [TableModule, ToastModule, OverlayModule];
