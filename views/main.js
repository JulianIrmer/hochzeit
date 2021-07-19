function init() {
    const submitButton = document.querySelector('.js-submit');
    submitButton.addEventListener('click', submitForm)
}

function submitForm() {
    const url = window.location.protocol + '//' + window.location.host;
    const firstName = document.querySelector('js-firstName');
    const lastName = document.querySelector('js-lastName');
    const email = document.querySelector('js-email');
    const phone = document.querySelector('js-phone');
    const attendance = document.querySelector('js-attendance');
    const transport = document.querySelector('js-transport');
    const vegan = document.querySelector('js-vegan');
    const vegetarian = document.querySelector('js-vegetarian');
    const intolerances = document.querySelector('js-intolerances');

    const data = {
        firstName,
        lastName,
        email,
        phone,
        attendance,
        transport,
        vegan,
        vegetarian,
        intolerances
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

init();