// File: admin.js
document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

function fetchData() { 
    fetch('https://be.indoculturalfinder.my.id/api/cultures')
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                displayData(data.Cultures);
                attachDeleteEventListeners();
            } else {
                console.error('Error:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayData(cultures) {
    const tableBody = document.querySelector('#cultureTable tbody');

    cultures.forEach((culture, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${culture.province_name}</td>
            <td>${culture.category_name}</td>
            <td>${culture.name}</td>
            <td>${culture.desc}</td>
            <td><img src="${culture.img}" alt="${culture.name}" width="50"></td>
            <td><iframe width="100" height="60" src="${culture.video}" frameborder="0" allowfullscreen></iframe></td>
            <td>
                <a href="#" class="btn btn-warning btn-sm">Edit</a>
                <a class="btn btn-danger btn-sm" data-id="${culture.id}">Del</a>
            </td>
        `;
    });
}

function attachDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const cultureId = this.getAttribute('data-id');
            deleteData(cultureId);
        });
    });
}

function deleteData(cultureId) {
    const confirmation = confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (!confirmation) return;

    fetch(`https://be.indoculturalfinder.my.id/api/cultures/${cultureId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            alert('Data berhasil dihapus!');
            // Refresh halaman atau perbarui tampilan setelah menghapus data
            location.reload();
        } else {
            alert('Terjadi kesalahan: ' + data.message);
        }
    })
    .catch(error => console.error('Error deleting data:', error));
}
