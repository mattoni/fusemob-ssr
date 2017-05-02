import { setStylesTarget } from 'typestyle';
import { initStyles } from 'utils/styles';

const el = document.getElementById('styles-target');

if (el) {
    setStylesTarget(el);
    initStyles();
}

