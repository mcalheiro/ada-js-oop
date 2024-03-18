// Entidade Heroi
//  Precisa ter um super poder, 
//    quantidade de ataque(de 10 a 100),
//    defesa 
//    HP
//    Mana
//    Nome do heroi em si, ex: Batman
//    Considerar alguns atributos como privado
//    Atacar => n
//    Defender => toma um dano, e reduz da ida
//    Pensar um getter e um setter pelo menos

class Heroi {
    _nome;
    _poder;
    #hp;
    #atk;
    #def;
    #mana;

    constructor(nome, poder='', hp = 100, atk=10, def=10, mana=10) {
        this._nome = nome.toUpperCase()
        this._poder = poder
        this.#hp = hp
        this.#atk = atk
        this.#def = def
        this.#mana = mana
    }

    get nome() {
        return this._nome
    }

    set nome(novoNome) {
        novoNome = novoNome.toUpperCase()
        if (novoNome=='') {
            throw Error('O heroi precisa de um nome')
        }
        else if (novoNome==this._nome) {
            throw Error('O nome precisa ser diferente')
        }
        else {
            this._nome = novoNome
        }
    }

    get atk() {
        return this.#atk
    }

    get hp() {
        return this.#hp
    }
    
    get def() {
        return this.#def
    }
    
    atacar(adversario) {
        if (this.atk > adversario.def) {
            adversario.defender(this.atk)
            return `${this.nome} atacou ${adversario.nome}...`
        } else {
            return `${this.nome} atacou, mas ${adversario.nome} defendeu...`
        }
    }
    
    defender (dano) {
        if ((dano >= this.#hp)) {
            this.#hp = 0
        } else {
            this.#hp -= dano
        }
    }

    estaVivo() {
        return this.hp > 0
    }
    
    estado() {
        if (this.estaVivo()) return `${this.nome} ainda possui ${this.hp} HP.`
        
        return `${this.nome} foi derrotado: ${this.hp} HP.`
    }
}

batman = new Heroi('batman', poder='', hp = 100, atk=11)
coringa = new Heroi('coringa', poder='loucura', hp = 100)

console.log(batman)
// console.log(batman.nome)
// console.log(batman.atk)
// console.log(batman.hp)
// console.log(batman.def)

console.log(coringa)
// console.log(coringa.nome)
// console.log(coringa.atk)
// console.log(coringa.hp)
// console.log(coringa.def)


while (coringa.estaVivo()) {
    luta = batman.atacar(coringa)
    console.log(luta, coringa.estado())
}