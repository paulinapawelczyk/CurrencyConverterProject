const btnCount = document.querySelector('#btnCount');
const input = document.querySelector('input');
const currencyResult = document.getElementById('amount-code');
const rateOutput = document.querySelector('.rate');
const changeValue = document.querySelector('.exchangeResult');
const error = document.querySelector('.error-message');


const exchangeCurr = (e) => {
    e.preventDefault();

    let newDate = new Date('2021-03-15T13:14:00');
    let dateDay = newDate.getDay();
    let dateHours = newDate.getHours();

    let calculateDate;
    let requestDate;
    let fetchUrl;

    //loop for weekends when currency rate are not updated
    {
        //if sunday take from friday
        if (dateDay == 0) {
            calculateDate = newDate.setDate(newDate.getDate() - 2);

            //if saturday take from friday or if hour before 11
        } else if ((dateDay == 6) || (dateHours < 13 && dateDay != 1 && dateDay != 0 && dateDay != 6)) {
            calculateDate = newDate.setDate(newDate.getDate() - 1);

            //if monday before 11 when rates are publish take from Friday
        } else if (dateDay == 1 && dateHours < 13) {
            calculateDate = newDate.setDate(newDate.getDate() - 3);
        }
        // other days
        else {
            calculateDate = newDate.setDate(newDate.getDate());
        }


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