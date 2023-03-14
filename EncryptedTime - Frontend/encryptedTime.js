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







