const transactionsUl = document.querySelector('#transactions');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');
const incomeDisplay = document.querySelector('#money-plus'); // id do paragrafo que exibe as receitas
const expenseDisplay = document.querySelector('#money-minus');// id do paragrafo que exibe as despesas
const balanceDisplay = document.querySelector('#balance');// id do paragrafo que exibe o saldo total

// objeto literal FICTICIO
let dummyTransactions = [];


const addTransactionInArray = (transactionName, transactionAmount) => {
    dummyTransactions.push({
        id: dummyTransactions[dummyTransactions.length - 1].id + 1,
        name: transactionName,
        amount: Number(transactionAmount)
    })
}

const handleFormSubmit = event => {
    event.preventDefault();

    const isSomeInputEmpty = inputTransactionName.value.trim() === '' || inputTransactionAmount.value.trim() === '';

    if (isSomeInputEmpty) {
        alert('Informe a descrição e o valor da transação');
        return;
    }
    addTransactionInArray(inputTransactionName.value, inputTransactionAmount.value);
    init();
    cleanInputs();
}

const cleanInputs = () => {
    inputTransactionName.value = '';
    inputTransactionAmount.value = '';
}

const removeTransaction =  ID => {
    dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID);
    init();
}

form.addEventListener('submit', handleFormSubmit);

                    // é o parametro da funcao
const addTransactionIntoDOM = transaction => {
    const li = document.createElement('li') //<li></li>
    // condicao na linha if ternário
    const operator = transaction.amount < 0 ? '-' : '+';
    const amountWithoutOperator = Math.abs(transaction.amount);
    const CssClass = transaction.amount < 0 ? 'minus' : 'plus';

    li.innerHTML = `
                ${transaction.name}
                <span> ${operator} R$ ${amountWithoutOperator} </span>
                <button class="delete-btn" onClick="removeTransaction(${transaction.id})">X</button> ` 
    //atribuindo um nó para o li
    transactionsUl.append(li);

}

// metodo que irá separar os valores de total, receitas e despesas
const updateBalanceValues = () => {

    // pega todos so valores(amount) de cada linha do array
    const transactionsAmounts = dummyTransactions.map(({ amount }) => amount)

    // totalizador 
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0);

    // somente as receitas
    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, transaction) => accumulator + transaction, 0);

    // somente as despesas
    const expenses = transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, transaction) => accumulator + transaction, 0);

    balanceDisplay.textContent = `R$ ${total}`;
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `R$ ${expenses}`;
}

const init = () => {
    // aqui iremos fazer um tratamento a nivel de codigo para nao 
    // submeter toda a lista novamente (gambiarra)
    // solucao a nivel de codigo
    transactionsUl.innerHTML = '';
    dummyTransactions.forEach(addTransactionIntoDOM);
    updateBalanceValues();

}

// funcao de inicializacao do js
init();