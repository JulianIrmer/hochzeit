function init() {
    warmUp();
    intersection();
    const submitButton = document.querySelector('.js-submit');
    submitButton.addEventListener('click', submitForm);
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
        window.location.href = '/'
    }

}

function intersection() {
    const elements = document.querySelectorAll('.animate');
    const options = {
        root: document.querySelector('body'),
        rootMargin: '0px',
        threshold: 1.0
    };

    observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            animate(entry);
        });
    });
      
    elements.forEach(image => {
        observer.observe(image);
    });
}

function animate(element) {
    const {target} = element;
    console.log(target);
    target.classList.remove('fade-in');
    target.classList.remove('right-to-left');
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