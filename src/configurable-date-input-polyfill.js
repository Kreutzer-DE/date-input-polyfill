import './configurable-date-input-polyfill.scss';
import {
    showPicker,
    getDateRange,
    setupKeyEvents,
    getLocaleLabels,
    returnDateFormat,
    returnSelectedLocale,
    setupValueProperties,
    returnSelectedMinDate,
    returnSelectedMaxDate,
    createMutationObserver,
    returnForcePolyfillFlag,
    returnSelectedFirstDayOfWeek,
} from './inputUtilities';

function supportsDateInput() {
    // Return false if the browser does not support input[type="date"].
    const input = document.createElement('input');
    input.setAttribute('type', 'date');

    const notADateValue = 'not-a-date';
    input.setAttribute('value', notADateValue);

    return !(input.value === notADateValue);
}

function addPickerToInputs(dateInputs) {
    for (let i = 0; i < dateInputs.length; i += 1) {
        const htmlElement = dateInputs[i];
        const locale = returnSelectedLocale(htmlElement);
        const dateFormat = returnDateFormat(htmlElement);
        const minDateAttribute = returnSelectedMinDate(htmlElement);
        const maxDateAttribute = returnSelectedMaxDate(htmlElement);
        const dateRange = getDateRange(minDateAttribute, maxDateAttribute);
        const localeLabels = getLocaleLabels(locale);
        const firstDayOfWeek = returnSelectedFirstDayOfWeek(htmlElement);
        const forcePolyfill = returnForcePolyfillFlag(htmlElement);

        if (forcePolyfill) htmlElement.setAttribute('type', 'text');

        const dateInput = {
            htmlElement,
            firstDayOfWeek,
            dateFormat,
            dateRange,
            locale,
            localeLabels,
            minDateAttribute,
            maxDateAttribute,
        };

        htmlElement.setAttribute('data-has-picker', '');
        htmlElement.addEventListener('focus', () => showPicker(dateInput));
        htmlElement.addEventListener('mouseup', () => showPicker(dateInput));

        createMutationObserver(dateInput);
        setupValueProperties(dateInput);
        setupKeyEvents(dateInput);
    }
}

function addPolyfillPickers() {
    addPickerToInputs(document.querySelectorAll('input[type="text"].date-polyfill:not([data-has-picker])'));
    addPickerToInputs(document.querySelectorAll('input[type="date"][data-force-polyfill]:not([data-has-picker])'));
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
