import { animate, style, transition, trigger } from '@angular/animations';

export const FADE_IN = trigger('pFadeIn', [
    transition(':enter', [
        style({
            opacity: 0,
        }),
        animate(
            '1s ease-in',
            style({
                opacity: 1,
            })
        ),
    ]),
]);

export const FADE_OUT = trigger('pFadeOut', [
    transition(':leave', [
        style({
            opacity: 1,
        }),
        animate(
            '1s ease-out',
            style({
                opacity: 0,
            })
        ),
    ]),
]);
