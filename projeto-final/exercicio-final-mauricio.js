// https://and-lz.notion.site/Exerc-cio-Final-de-OOP-em-JavaScript-3feb1170e3a844c487fe8707fabb5e4f

/**
 * VERIFICAR CONSTANTES
 */

// Lista de objetos para instanciar as contas
const CONTAS = {
    'mauricio':{
        numero: '10100',
        saldo: 500,
        nome: 'Mauricio C.',
        profissao: 'Engenheiro'
    },
    'paula':{
        numero: '11100',
        saldo: 1000,
        nome: 'Paula C.',
        profissao: 'Medica'
    },
    'doris':{
        numero: '12100',
        saldo: 5000,
        nome: 'Doris D.',
        profissao: 'Cao feliz'
    }
}

// 1. Conta
class Conta {
    #numeroConta
    #saldo
    nomeUsuario
    profissaoUsuario
    static INSTRUCOES_GERAIS = 'Bem-vindo(a) \nNesta conta é possível fazer as seguintes acoes: \n- Visualizar detalhes da conta'
    static INSTRUCOES_CONTA = '\nDepositar dinheiro \nSacar dinheiro \n- Solicitar um empréstimo'

    constructor(numeroConta, nomeUsuario, saldoInicial=0, profissaoUsuario='') {
        this.#numeroConta = numeroConta
        this.#saldo = saldoInicial
        this.nomeUsuario = nomeUsuario
        this.profissaoUsuario = profissaoUsuario
    }

    get numeroConta() {
        return this.#numeroConta
    }

    get saldo() {
        return Conta.formatarValor(this.#saldo, true)
    }
    
    depositar(valor) {
        if (valor < 0) {
            throw new Error('Valor invalido')
        }
        this.#saldo += valor
        return `Deposito de ${Conta.formatarValor(valor, true)} realizado. Seu saldo atual é ${this.saldo}`
    }

    sacar(valor) {
        const saldoAtual = Conta.formatarValor(this.saldo)
        if (valor > saldoAtual) {
            throw new Error('Impossivel sacar mais do que o saldo da conta')
        }
        this.#saldo -= valor
        return `Saque de ${Conta.formatarValor(valor, true)} realizado. Seu saldo atual é ${this.saldo}`
    }

    checarExtrato() {
        return `Extrato da conta #${this.numeroConta}: \n${this.nomeUsuario} - ${this.profissaoUsuario} \nSaldo: ${this.saldo}`
    }
    
    solicitarEmprestimo(valor) {
        this.#saldo += valor
        return `Emprestimo de ${Conta.formatarValor(valor, true)} solicitado. Novo saldo: ${this.saldo}`
    }
    
    static criarConta(numeroConta, saldoInicial, numeUsuario, profissaoUsuario) {
        return new Conta(numeroConta, saldoInicial, numeUsuario, profissaoUsuario)
    }

    static imprimirInstrucoes() {
        return this.INSTRUCOES_GERAIS + this.INSTRUCOES_CONTA
    }

    static formatarValor(valor, display=false) {
        if (display) {
            return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        }
        return parseFloat(valor.replace(/R\$\s*|\./g, '').replace(',', '.'))
    }
}

// Testando classe Conta
const conta = Conta.criarConta(
    CONTAS.mauricio.numero, 
    CONTAS.mauricio.nome, 
    CONTAS.mauricio.saldo, 
    CONTAS.mauricio.profissao
)

console.log('1. Classe Conta')
console.log(conta.checarExtrato())
console.log(conta.depositar(600))
console.log(conta.solicitarEmprestimo(100))
console.log(conta.sacar(700))
console.log(Conta.imprimirInstrucoes())
console.log('\n-----------------------------------------------------------------\n')

// 2. Conta corrente
class ContaCorrente extends Conta {
    #limiteChequeEspecial
    #taxaManutencao
    #PORCENTAGEM_MAXIMA_CHEQUE_ESPECIAL = 0.6
    #TAXA_MANUTENCAO = 0.01
    static contasCorrente = []
    static INSTRUCOES_CONTA_CORRENTE = '\n- Alterar o limite de cheque especial \n- Visualizar a taxa de manutencao'

    constructor(numeroConta, saldoInicial=10, nomeUsuario, profissaoUsuario='') {
        super(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario)
        this.#limiteChequeEspecial = 0
        this.#taxaManutencao = 5
        ContaCorrente.contasCorrente.push(this)
    }

