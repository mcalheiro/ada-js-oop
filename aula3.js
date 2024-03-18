class Exemplo {
    #privada
    publica
    constructor(param1, param2){
        this.publica = param1
        this.#privada = param2
    }

    get priv() {
        return this.#privada
    }

    set priv(newValue) {
        this.#privada = newValue
    }
}

const ex1 = new Exemplo('Teste', 1000)
console.log(ex1)
