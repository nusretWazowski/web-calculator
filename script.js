class Calculator {
    constructor(result, input) {
        this.result = result;
        this.input = input;
        this.clearall();
    }


    clearall() {
        this.inputField = '';
        this.resultField = '0';
        this.operation = undefined;
    }


    delete() {
        this.inputField = this.inputField.toString().slice(0, -1);

    }

    appendNumber(number) {
        if (number === '.' && this.inputField.contains('.')) return;
        this.inputField = this.inputField.toString() + number.toString();

    }

    chooseOperation(operation) {
        if (this.inputField === '') return;
        if (this.resultField !== '0') {
            this.calculate();
        }
        this.operation = operation;
        this.resultField = this.inputField;
        this.inputField = '';
    }

    calculate() {
        let calcualtion;
        let res = parseFloat(this.resultField);
        let input = parseFloat(this.inputField);
        if (isNaN(res) || isNaN(input)) return;
        switch (this.operation) {
            case '+':
                calcualtion = res + input;
                break;
            case '-':
                calcualtion = res - input;
                break;
            case '*':
                calcualtion = res * input;
                break;
            case '/':
                calcualtion = res / input;
                break;
            case '%':
                calcualtion = res % input;
                break;
            default:
                return;
        }
        this.inputField = calcualtion;
        this.operation = undefined;
        this.resultField = '0';
    }

    getDisplayNumber(number) {
        let floatNumber = parseFloat(number);
        if (isNaN(floatNumber)) return '';
        return floatNumber.toLocaleString('en');
    }


    updateDisplay() {
        this.input.innerText = this.getDisplayNumber(this.inputField);
        if (this.operation != null) {
            this.result.innerText = `${this.getDisplayNumber(this.resultField)} ${this.operation}`;
        }
    }
}


let number = document.querySelectorAll('.digit');
let operator = document.querySelectorAll('.operator');
let equals = document.querySelector('.equal');
let clear = document.querySelector('.clear');
let allclear = document.querySelector('.allclear');
let input = document.querySelector('.numberinput');
let result = document.querySelector('.result');

let calculator = new Calculator(result, input);

number.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operator.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equals.addEventListener('click', button => {
    calculator.calculate();
    calculator.updateDisplay();
});

allclear.addEventListener('click', button => {
    calculator.clearall();
    calculator.updateDisplay();
})

clear.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})