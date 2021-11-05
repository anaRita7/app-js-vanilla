const transactionsUl = document.querySelector('#transactions');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount= document.querySelector('#amount');
const balanceH1 = document.querySelector('#balance');
const moneyPlusH4 = document.querySelector('#money-plus');
const moneyMinusH4 = document.querySelector('#money-minus');

// objeto literal FICTICIO
let dummyTransactions = [
    { id: 1, name: 'Bolo de brigadeiro', amount: -20 },
    { id: 2, name: 'Salario', amount: 300 },
    { id: 3, name: 'Torta de frango', amount: -10 },
    { id: 4, name: 'Violão', amount: 150 }
]

const addTransactionInArray = (transactionName,transactionAmount) =>{
    dummyTransactions.push({
        id: 123,
        name: transactionName.value,
        amount: Number (transactionAmount.value)
    })
}

const handleFormSubmit = event =>{
    event.preventDefault();
    if(inputTransactionName.value.trim() === '' || 
                inputTransactionAmount.value.trim() === ''){
      alert('Informe a descrição e o valor da transação');
      return;
    }
    addTransactionInArray(inputTransactionName,inputTransactionAmount);
    init();
}

form.addEventListener('submit', handleFormSubmit);

const addTransactionIntoDOM = transaction =>{
    const li = document.createElement('li')

    li.innerHTML = `${transaction.name}`
    //atribuindo um nó para o li
    transactionsUl.append(li);
}

 // metodo que irá separar os valores de total, receitas e despesas
const updateBalanceValues = () => {
    const transactionsAmounts = dummyTransactions.map(({amount}) => amount)
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator+transaction,0);
    
    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, transaction) => accumulator+transaction,0);

    const expenses = transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, transaction) => accumulator+transaction,0);

    balanceH1.textContent = `R$ ${total}`;
    moneyPlusH4.textContent = `R$ ${income}`;
    moneyMinusH4.textContent = `R$ ${expenses}`;
}

const init = () =>{
    transactionsUl.innerHTML = '';
    dummyTransactions.forEach(addTransactionIntoDOM);
    updateBalanceValues();
}

init();