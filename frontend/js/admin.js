const button = document.querySelector('.js-button');

button.addEventListener('click', async () => {
    const pw = document.querySelector('.js-password');
    const url = 'http://kimundtom.herokuapp.com';

    let response = await fetch(url + '/api/getdata?pw=' + pw.value);
    response = await response.json();
    
    if (response.success) {
        const blob = new Blob([base64ToArrayBuffer(response.data)]);
        button.remove();
        pw.remove();
        showData(response.data);
    } else {
        alert('Password wrong');
    }
});

function base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function showData(data) {
    const container = document.querySelector('.js-data-container');
    const a = document.createElement('a');
    a.download = 'guests.xlsx';
    a.href = 'data:application/octet-stream;base64,' + data;
    a.innerText = 'Download as XLSX';
    container.appendChild(a);
}