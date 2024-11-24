const crypto = require('crypto');
const fs = require('fs');
const https = require('https');

const url = 'https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/500-worst-passwords.txt';

const targetHash = '578ed5a4eecf5a15803abdc49f6152d6';

// Fungsi untuk menghasilkan hash MD5 dari input string
function md5(input) {
  return crypto.createHash('md5').update(input).digest('hex');
}

// Fungsi untuk membaca daftar kata sandi dari URL
function fetchPasswordList(url, callback) {
  https.get(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      callback(data.split('\n').map((line) => line.trim()));
    });
  }).on('error', (err) => {
    console.error(`Error fetching password list: ${err.message}`);
  });
}

// Fungsi untuk melakukan serangan kamus
function dictionaryAttack(passwordList) {
  for (const password of passwordList) {
    const hash = md5(password);
    if (hash === targetHash) {
      return password; // Kembalikan password jika ditemukan
    }
  }
  return null; // Jika tidak ditemukan
}

// Ambil daftar kata sandi dan lakukan serangan
fetchPasswordList(url, (passwordList) => {
  const password = dictionaryAttack(passwordList);
  if (password) {
    console.log(`Password Bob adalah: ${password}`);
  } else {
    console.log('Password tidak ditemukan.');
  }
});