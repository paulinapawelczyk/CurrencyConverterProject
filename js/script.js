const btnCount = document.querySelector('#btnCount');
const input = document.querySelector('input');
const currencyResult = document.getElementById('amount-code');
const rateOutput = document.querySelector('.rate');
const changeValue = document.querySelector('.exchangeResult');
const error = document.querySelector('.error-message');


const exchangeCurr = (e) => {
    e.preventDefault();

    let newDate = new Date();
    let actualDate;
    let requestDate;
    let fetchUrl;

    //loop for weekends when rates are not updated
    if (newDate.getDay() == 0) {
        actualDate = newDate.setDate(newDate.getDate() - 2);
        requestDate = newDate.toISOString().split('T')[0];
        fetchUrl = `https://api.nbp.pl/api/exchangerates/tables/a/${requestDate}/`;

    } else if (newDate.getDay() == 6) {
        console.log('sobota');
        actualDate = newDate.setDate(newDate.getDate() - 1);
        requestDate = newDate.toISOString().split('T')[0];
        fetchUrl = `https://api.nbp.pl/api/exchangerates/tables/a/${requestDate}/`;

    } else {
        console.log('tydzien');
        // fetchUrl = `http://api.nbp.pl/api/exchangerates/tables/a/today/`;
        actualDate = newDate.setDate(newDate.getDate());
        requestDate = newDate.toISOString().split('T')[0];
        fetchUrl = `https://api.nbp.pl/api/exchangerates/tables/a/${requestDate}/`;

    }

    fetch(fetchUrl)
        .then(result => result.json())
        .then(json => getPrices(json[0]))
        .catch(err => console.log('Brak danych dla aktualnej daty'))
}

const getPrices = (data) => {
    let rate = 0;
    let inputValue;
    const inputCurrency = currencyResult.options[currencyResult.selectedIndex].value;

    //add prevent to put null or inproper value
    if (input.value == 0) {
        error.textContent = "Please put a proper value!";
        input.value = null;
    }
    else {
        error.textContent = "";
        inputValue = input.value;

    }

    const amountCurrency = data.rates;

    amountCurrency.forEach(elem => {
        if (elem.code == inputCurrency) {
            rate = elem.mid;
        }
    }
    )

    rateOutput.textContent = `1 ${inputCurrency} = ${rate.toFixed(2)} PLN`;
    changeValue.textContent = (inputValue != null) ? `${(inputValue * rate).toFixed(2)}` : 0;

    currencyResult.value = "EUR";
    // input.value = null;

}
btnCount.addEventListener('click', exchangeCurr);