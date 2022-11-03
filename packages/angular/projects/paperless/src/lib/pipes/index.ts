import { CustomCurrencyPipe } from './currency.pipe';
import { CustomDatePipe } from './date.pipe';
import { SafePipe } from './safe.pipe';

export * from './currency.pipe';
export * from './date.pipe';
export * from './safe.pipe';

export const PIPES = [CustomCurrencyPipe, CustomDatePipe, SafePipe];
