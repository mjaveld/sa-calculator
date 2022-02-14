import { FormulaToken, FormulaTokenType } from "./FormulaToken.js";
import { AddOperation, DivideOperation, ModuloOperation, MultiplyOperation, SubstractOperation } from "./Operations.js";

const tbxFormula = document.querySelector("#formula");
const listErrors = document.querySelector(".error-list");
const buttons = document.querySelectorAll("div.button");

tbxFormula.addEventListener("keypress", onKeyPress)
tbxFormula.addEventListener("input", onInput)

for(let button of buttons){
    button.onclick = onButtonClick;
}
function onButtonClick(buttonEvent){
    const char = buttonEvent.target.innerText;
    const addChar = handleInputs(char)
    // console.log(buttonEvent, char)
    if(addChar)
        tbxFormula.value += char
}

function onKeyPress(keyEvent){
    const r = /[0-9\u00F7\u00D7x+=/\\\-().]/
    const res = r.test(keyEvent.key);
    // console.log(keyEvent, res)
    if(!res)
        keyEvent.preventDefault();
}

function onInput(inputEvent){
    // console.log(inputEvent)
    const char = inputEvent.data
    const addChar = handleInputs(char)
    const input = inputEvent.srcElement
    if(!addChar)
        input.value = input.value.replace('=', '')
}

function handleInputs(char){
    if(char === 'AC')
    {
        tbxFormula.value = "";
        return false;
    }
    if(char === '=')
    {
        const {err, res} = tryCalculate();
        const h1 = document.createElement("h1");
        if(err){
            h1.appendChild(document.createTextNode(err));
        }
        else if(res){
            h1.appendChild(document.createTextNode(res))
            h1.style.backgroundColor = "lightgreen"
        }
        listErrors.appendChild(h1);
        return false;
    }
    return true;
}

const operations = []

function tryCalculate(){
    try {
        const formula = tbxFormula.value;
        const tokens = tokenizer(formula);
        createOperations(tokens);
        
        console.log(formula, tokens, operations)
        return {err: undefined, res: undefined}
    } catch (error) {
        console.error(error)
        return {err: error.message, res: undefined}
    }
}

function tokenizer(formula){
    const tokens = []
    let indent = 0
    for(let i = 0; i < formula.length; i++){
        const char = formula[i]
        const token = new FormulaToken(char);
        if(token.type === FormulaTokenType.BeginSection)
            indent++;
        else if (token.type === FormulaTokenType.EndSection)
            indent--;
        tokens.push(token)
    }
    if(indent != 0)
        throw new Error("Invalid indentation")

    return tokens
}

function createOperations(tokens, start = 0, end = 0){
    if(start != 0 && end != 0){
        console.log(tokens, start, end)
        for(let i = 0; i < tokens.length; i++){
            const token = tokens[i]
            const left = tokens.slice(0, i)
            const right = tokens.slice(i + 1)
            const numberLeft = Number(left.join(''))
            const numberRight = Number(right.join(''))
            if(token.type == FormulaTokenType.OpAdd){                
                operations.push(new AddOperation(numberLeft, numberRight))
                break;
            }
            if(token.type == FormulaTokenType.OpMinus){
                operations.push(new SubstractOperation(numberLeft, numberRight))
                break;
            }
            if(token.type == FormulaTokenType.OpTimes){
                operations.push(new MultiplyOperation(numberLeft, numberRight))
                break;
            }
            if(token.type == FormulaTokenType.OpDivider){
                operations.push(new DivideOperation(numberLeft, numberRight))
                break;
            }
            if(token.type == FormulaTokenType.OpModulo){
                operations.push(new ModuloOperation(numberLeft, numberRight))
                break;
            }
        }
        return;
    }

    for(let i = 0; i < tokens.length; i++){
        const token = tokens[i]
        if(token.type == FormulaTokenType.BeginSection)
            return createOperations(tokens.slice(i + 1), start + i, end)
        if(token.type == FormulaTokenType.EndSection)
            return createOperations(tokens.slice(0, i), start, start + end + i)
    }
}