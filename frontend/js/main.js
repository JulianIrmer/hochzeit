function init() {
    warmUp();
    const submitButton = document.querySelector('.js-submit');
    submitButton.addEventListener('click', submitForm);
    intersection();
}

function warmUp() {
    const url = 'http://kimundtom.herokuapp.com/';
    fetch(url);
}

async function submitForm(e) {
    e.preventDefault();
    showSpinner();
    const url = 'http://kimundtom.herokuapp.com/api/add';
    const firstName = document.querySelector('.js-firstName').value;
    const lastName = document.querySelector('.js-lastName').value;
    const email = document.querySelector('.js-email').value;
    const phone = document.querySelector('.js-phone').value;
    const attendance = document.querySelector('.js-attendance').value;
    const transport = document.querySelector('.js-transport').value;
    const food = document.querySelector('.js-food').value;
    const intolerances = document.querySelector('.js-intolerances').value;
    const music = document.querySelector('.js-music').value;
    const other = document.querySelector('.js-other').value;

    const data = {
        firstName,
        lastName,
        email,
        phone,
        attendance,
        transport,
        food,
        intolerances,
        music,
        other
    };

    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    response = await response.json();

    if (response.success) {
        hideSpinner();
        showSuccessMessage();
        resetForm();
    }
}

function resetForm() {
    const firstName = document.querySelector('.js-firstName').value = '';
    const lastName = document.querySelector('.js-lastName').value = '';
    const email = document.querySelector('.js-email').value = '';
    const phone = document.querySelector('.js-phone').value = '';
    const attendance = document.querySelector('.js-attendance').value;
    const transport = document.querySelector('.js-transport').value;
    const food = document.querySelector('.js-food').value;
    const intolerances = document.querySelector('.js-intolerances').value = '';
    const music = document.querySelector('.js-music').value = '';
    const other = document.querySelector('.js-other').value = '';
}

function showSuccessMessage() {
    const submitButton = document.querySelector('.js-submit');
    submitButton.innerText = 'Gespeichert!';
    submitButton.classList.remove('btn-primary');
    submitButton.classList.add('btn-success');
}

function intersection() {
    const options = {
        rootMargin: '0px 0px -125px 0px',
        threshold: 0.75
    };

    const observer = new IntersectionObserver(onIntersection, options);
    const elements = document.querySelectorAll('.animate');
  
    elements.forEach((element) => {
        observer.observe(element);
    });
}

function onIntersection(entries) {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('animate')) {
                animate(entry);
            }
        }
    }
};

function animate(element) {
    const {target} = element;
    target.classList.remove('left-to-right');
    target.classList.remove('right-to-left');
    target.classList.remove('fade-in');
}

function showSpinner() {
    const spinner = document.querySelector('.js-spinner');
    spinner.classList.remove('d-none');
}

function hideSpinner() {
    const spinner = document.querySelector('.js-spinner');
    spinner.classList.add('d-none');
}

init();