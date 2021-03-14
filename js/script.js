const btnCount = document.querySelector('#btnCount');
const input = document.querySelector('input');
const currencyResult = document.getElementById('amount-code');
const rateOutput = document.querySelector('.rate');
const changeValue = document.querySelector('.exchangeResult');

const exchangeCurr = (e) => {
    e.preventDefault();

    let newDate = new Date();
    //!!!!!!to do - LOOP for weekends!!!!!!
    let actualDate = newDate.setDate(newDate.getDate() - 3);

    let yesterdayDate = newDate.toISOString().split('T')[0];
    // console.log(yesterdayDate);

    fetch(`http://api.nbp.pl/api/exchangerates/tables/a/${yesterdayDate}/`)
        .then(result => result.json())
        .then(json => getPrices(json[0]))
        .catch(err => console.log('Brak danych dla aktualnej daty'))


}


const getPrices = (data) => {
    let rate = 0;
    const inputValue = input.value;
    const inputCurrency = currencyResult.options[currencyResult.selectedIndex].value;

    const amountCurrency = data.rates;

    amountCurrency.forEach(elem => {
        if (elem.code == inputCurrency) {
            rate = elem.mid;
        }
    }
    )

    rateOutput.textContent = `1 ${inputCurrency} = ${rate.toFixed(2)} PLN`;
    changeValue.textContent = `${(inputValue * rate).toFixed(2)}`;

    currencyResult.value = "EUR";
    // input.value = null;


}
btnCount.addEventListener('click', exchangeCurr);