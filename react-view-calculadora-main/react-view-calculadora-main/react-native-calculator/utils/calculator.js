import numbro from "numbro";

export const initialState = {
previousValue: null,
currentValue: "0",
operator: null,
justCalculated: false,
lastCurrentValue: null
};

const calculate = (operation, value, state, error, addHistoryElement) => {
let newState = {...state};
newState.justCalculated = false;
switch (operation) {
case "clear": {
newState = {...initialState};
break;
}
case "clearLast": {
newState.currentValue = "0";
break;
}
case "delete": {
newState.currentValue = deleteDigit(newState.currentValue, error);
break;
}
case "equal": {
newState.justCalculated = true;
newState.lastCurrentValue = newState.currentValue;
newState.currentValue = equals(newState);
let element = {
id: new Date().getTime(),
text: `${newState.previousValue} ${newState.operator} ${newState.lastCurrentValue} =
${newState.currentValue}`,
};
addHistoryElement(element);
break;
}
case "log": {
newState.currentValue = setNumber(Math.log10(getNumber(newState.currentValue, error)));
break;
}
case "number": {
newState.currentValue = addDigit(newState.currentValue, value, error);
break;
}
case "operator": {
newState = {
operator: value,
previousValue: newState.currentValue,
currentValue: "0"
}
break;
}
case "percentage": {
newState.currentValue = setNumber(getNumber(newState.currentValue) * 0.01, error);
break;
}
case "posneg": {
newState.currentValue = setNumber(getNumber(newState.currentValue) * -1, error);
break;
}
case "sin": {
newState.currentValue = setNumber(Math.sin(getNumber(newState.currentValue)), error);
break;
}
case "square-root": {
newState.currentValue = setNumber(Math.sqrt(getNumber(newState.currentValue)), error);
break;
}
}
return newState;
};
export default calculate;

const addDigit = (currentValue, digit, error) => {
if (currentValue === "ERROR") {
return setNumber(digit, error);
}
else if ((currentValue === "0") && (digit !== ".")) {
return setNumber(digit, error);
}
return setNumber(currentValue + digit, error);
};

const getNumber = (number) => {
return parseFloat(number);
}
const setNumber = (number, error) => {
if (!isFinite(number)) {
error();
return "ERROR";
}
return `${number}`;
}
const deleteDigit = (currentValue, error) => {
if (currentValue.length === 1) {
return "0";
}
else if (currentValue === "ERROR") {
error();
return currentValue;
}
else if (currentValue[currentValue.length-2] === ".") {
return currentValue.slice(0, -2);
}
else {
return currentValue.slice(0, -1);
}
}

const equals = (state, error) => {
const currentValue = getNumber(state.currentValue);
const previousValue = getNumber(state.previousValue);
if (state.previousValue === null) return setNumber(currentValue, error);
if (state.operator === null) return setNumber(currentValue, error);
switch (state.operator) {
case "+": return setNumber(previousValue + currentValue, error);
case "-": return setNumber(previousValue - currentValue, error);
case "*": return setNumber(previousValue * currentValue, error);
case "/": return setNumber(previousValue / currentValue, error);
}
}

export const showNumber = (number) => {
if (number === "ERROR") return "ERROR"
let result = numbro(number).format({ thousandSeparated:true })
return (number[number.length-1] === ".") ? result + "." : result;
}
export const showOperation = (state) => {
let value = "";
if (state.previousValue !== null) value += showNumber(state.previousValue);
if (state.operator !== null) value += " " + state.operator;
if (state.justCalculated) value += " " + showNumber(state.lastCurrentValue) + " =";
return value;
}
