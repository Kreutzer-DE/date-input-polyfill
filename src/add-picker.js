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

export default function addPickerToInputs(dateInputs) {
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
