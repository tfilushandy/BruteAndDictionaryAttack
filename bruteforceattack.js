const crypto = require('crypto');

const targetHash = '5531a5834816222280f20d1ef9e95f69'; // Hash MD5 target

// Fungsi untuk menghasilkan hash MD5 dari input string
function md5(input) {
  return crypto.createHash('md5').update(input).digest('hex');
}

// Fungsi brute force untuk mencari PIN
function bruteForcePin() {
  for (let i = 0; i <= 9999; i++) {
    const pin = i.toString().padStart(4, '0'); // Memastikan PIN selalu 4 digit
    const hash = md5(pin);
    
    if (hash === targetHash) {
      return pin; // Kembalikan PIN jika ditemukan
    }
  }
  return null; // Jika tidak ditemukan
}

const pin = bruteForcePin();
if (pin) {
  console.log(`PIN Alice adalah: ${pin}`);
} else {
  console.log('PIN tidak ditemukan.');
}