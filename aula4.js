// Parte 1: Criando uma classe para Cliente
// 1. Criem uma nova classe para os clientes desse banco
// 2. Ela deve possuir os atributos id, name, account (conta) e digit (digito da conta). Vocés podem criar quantos atributos a mais vocés quiserem

class Bank {
    #name
    description
    #departments
    #clients

    constructor(name, description, departments, clients) {
        this.#name = name
        this.description = description
        this.#departments = departments
        this.#clients = clients
    }

    get name() {
        return this.#name
    }
    
    set name(value) {
        this.#name = value
    }

    get clients() {
        return this.#clients
    }

    set clients(newClients) {
        this.#clients = newClients
    }

    getClientById(id) {
        return this.clients.find(client => client.id === id).name
    }

    removeClientById(id) {
        this.clients = this.clients.filter(client => client.id !== id)
    }

    createNewClient(client) {
        const clientExists = this.clients.some(c => c.id === client.id || c.name === client.name)
        if (!clientExists) this.clients.push(client)
    }
}

class Client {
    #id
    name
    #account
    #digit
    constructor(id, name, account, digit) {
        this.#id = id
        this.name = name
        this.#account = account
        this.#digit = digit
    }

    get id() {
        return this.#id
    }
}

const joao = new Client('1', 'Joao M', '123456789', '0')
const luis = new Client('2', 'Luis C', '234567890', '1')
const mauricio = new Client('3', 'Mauricio C', '134567890', '2')

const nome = 'Santander'
const description = 'A solução completa para o seu negócio'
const departments = ['Crédito', 'Contas a pagar', 'Atendimento ao cliente']
const clients =  [ joao, luis, mauricio ]

const bank = new Bank(nome, description, departments, clients)
console.log(bank)

// Parte 2: Criando métodos
// 1. Criem um método que busca um determinado cliente a partir do seu id no banco
console.log(bank.getClientById('1'))
console.log(bank.getClientById('2'))
console.log(bank.getClientById('3'))

// 2. Criem um método que remove um cliente a partir do seu id no banco
console.log(bank.clients)
bank.removeClientById('2')
bank.removeClientById('3')
console.log(bank.clients)

// 3. Criem um método que adiciona um novo cliente no banco. Antes de criar, vocês devem validar se: (a) já existe um cliente com esse id; (b) se já existe um cliente com o nome em questão. Caso já exista, não adicionem o novo cliente
const otherClient = new Client('5', 'Dannyel Kayke', '124567890', '3')
bank.createNewClient(otherClient)
console.log(bank.clients)