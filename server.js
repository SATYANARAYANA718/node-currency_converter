const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// API configuration
const API_KEY = 'YOUR_API_KEY'; // You'll need to get an API key from exchangerate-api.com
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

// Supported currencies
const CURRENCIES = {
  USD: 'US Dollar',
  INR: 'Indian Rupee',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  SGD: 'Singapore Dollar'
};

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Cache exchange rates for 1 hour
let exchangeRates = {};
let lastUpdate = null;

async function updateExchangeRates() {
  const now = new Date();
  if (!lastUpdate || now - lastUpdate > 3600000) { // 1 hour in milliseconds
    try {
      const response = await fetch(`${BASE_URL}/${API_KEY}/latest/USD`);
      const data = await response.json();
      exchangeRates = data.conversion_rates;
      lastUpdate = now;
      console.log('Exchange rates updated');
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Fallback rates if API fails
      exchangeRates = {
        USD: 1,
        INR: 83.12,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 144.38,
        AUD: 1.52,
        CAD: 1.34,
        CHF: 0.86,
        CNY: 7.15,
        SGD: 1.34
      };
    }
  }
  return exchangeRates;
}

app.get('/', async (req, res) => {
  const rates = await updateExchangeRates();
  res.render('index', { 
    currencies: CURRENCIES,
    rates: rates,
    lastUpdate: lastUpdate ? new Date(lastUpdate).toLocaleString() : 'N/A'
  });
});

app.listen(port, () => {
  console.log(`Currency converter app running at http://localhost:${port}`);
});