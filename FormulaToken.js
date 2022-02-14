export class FormulaTokenType{
    static BeginSection = new FormulaTokenType("begin-section")
    static EndSection = new FormulaTokenType("end-section")
    static OpModulo = new FormulaTokenType("op-modulo")
    static Number = new FormulaTokenType("number")
    static OpDivider = new FormulaTokenType("op-divider")
    static OpTimes = new FormulaTokenType("op-times")
    static OpMinus = new FormulaTokenType("op-minus")
    static OpAdd = new FormulaTokenType("op-add")
    static Separator = new FormulaTokenType("separator")
    static Equals = new FormulaTokenType("equals")

    constructor(name){
        this.name = name
    }

    toString(){
        return `{FormulaTokenType.${this.name}}`
    }

    toJSON(key){
        return `{FormulaTokenType.${this.name}}`
    }
}

export class FormulaToken{
    #token
    type = FormulaTokenType.Number
    constructor(token){
        this.token = token
    }

    set token(value){
        this.type = FormulaTokenType.Number
        if(value === '(')
            this.type = FormulaTokenType.BeginSection
        if(value === ')')
            this.type = FormulaTokenType.EndSection
        if(value === '\u00F7' || value === '/')
            this.type = FormulaTokenType.OpDivider
        if(value === '\u00D7' || value === 'x' || value === 'X')
            this.type = FormulaTokenType.OpTimes
        if(value === '\u2212')
            this.type = FormulaTokenType.OpMinus
        if(value === '\u002B')
            this.type = FormulaTokenType.OpAdd
        if(value === '%')
            this.type = FormulaTokenType.OpModulo
        if(value === '.')
            this.type = FormulaTokenType.Separator
        if(value === '=')
            this.type = FormulaTokenType.Equals
        
        this.#token = value
    }

    toString(){
        return this.#token;
    }

    toJSON(key){
        return `${this.type} ${this.#token}`
    }
}