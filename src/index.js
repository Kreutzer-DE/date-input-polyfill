export default function supportsDateInput() {
    // Return false if the browser does not support input[type="date"].
    const input = document.createElement('input');
    input.setAttribute('type', 'date');

    const notADateValue = 'not-a-date';
    input.setAttribute('value', notADateValue);

    return !(input.value === notADateValue);
}
