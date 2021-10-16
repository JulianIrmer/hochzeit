const button = document.querySelector('.js-button');

button.addEventListener('click', async () => {
    const pw = document.querySelector('.js-password');
    const url = 'http://kimundtom.herokuapp.com';

    let response = await fetch(url + '/api/getdata?pw=' + pw.value + '&weddingID=' + weddingID);
    response = await response.json();
    
    if (response.success) {
        button.remove();
        pw.remove();
        showData(response.data);
    } else {
        alert('Password wrong');
    }
});

function showData(data) {
    const container = document.querySelector('.js-data-container');
    const a = document.createElement('a');
    a.download = 'guests.xlsx';
    a.href = 'data:application/octet-stream;base64,' + data;
    a.innerText = 'Download guest data as XLSX';
    container.appendChild(a);
}