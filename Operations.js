export class BaseOperation{
    constructor(type, left, right){
        this.type = type
        this.left = left
        this.right = right
    }

    execute(){
        return -1;
    }
}

export class AddOperation extends BaseOperation{
    constructor(left, right){
        super("AddOperation", left, right);
    }

    execute(){
        return left + right;
    }
}

export class SubstractOperation extends BaseOperation{
    constructor(left, right){
        super("SubstractOperation", left, right)
    }

    execute(){
        return left - right;
    }
}

export class MultiplyOperation extends BaseOperation{
    constructor(left, right){
        super("MultiplyOperation", left, right)
    }

    execute(){
        return left * right;
    }
}

export class DivideOperation extends BaseOperation{
    constructor(left, right){
        super("DivideOperation", left, right)
    }

    execute(){
        return left / right;
    }
}

export class ModuloOperation extends BaseOperation{
    constructor(left, right){
        super("ModuloOperation", left, right)
    }

    execute(){
        return left % right;
    }
}