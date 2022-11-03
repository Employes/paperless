import { animate, style, transition, trigger } from '@angular/animations';

export const SLIDE_IN_BOTTOM_OUT_TOP = trigger('pSlideInBottomOutTop', [
    transition(':enter', [
        style({ transform: 'translateY(50%)', opacity: 0 }),
        animate(
            '200ms ease-in',
            style({ transform: 'translateX(0%)', opacity: 1 })
        ),
    ]),
    transition(':leave', [
        animate(
            '200ms ease-in',
            style({ transform: 'translateY(-100%)', opacity: 0 })
        ),
    ]),
]);

export const SLIDE_IN_TOP_OUT_BOTTOM = trigger('pSlideInBottomOutTop', [
    transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate(
            '200ms ease-in',
            style({ transform: 'translateX(0%)', opacity: 1 })
        ),
    ]),
    transition(':leave', [
        animate(
            '200ms ease-in',
            style({ transform: 'translateY(50%)', opacity: 0 })
        ),
    ]),
]);
