const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer 983B18D30F7C46B48708EC42C1F9FA89'
    }
  };
  
  fetch('https://sandbox.pagseguro.uol.com.br/pix/pay/QRCO_7FA6D614-BD79-4DCA-9981-64DD206C6ED3', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));