const btnCount = document.querySelector('#btnCount');
const input = document.querySelector('input');
// const curr = document.querySelector('')
const currencyResult = document.getElementById('amount-code');



const exchangeCurr = (e) => {
    e.preventDefault();

    let newDate = new Date();
    let actualDate = newDate.setDate(newDate.getDate() - 1);

    let yesterdayDate = newDate.toISOString().split('T')[0];
    // console.log(yesterdayDate);

    fetch(`http://api.nbp.pl/api/exchangerates/tables/a/${yesterdayDate}/`)
        .then(result => result.json())
        .then(json => getPrices(json[0]))
        .catch(err => console.log('Brak danych dla aktualnej daty'))
}


const getPrices = (data) => {



    const inputValue = input.value;
    const currency = currencyResult.options[currencyResult.selectedIndex].text;
    let amountCurrency = data.rates[9].code;
    console.log(amountCurrency);


}
btnCount.addEventListener('click', exchangeCurr);