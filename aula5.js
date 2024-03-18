// https://github.com/joaogolias/FE-JS-003-PROGRAMACAO-ORIENTADA-A-OBJETOS-v1

// Parte 1: Alterações na classe BankAccount
// 1. Na classe BankAccount, adicione um método que representa o “saque” de um 
// valor, que deve:
// a. Descontar o valor que estamos tentando sacar
// b. Retornar o novo valor da conta
class BankAccount {
    #number
    #digit
    #amount

    constructor(number, digit, amount) {
        this.#number = number
        this.#digit = digit
        this.#amount = amount
    }

    get number() {
        return this.#number
    }

    get digit() {
        return this.#digit
    }

    get amount() {
        return this.#amount
    }

    set amount(newAmount) {
        this.#amount = newAmount
    }

    addAmount(amount) {
        this.amount += amount
    }

    withdraw(amount) {
        if (amount <= 0) throw new Error('Valor invalido')
        this.amount -= amount
        return this.amount
    }
}

// Parte 2: Especificidades da SavingsBankAccount
// 1. Na classe SavingsBankAccount , adicione uma propriedade para representar o 
// “valor mínimo da conta”
// 2. Na classe SavingsBankAccount , altere o método de “saque” para que ele não 
// permita realizar o saque caso o novo valor armazenado da conta passe a ser 
// menor do que o “valor mínimo da conta”
class SavingsBankAccount extends BankAccount {
    #minimumAmount
    constructor(number, digit, amount) {
        super(number, digit, amount)
        this.#minimumAmount = 5000
    }

    printAccount() {
        // console.log(super.#account) // Dá um erro
        console.log(this.account) // Funciona, porque é um método herdado
    }

    addAmount(amount) {
        console.log('Adding savings')
        super.addAmount(amount)
    }

    get amount() {
        return super.amount //* 2
    }

    set amount(newAmount) {
        super.amount = newAmount
    }

    get minimumAmount() {
        return this.#minimumAmount
    }

    withdraw(amount) {
        if (this.amount - amount >= this.minimumAmount) {
            console.log('Sacando R${amount}...')
            return super.withdraw(amount)
        } else {
            throw new Error(`É preciso manter o valor minimo de R$${this.minimumAmount}`)
        }
    }
}

// Parte 3: Criação do ProfitableBankAccount
// 1. Criem uma nova classe chamada ProfitableBankAccount  (conta rentável) que é 
// filha da classe BankAccount
// 2. Toda vez que adicionarmos um novo valor nessa conta, ela deve: 
// a. Adicionar 1% em relação ao valor adicionado
// b. Descontar uma comissão de R$3,00
// Exemplo: ao adicionar R$500 reais, na verdade, ela deve adicionar:
// R$500,00 + 1%*R$500,00 (R$5,00) - R$3,00 = R$502,00
// 3. Toda vez que realizamos um saque nesta conta, ela deve descontar R$0,50 do 
// valor armazenado. Altere o método de saque para isso. 
class ProfitableBankAccount extends BankAccount {

    constructor(number, digit, amount) {
        super(number, digit, amount)
    }

    addAmount(amount) {
        this.amount += amount * 1.01 - 3
    }

    withdraw(amount) {
        return super.withdraw(amount + 0.5)
    }
}

// Parte 4: Alteração na classe Client
// 1. Criem um método que permite adicionar uma conta ao Client
// 2. O banco que estamos simulando só permite que clientes tenham contas de 
// poupança ou rentáveis. Então, alterem o Client para que:
// - No construtor, não permita adicionar contas do tipo BankAccount, 
// apenas de suas filhas.
// - No método de adicionar uma conta, não permita adicionar contas do tipo 
// BankAccount, apenas de suas filhas.
class Client {
    #id
    #name
    #accounts

    constructor(id, name, accounts) {
        this.#id = id
        this.#name = name
        this.#accounts = accounts.filter(acc => acc instanceof SavingsBankAccount || acc instanceof ProfitableBankAccount)
    }

    get name() {
        return this.#name
    }

    get accounts() {
        return this.#accounts.map(acc => acc.number)
    }

    addAccount(account) {
        if (account instanceof SavingsBankAccount || account instanceof ProfitableBankAccount){
            this.#accounts.push(account)
            return `Conta ${account.number} adicionada para o cliente ${this.name}`
        } else {
            throw new Error('Tipo de conta invalida')
        }
    }
}

// Teste parte 1
const acc = new BankAccount('1000', '0', 1000)
console.log(acc.number)
console.log(acc.digit)
console.log(acc.amount)
console.log(acc.withdraw(100))

// Teste parte 2
const savingsAcc = new SavingsBankAccount('1001', '1', 10000)
console.log(savingsAcc.number)
console.log(savingsAcc.digit)
console.log(savingsAcc.amount)
console.log(savingsAcc.minimumAmount)
console.log(savingsAcc.withdraw(5000))

// Teste parte 3
const protitableAcc = new ProfitableBankAccount('1002', '2', 1000)
console.log(protitableAcc.number)
console.log(protitableAcc.digit)
console.log(protitableAcc.amount)
protitableAcc.addAmount(500)
console.log(protitableAcc.amount)
console.log(protitableAcc.withdraw(502))

// Teste parte 4
const client = new Client('1', 'Dannyel', [acc, savingsAcc, protitableAcc])
console.log(client.accounts)
console.log(client.addAccount(acc))
console.log(client.addAccount(savingsAcc))
console.log(client.accounts)