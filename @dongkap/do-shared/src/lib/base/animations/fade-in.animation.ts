import { style, animate, transition, AnimationMetadata } from '@angular/animations';

export function fadeIn(): AnimationMetadata[] {
    return [
        transition(':enter', [
            style({opacity: 0}),
            animate('400ms ease-in', style({opacity: 1})),
          ]),
      ];
}
