/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");


const functions = require('firebase-functions');
const axios = require('axios');

exports.createPixPayment = functions.https.onCall(async (data, context) => {
  // Verifica a autenticação do usuário
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'O usuário deve estar autenticado.');
  }

  const apiUrl = 'https://sandbox.api.pagseguro.com/orders'; // URL da API para criação de cobranças via PIX
  const authToken = '983B18D30F7C46B48708EC42C1F9FA89'; // Substitua pelo seu token de autenticação do PagSeguro

  // Dados do cliente e do pedido vêm do objeto `data`
  const { customer, items, total } = data;

  // Preparando o corpo da requisição com os dados recebidos
  const body = {
    reference_id: new Date().getTime().toString(), // Um exemplo de ID único usando timestamp
    customer: {
      name: customer.name,
      email: customer.email,
      tax_id: customer.taxId, // CPF ou CNPJ do cliente
      phones: [{
        country: "55",
        area: customer.phone.area,
        number: customer.phone.number,
        type: "MOBILE"
      }]
    },
    items: items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      unit_amount: item.price * 100 // Convertendo para centavos
    })),
    qr_codes: [{
      amount: {
        value: total * 100 // Convertendo para centavos
      },
      expiration_date: "2024-04-29T20:15:59-03:00", // Data de expiração do QR Code
    }],
    shipping: data.shipping, // Supondo que os dados de envio já estejam formatados corretamente
    notification_urls: [
      "https://seu-webhook-de-notificacao.com" // URL para receber notificações de status do pagamento
    ]
  };

  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Retornando dados relevantes para o frontend, incluindo a URL do QR Code
    return { pixKey: response.data.pix.qr_code, qrCodeUrl: response.data.pix.qr_code_base64 };
  } catch (error) {
    console.error('Erro ao gerar pagamento PIX:', error);
    throw new functions.https.HttpsError('internal', 'Erro ao gerar pagamento PIX.');
  }
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
