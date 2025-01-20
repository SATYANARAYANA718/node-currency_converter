const readline = require('readline');
const USD_TO_INR_RATE = 83.12;
const INR_TO_USD_RATE = 1 / USD_TO_INR_RATE;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function convertUSDtoINR(usd) {
  return (usd * USD_TO_INR_RATE).toFixed(2);
}

function convertINRtoUSD(inr) {
  return (inr * INR_TO_USD_RATE).toFixed(2);
}

console.log('Currency Converter - INR ↔ USD');
console.log('1. USD to INR');
console.log('2. INR to USD');

rl.question('Select an option (1 or 2): ', (choice) => {
  if (choice === '1') {
    rl.question('Enter amount in USD: ', (amount) => {
      const usd = parseFloat(amount);
      if (isNaN(usd)) {
        console.log('Please enter a valid number');
      } else {
        const inr = convertUSDtoINR(usd);
        console.log(`${usd} USD = ${inr} INR`);
      }
      rl.close();
    });
  } else if (choice === '2') {
    rl.question('Enter amount in INR: ', (amount) => {
      const inr = parseFloat(amount);
      if (isNaN(inr)) {
        console.log('Please enter a valid number');
      } else {
        const usd = convertINRtoUSD(inr);
        console.log(`${inr} INR = ${usd} USD`);
      }
      rl.close();
    });
  } else {
    console.log('Invalid option selected');
    rl.close();
  }
});