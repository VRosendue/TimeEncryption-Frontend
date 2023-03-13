// Fetch encrypted value from /secret endpoint
function currentDecryption() {
fetch('http://localhost:8080/secret')
  .then(response => response.text())
  .then(encryptedValue => {
    // Using the same key as in the backend for decryption, but I should really hide them when in production
    const key = CryptoJS.enc.Utf8.parse(')J@NcRfUjXnZr4u7');
    const decrypted = CryptoJS.AES.decrypt(encryptedValue, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
        const decryptedValueElement = document.getElementById('secret-value');
        decryptedValueElement.textContent = decrypted;
    console.log('Decrypted value is: ' + decrypted);
  })
  .catch(error => console.error(error));

}
//Create loop that runs the next Decryption based on randomness (not totally random since it's between 30 seconds and 2½ minutes)
function nextEncryption() {
    const firstInterval = 30000;
    const secondInterval = 150000;
    const interval = Math.floor(Math.random() * (secondInterval - firstInterval + 1)) + firstInterval;

    setTimeout(() => {
        currentDecryption();
        nextEncryption();
    }, interval);
}

currentDecryption();
nextEncryption();







// fetch('http://localhost:8080/secret')
//   .then(response => response.text())
//   .then(encryptedValue => {
//     // Decrypt the encrypted value using the same key
//     const key = ')J@NcRfUjXnZr4u7';
//     const decipher = crypto.createDecipheriv('aes-128-ecb', key, '');
//     let decrypted = decipher.update(encryptedValue, 'base64', 'utf8');
//     decrypted += decipher.final('utf8');
    
//     console.log('Decrypted value is: ' + decrypted);
//   })
//   .catch(error => console.error(error));


// const key = ")J@NcRfUjXnZr4u7"; // The secret key used for encryption

// function fetchEncryptedValue() {
//   return fetch('http://localhost:8080/secret')
//     .then(response => response.text())
//     .then(data => {
//       console.log('Encrypted value:', data);
//       return decrypt(data);
//     })
//     .then(decryptedValue => {
//       console.log('Decrypted value:', decryptedValue);
//       return decryptedValue;
//     })
//     .catch(error => console.error(error));
// }

// function decrypt(encryptedValue) {
//   const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, key);
//   return decryptedBytes.toString(CryptoJS.enc.Utf8);
// }

// fetchEncryptedValue().then(decryptedValue => {
//     const decryptedValueElement = document.getElementById('secret-value');
//     decryptedValueElement.innerText = decryptedValue;
// });