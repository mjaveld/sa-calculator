const tbxFormula = document.getElementById("formula")
// console.log(tbxFormula)

const buttons = document.querySelectorAll("div.button")

for(let button of buttons){
    button.onclick = onButtonClick
}

function onButtonClick(mouseEvent){
    const char = mouseEvent.target.innerText;
    console.log(char);
    if(char === 'AC')
    {
        tbxFormula.value = ""
        return;
    }
    if(char === '=')
    {
        return;
    }
    tbxFormula.value += char
}