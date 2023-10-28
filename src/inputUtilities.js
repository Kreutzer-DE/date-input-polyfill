import Picker from './picker';
import DateFormat from './dateformat';
import Localisation from './localisations';

export function showPicker(inputElement) {
    Picker.attachTo(inputElement);
}

export function setupValueProperties(dateInputElement) {
    const inputElement = dateInputElement;
    Object.defineProperties(
        inputElement.htmlElement,
        {
            valueAsDate: {
                get: () => {
                    if (!inputElement.htmlElement.value) {
                        return null;
                    }

                    function findIndexWithKey(arr, key) {
                        for (let i = arr.length - 1; i >= 0; i -= 1) {
                            if (arr[i].charAt(0) === key) return i;
                        }
                        return null;
                    }

                    const format = inputElement.dateFormat || 'yyyy-mm-dd';
                    const f = format.split(/(m+|d+|y+)/).filter(Boolean);
                    const value = inputElement.htmlElement.value.split(/(\D+)/).filter(Boolean);
                    const year = Number(value[findIndexWithKey(f, 'y') || 0]);
                    const month = Number(value[findIndexWithKey(f, 'm') || 0]);
                    const day = Number(value[findIndexWithKey(f, 'd') || 0]);

                    // create absolute date of given input
                    const valueAsDate = new Date(year, month - 1, day, 0, 0, 0, 0);

                    // return null in case of invalid date
                    if (isNaN(valueAsDate.getDate())) {
                        return null;
                    }

                    return valueAsDate;
                },
                set: (val) => {
                    inputElement.htmlElement.value = DateFormat(val, inputElement.dateFormat);
                    // trigger change event to execute event listeners on the date element
                    let event;
                    // IE event support check
                    if (typeof (Event) === 'function') {
                        event = new Event('change', { bubbles: true });
                    } else {
                        event = document.createEvent('Event');
                        event.initEvent('change', true, true);
                    }

                    inputElement.htmlElement.dispatchEvent(event);
                },
            },
            valueAsNumber: {
                get: () => {
                    if (!inputElement.htmlElement.value) {
                        return NaN;
                    }

                    return inputElement.htmlElement.valueAsDate.valueOf();
                },
                set: (val) => {
                    inputElement.htmlElement.valueAsDate = new Date(val);
                },
            },
        },
    );
}

export function setupKeyEvents(dateInputObject) {
    const minDate = dateInputObject.dateRange[0];
    const maxDate = dateInputObject.dateRange[1];
    const dateInputHtmlElement = dateInputObject.htmlElement;
    // Update the picker if the date changed manually in the input.
    dateInputHtmlElement.addEventListener('keydown', (e) => {
        let date = new Date();
        switch (e.keyCode) {
            case 9: // hide on tab
            case 27:
                // hide on esc
                Picker.hide();
                break;
            case 37:
                // arrow left
                if (dateInputHtmlElement.valueAsDate) {
                    date = Picker.returnCurrentDate();
                    date.setDate(date.getDate() - 1);

                    if (date >= minDate) {
                        dateInputHtmlElement.valueAsDate = date;
                    }
                }
                break;
            case 38:
                // arrow up
                if (dateInputHtmlElement.valueAsDate) {
                    date = Picker.returnCurrentDate();
                    date.setDate(date.getDate() - 7);

                    if (date >= minDate) {
                        dateInputHtmlElement.valueAsDate = date;
                    }
                }
                break;
            case 39:
                // arrow right
                if (dateInputHtmlElement.valueAsDate) {
                    date = Picker.returnCurrentDate();
                    date.setDate(date.getDate() + 1);

                    if (date <= maxDate) {
                        dateInputHtmlElement.valueAsDate = date;
                    }
                }
                break;
            case 40:
                // arrow down
                if (dateInputHtmlElement.valueAsDate) {
                    date = Picker.returnCurrentDate();
                    date.setDate(date.getDate() + 7);

                    if (date <= maxDate) {
                        dateInputHtmlElement.valueAsDate = date;
                    }
                }
                break;
            default:
                break;
        }

        // remove to improve performance
        Picker.syncPickerWithInput();
    });

    dateInputHtmlElement.addEventListener('keyup', () => {
        Picker.syncPickerWithInput();
    });
}

