export class DateSelect {
    constructor() {
        this.date = new Date();
        this.toggleUp = document.createElement('button');
        this.toggleDown = document.createElement('button');
        this.optionWrapper = document.createElement('div');
        this.dateSelectWrapper = document.createElement('div');
        this.toggleUp.className = 'control up';
        this.toggleDown.className = 'control down';
        this.optionWrapper.className = 'option-wrapper';
        this.dateSelectWrapper.className = 'select-wrapper';

        this.dateSelectWrapper.appendChild(this.toggleUp);
        this.dateSelectWrapper.appendChild(this.optionWrapper);
        this.dateSelectWrapper.appendChild(this.toggleDown);
    }

    returnDateSelectWrapper() {
        return this.dateSelectWrapper;
    }
}

export class YearSelect extends DateSelect {
    constructor() {
        super();
        this.yearArray = [];
        this.dateSelectWrapper.className = 'select-wrapper year-select';

        const optionElement = document.createElement('div');
        optionElement.className = 'option';

        for (let i = 0; i < 5; i += 1) {
            this.optionWrapper.appendChild(optionElement.cloneNode(true));
        }

        /* downClick Function */
        this.toggleDown.addEventListener('click', () => {
            // update array order
            this.yearArray.shift();
            this.yearArray.push(Number(this.yearArray[this.yearArray.length - 1]) + 1);
            this.redrawYearSelect();
        });

        /* upClick Function */
        this.toggleUp.addEventListener('click', () => {
            if (this.yearArray[2] === 1) {
                return;
            }
            // update array order
            this.yearArray.pop();
            this.yearArray.unshift(Number(this.yearArray[0]) - 1);
            if (this.yearArray[0] < 1) {
                this.yearArray[0] = '';
            }

            this.redrawYearSelect();
        });
    }

    redrawYearSelect() {
        for (let i = 0; i < 5; i += 1) {
            this.optionWrapper.getElementsByClassName('option')[i].innerHTML = String(this.yearArray[i]);
        }
    }

    toggleByInput(value) {
        let targetYear = value;
        // clear current values
        this.yearArray.length = 0;
        // create siblings
        targetYear -= 2;
        for (let i = 0; i < 5; i += 1) {
            if (targetYear < 1) {
                this.yearArray.push('');
            } else {
                this.yearArray.push(targetYear);
            }
            targetYear += 1;
        }

        this.redrawYearSelect();
    }

    returnSelectedYear() {
        return Number(this.yearArray[2]);
    }
}

export class MonthSelect extends DateSelect {
    constructor() {
        super();
        this.selectedLocaleArray = [];
        this.monthArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        this.dateSelectWrapper.className = 'select-wrapper month-select';

        const optionElement = document.createElement('div');
        optionElement.className = 'option';

        for (let i = 0; i < 5; i += 1) {
            this.optionWrapper.appendChild(optionElement.cloneNode(true));
        }

        this.toggleDown.addEventListener('click', () => this.rotateMonthArray(1));
        this.toggleUp.addEventListener('click', () => this.rotateMonthArray(-1));
    }

    rotateMonthArray(offset) {
        this.monthArray = this.rotate(this.monthArray, offset);
        this.redrawMonthSelect();
    }

    setLocalLabels(localeLabels) {
        this.selectedLocaleArray = localeLabels;
    }

    redrawMonthSelect() {
        const monthStringArray = this.returnMonthStringArray();

        for (let i = 0; i < 5; i += 1) {
            this.optionWrapper.getElementsByClassName('option')[i].innerHTML = monthStringArray[i];
        }
    }

    returnMonthStringArray(targetMonthIndex = null) {
        if (targetMonthIndex !== null) {
            return this.selectedLocaleArray[targetMonthIndex];
        }

        return this.monthArray.map((index) => this.selectedLocaleArray[index].substring(0, 3));
    }

    toggleByInput(value) {
        if (value !== this.monthArray[2]) {
            this.monthArray = this.rotate(
                this.monthArray,
                this.calculateDateOffset(value),
            );

            this.redrawMonthSelect();
        }
    }

    calculateDateOffset(targetDate) {
        const dateArrayLength = this.monthArray.length;
        let calculatedDateOffset = 0;

        switch (true) {
            case (targetDate < this.monthArray[2]):
                calculatedDateOffset = (dateArrayLength - this.monthArray[2]) + targetDate;
                break;
            case (targetDate === this.monthArray[2]):
                // do nothing because default value fits
                break;
            case (targetDate > this.monthArray[2]):
                calculatedDateOffset = targetDate - this.monthArray[2];
                break;
            default:
                break;
        }

        return calculatedDateOffset;
    }

    rotate(array, times) {
        let count = times % array.length;
        if (times < 0) count += array.length;
        return array.concat(array.splice(0, count));
    }

    toggleByMatrix(mode) {
        switch (mode) {
            case 'next':
                this.monthArray = this.rotate(this.monthArray, 1);
                break;
            case 'prev':
                this.monthArray = this.rotate(this.monthArray, 11);
                break;
            default:
                break;
        }

        this.redrawMonthSelect();
    }

    returnSelectedMonthAsLabel() {
        return this.returnMonthStringArray(this.monthArray[2]);
    }

    returnSelectedMonth() {
        return this.monthArray[2];
    }
}
