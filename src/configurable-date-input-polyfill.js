import './configurable-date-input-polyfill.scss';

import supportsDateInput from './index';

import addPickerToInputs from './add-picker';

function addPolyfillPickers() {
    addPickerToInputs(document.querySelectorAll('input[type="text"].date-polyfill:not([data-has-picker])'));
    addPickerToInputs(document.querySelectorAll('input[type="date"][data-force-polyfill]:not([data-has-picker]'));
    // Check if type="date" is supported.
    if (!supportsDateInput()) {
        addPickerToInputs(document.querySelectorAll('input[type="date"]:not([data-has-picker])'));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    addPolyfillPickers();
    // This is also on mousedown event, so it will capture new inputs that might be added to the DOM dynamically.
    document.querySelector('body')?.addEventListener('mousedown', () => addPolyfillPickers());
});