export function returnDateFormat(htmlElement) {
    return htmlElement.getAttribute('date-format')
        || document.body.getAttribute('date-format')
        || htmlElement.getAttribute('data-date-format')
        || document.body.getAttribute('data-date-format')
        || 'yyyy-mm-dd';
}

export function returnSelectedFirstDayOfWeek(htmlElement) {
    return htmlElement.getAttribute('data-first-day')
        || document.body.getAttribute('data-first-day')
        || 'su';
}

export function returnSelectedLocale(htmlElement) {
    return htmlElement.getAttribute('lang')
        || document.body.getAttribute('lang')
        || 'en';
}

export function returnSelectedMinDate(htmlElement) {
    return htmlElement.getAttribute('min')
        || htmlElement.getAttribute('data-min') || '';
}

export function returnSelectedMaxDate(htmlElement) {
    return htmlElement.getAttribute('max')
        || htmlElement.getAttribute('data-max') || '';
}

export function returnForcePolyfillFlag(htmlElement) {
    return !!htmlElement.getAttribute('data-force-polyfill');
}

export function getDateRange(minAttribute, maxAttribute) {
    const defaultMinDate = new Date("1800");
    const defaultMaxDate = new Date("3000");

    let minDate = defaultMinDate;
    let maxDate = defaultMaxDate;

    // If min Attribute is set
    if (minAttribute && Date.parse(minAttribute)) {
        const givenDate = new Date(minAttribute);
        givenDate.setHours(0, 0, 0, 0);
        minDate = givenDate;
    }
    // If max Attribute is set
    if (maxAttribute && Date.parse(maxAttribute)) {
        const givenDate = new Date(maxAttribute);
        givenDate.setHours(0, 0, 0, 0);
        maxDate = givenDate;
    }

    // in case of invalid input
    if (minDate > maxDate) {
        minDate = defaultMinDate;
        maxDate = defaultMaxDate;
    }

    if (minDate < new Date("0001")) {
        minDate = new Date("0001");
    }

    return [minDate, maxDate];
}

export function getLocaleLabels(locale) {
    const localeKey = Object.keys(Localisation).find((key) => {
        const localeList = key.toLowerCase().split('_');
        return localeList.includes(locale) || localeList.includes(locale.slice(0, 2));
    });

    return localeKey ? Localisation[localeKey] : Localisation["en_en-US_en-UK"];
}

export function createMutationObserver(dateInputElement) {
    const inputElement = dateInputElement;
    // watch for element attribute changes
    if ("MutationObserver" in window) {
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName.indexOf('min') !== -1 || mutation.attributeName.indexOf('max') !== -1) {
                    inputElement.minDateAttribute = returnSelectedMinDate(inputElement.htmlElement);
                    inputElement.maxDateAttribute = returnSelectedMaxDate(inputElement.htmlElement);
                    inputElement.dateRange = getDateRange(inputElement.minDateAttribute, inputElement.maxDateAttribute);
                } else if (mutation.attributeName === 'lang') {
                    inputElement.locale = returnSelectedLocale(inputElement.htmlElement);
                    inputElement.localeLabels = getLocaleLabels(inputElement.locale);
                } else if (mutation.attributeName === 'data-first-day') {
                    inputElement.firstDayOfWeek = returnSelectedFirstDayOfWeek(inputElement.htmlElement);
                } else if (mutation.attributeName === 'data-date-format' || mutation.attributeName === 'date-format') {
                    const date = inputElement.htmlElement.valueAsDate;
                    inputElement.dateFormat = inputElement.htmlElement.getAttribute(mutation.attributeName) || 'yyyy-mm-dd';
                    if (date) {
                        inputElement.htmlElement.valueAsDate = date; // reset date to update the format
                    }
                }
            });
        });

        mutationObserver.observe(inputElement.htmlElement, {
            attributes: true,
        });
    }
}
