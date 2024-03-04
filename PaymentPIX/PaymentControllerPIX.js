import axios from 'axios';
import fs from 'fs';

const endpoint = 'https://sandbox.api.pagseguro.com/orders';
const token = '983B18D30F7C46B48708EC42C1F9FA89';

const body = {
  reference_id: "ex-00001",
  customer: {
    name: "Jose da Silva",
    email: "email@test.com",
    tax_id: "12345678909",
    phones: [{
      country: "55",
      area: "11",
      number: "999999999",
      type: "MOBILE"
    }]
  },
  items: [{
    name: "nome do item",
    quantity: 1,
    unit_amount: 500
  }],
  qr_codes: [{
    amount: {
      value: 500
    },
    expiration_date: "2024-04-29T20:15:59-03:00",
  }],
  shipping: {
    address: {
      street: "Avenida Brigadeiro Faria Lima",
      number: "1384",
      complement: "apto 12",
      locality: "Pinheiros",
      city: "São Paulo",
      region_code: "SP",
      country: "BRA",
      postal_code: "01452002"
    }
  },
  notification_urls: [
    "https://alexandrecardoso-pagseguro.ultrahook.com"
  ]
};

axios.post(endpoint, body, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  // No Node.js, não é necessário definir CAINFO, pois o Axios já gerencia isso.
})
.then((response) => {
  console.log(response.data);
  // Aqui você pode salvar a URL do QR Code em um arquivo ou banco de dados
  // Para este exemplo, vamos apenas imprimir a URL do QR Code no console
  if (response.data.qr_codes && response.data.qr_codes[0].links && response.data.qr_codes[0].links[0].href) {
    console.log("URL do QR Code Pix:", response.data.qr_codes[0].links[0].href);
  }
})
.catch((error) => {
  console.error("Erro na solicitação:", error);
});
