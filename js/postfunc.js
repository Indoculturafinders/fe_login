import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";
// import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";

export default function PostSignUp() {
    let target_url = "https://asia-southeast2-mytodolist-402507.cloudfunctions.net/mytodolist";
    let tokenkey = "token";
    let tokenvalue = "ceafb0cce1b404d71d32ab0b20fea94031b471c87f02b5e0d99e1e911c600ff9";
    let datainjson = {
        "username": getValue("username"),
        "password": getValue("password")
    }
    postWithToken(target_url, tokenkey, tokenvalue, datainjson, responseData);
}

function responseData(result) {

    setInner("pesan", result.message);
    if (result.message == "Selamat Datang") {
        setSecureCookieWithExpireHour("token", result.token, 2); 
        alert("Berhasil Masuk " + result.message);
        window.location.href = "dashboard.html";    
    } else {
        alert("Gagal Masuk " + "password atau username salah")
        console.log(result.message);
    }
}

function setSecureCookieWithExpireHour(cname, cvalue, exhour) {
    const d = new Date();
    d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    
    // Atur atribut-atribut cookie dalam cookieOptions
    const cookieOptions = [
        cname + "=" + cvalue,
        expires,
        "path=/", // Cookie tersedia di seluruh situs
        "Secure", // Hanya akan dikirim melalui koneksi HTTPS yang aman
        "HttpOnly", // Tidak dapat diakses oleh JavaScript
        "SameSite=Strict" // Hanya akan dikirim dalam permintaan jika domain sumber permintaan sama dengan domain halaman
    ];
    
    // Gabungkan semua atribut cookie dalam satu string dengan separator "; "
    document.cookie = cookieOptions.join("; ");
}

// Contoh penggunaan fungsi
setSecureCookieWithExpireHour("id", "a3fWa", 1); // Cookie akan kedaluwarsa dalam 1 jam


// function setCookieWithExpireHour(cname, cvalue, exhour) {
//     const d = new Date();
//     d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
//     let expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + "secure; HttpOnly; samesite=Strict";
//     // Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly; SameSite=Strict
// }

// function responseData(result) {
//     setInner("pesan", result.message);
//     setCookieWithExpireHour("token", result.token, 2);
//     alert("Berhasil Masuk")
//     window.location.href = "dashboard.html";
// }