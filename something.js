// const apiUrl = 'https://currencyconversionapi.com/api/v1/live?access_key=7609d8478b3ec858662e57215f8fca35';

const apiUrl = "https://api.frankfurter.app/latest?amount=10&from=INR&to=USD"

async function getAPI(){ 

    const promise =await fetch(apiUrl);
    const response = await promise.json();
    console.log(response);
}

getAPI();


// async function getExchangeRates(baseCurrency, targetCurrency) {
//   try {
//     // Fetch data from the API
//     const response = await fetch(apiUrl);
    
//     // Check if the response is successful
//     if (!response.ok) {
//       throw new Error(`Error fetching data: ${response.status}`);
//     }

//     // Parse the response JSON
//     const data = await response.json();

//     // Example response structure:
//     // {
//     //   "success": true,
//     //   "quotes": {
//     //     "USDINR": 74.85,
//     //     "USDEUR": 0.89,
//     //     ...
//     //   }
//     // }
    
//     // Extract the rates
//     const rates = data.quotes;
    
//     // Form the key for the desired rate (e.g., "USDINR" for USD to INR)
//     const rateKey = `${baseCurrency}${targetCurrency}`;
    
//     // Get the rate for the target currency
//     const rate = rates[rateKey];

//     if (rate) {
//       console.log(`Exchange rate from ${baseCurrency} to ${targetCurrency}: ${rate}`);
//     } else {
//       console.log(`Exchange rate for ${rateKey} not found.`);
//     }
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// }

// // Example: Get exchange rate from USD to INR
// getExchangeRates("USD", "INR");
