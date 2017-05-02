import { percent, rem } from 'csx';
import { cssRule, fontFace } from 'typestyle';

export function initStyles() {
    fontFace('Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif');

    // Set base rem size to 1rem = 10px
    cssRule('html', {
        fontSize: percent(62.5),
    });

    // Standardize body properties
    cssRule('body', {
        'fontFamily': 'Helvetica Neue',
        'fontSize': rem(1.6),
        'lineHeight': 1.825,
        '-webkit-font-smoothing': 'antialiased',
        'textRendering': 'auto',
    });
}
