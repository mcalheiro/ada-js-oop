# ada-js-oop
Este repositório contém o código dos exercícios realizados durante o curso de programação orientada a objetos com javascript, da Ada|Santanter Coders. O exercício final é baseado [nestas instruções](https://and-lz.notion.site/Exerc-cio-Final-de-OOP-em-JavaScript-3feb1170e3a844c487fe8707fabb5e4f) e pode ser encontrado em ```projeto-final/exercicio-final-mauricio.js```.

# 1. Classe Conta
Foram adicionados os atributos publicos e privados espeficicados e, no constructor, tomei a liberdade de definir alguns valores padrão (não especificados): ```saldoInicial=0``` e ```profissaoUsuario=''```. Assim, o numero da conta e o nome do usuario sao obrigatorios ao instanciar um objeto.

## 1.1 Metodos adicionais
Foram criados os metodos ```depositar()``` , ```sacar()```e ```formatarValor()```. Os primeiros servem para adicionar dinheiro e remover dinheiro da conta e ultimo serve para converter valores como "R$ 535,03" para o numero 535.03. Este metodo é necessario para fazer operacoes utilizando o saldo, uma vez que o getter retorna uma string formatada.

# 2. Classe ContaCorrente
Além do que foi solicitado nas instrucoes, foram definidas algumas constantes (```PORCENTAGEM_MAXIMA_CHEQUE_ESPECIAL``` e ```TAXA_MANUTENCAO```), a fim de calcular algumas variaveis dentro de métodos da classe.

# 3. Classe ContaPoupanca
Para esta classe, além do que foi solicitado, foi definida uma porcentagem maxima de saque e alguns metodos estaticos auxiliares: ```gerarDigitoAleatorio()``` para gerar um numero entre 0 e 1 e indicar o melhor investimento e ```imprimirInstrucoes()```, que sobrescreve o metodo herdado da classe Conta.

# Sobre getters e setters
Utilizei apenas getters para exibir os valores de atributos privados formatados em Real Brasileiro. Não utilizei setters, para não permitir de escrita em atributos privados.  