    get limiteChequeEspecial() {
        return Conta.formatarValor(this.#limiteChequeEspecial, true)
    }

    get taxaManutencao() {
        return Conta.formatarValor(this.#taxaManutencao, true)
    }

    gerenciarLimiteChequeEspecial(novoLimite) {
        if (novoLimite < 0) {
            throw new Error('Valor invalido.')
        }

        const saldoAtual = Conta.formatarValor(this.saldo)
        const limiteMaximo = this.#PORCENTAGEM_MAXIMA_CHEQUE_ESPECIAL * saldoAtual
        if (novoLimite > limiteMaximo) {
            throw new Error(`O cheque especial não pode exceder ${this.#PORCENTAGEM_MAXIMA_CHEQUE_ESPECIAL*100}% do valor em conta`)
        }

        this.#limiteChequeEspecial = novoLimite
        return `Alteração do cheque especial solicitada. Novo limite: ${this.limiteChequeEspecial}`
    }

    calcularTaxaManutencao() {
        this.#taxaManutencao = this.#TAXA_MANUTENCAO * Conta.formatarValor(this.saldo)
        return `Sua taxa de manutencao é: ${this.taxaManutencao}`
    }

    static listarTodasContasCorrente() {
        let contas = 'Lista de contas-corrente: \n'
        ContaCorrente.contasCorrente.forEach(conta => {
            contas += `#${conta.numeroConta}: ${conta.nomeUsuario} - ${conta.profissaoUsuario}\n`
        });
        return contas
    }

    static imprimirInstrucoes() {
        return Conta.INSTRUCOES_GERAIS + this.INSTRUCOES_CONTA_CORRENTE
    }
}

// Testando classe ContaCorrente
const cc1 = new ContaCorrente(
    CONTAS.mauricio.numero, 
    CONTAS.mauricio.nome, 
    CONTAS.mauricio.saldo, 
    CONTAS.mauricio.profissao
)

const cc2 = new ContaCorrente(
    CONTAS.paula.numero, 
    CONTAS.paula.nome, 
    CONTAS.paula.saldo, 
    CONTAS.paula.profissao
) 

const cc3 = new ContaCorrente(
    CONTAS.doris.numero, 
    CONTAS.doris.nome, 
    CONTAS.doris.saldo, 
    CONTAS.doris.profissao
) 

console.log('2. Classe ContaCorrente')
console.log(cc2.checarExtrato())
cc2.depositar(500)
console.log(cc2.checarExtrato())
console.log(cc2.calcularTaxaManutencao())
console.log(cc2.limiteChequeEspecial)
console.log(cc2.gerenciarLimiteChequeEspecial(800))
console.log(ContaCorrente.listarTodasContasCorrente())
console.log(ContaCorrente.imprimirInstrucoes())
console.log('\n-----------------------------------------------------------------\n')

// 3. Conta poupanca'
class ContaPoupanca extends Conta {
    #taxaJuros
    #limiteSaques
    static melhoresInvestimentos = ["Tesouro Direto", "Ações"]
    static INSTRUCOES_CONTA_POUPANCA = '\n- Calcular os juros \n- Gerenciar seu limite de saques \n- Verificar indicações de investimentos'

    constructor(numeroConta, saldoInicial=0, nomeUsuario, profissaoUsuario='') {
        super(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario)
        this.#taxaJuros = 0.01
        this.#limiteSaques = 0
    }

    get taxaJuros() {
        return this.#taxaJuros
    }

    get limiteSaques() {
        return Conta.formatarValor(this.#limiteSaques, true)
    }

    calcularJuros() {
        const saldoAtual = Conta.formatarValor(this.saldo)
        const juros = (1 + this.taxaJuros) * saldoAtual
        return `Seu saldo com juros: ${juros}`
    }

    gerenciarLimiteSaques(novoLimite) {
        this.#limiteSaques = novoLimite
        return `Alteração do limite para saques solicitada. Novo limite:  ${this.#limiteSaques}`
    }

    static verificarMelhorInvestimento() {
        const melhorInvestimento = ContaPoupanca.gerarDigitoAleatorio()
        return `O melhor investimento para sua conta poupanca é: ${ContaPoupanca.melhoresInvestimentos[melhorInvestimento]}`
    }

    static gerarDigitoAleatorio(max=2) {
        return parseInt(Math.floor(Math.random() * max))
    }

    static imprimirInstrucoes() {
        return Conta.INSTRUCOES_GERAIS + this.INSTRUCOES_CONTA_POUPANCA
    }
}

// Testando classe ContaPoupanca
const cp1 = new ContaPoupanca(
    CONTAS.mauricio.numero, 
    CONTAS.mauricio.nome, 
    CONTAS.mauricio.saldo, 
    CONTAS.mauricio.profissao
)

const cp2 = new ContaPoupanca(
    CONTAS.paula.numero, 
    CONTAS.paula.nome, 
    CONTAS.paula.saldo, 
    CONTAS.paula.profissao
) 

const cp3 = new ContaPoupanca(
    CONTAS.doris.numero, 
    CONTAS.doris.nome, 
    CONTAS.doris.saldo, 
    CONTAS.doris.profissao
)

console.log('3. Classe ContaPoupanca')
console.log(cp3.checarExtrato())
cp3.depositar(500)
console.log(cp3.calcularJuros())
console.log(cp3.gerenciarLimiteSaques(800))
console.log(ContaPoupanca.verificarMelhorInvestimento())
console.log(ContaPoupanca.imprimirInstrucoes())
