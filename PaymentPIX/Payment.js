import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const endpoint = 'https://sandbox.api.pagseguro.com/orders';
const token = '983B18D30F7C46B48708EC42C1F9FA89';

app.post('/create-pix-payment', async (req, res) => {
    const { reference_id, customer, items, total } = req.body;
  
    const body = {
        reference_id,
        customer,
        items,
        qr_codes: [{
            amount: {
                value: total
            },
            expiration_date: "2024-04-29T20:15:59-03:00", // Ajuste conforme necessário
        }],
        shipping: {
            address: customer.address
        },
        notification_urls: [
            "SUA_URL_DE_NOTIFICACAO_AQUI"
        ]
    };
  
    try {
        const response = await axios.post(endpoint, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Processamento bem-sucedido, enviar dados relevantes para o cliente
        if (response.data.qr_codes && response.data.qr_codes[0].links && response.data.qr_codes[0].links[0].href) {
            res.json({
                success: true,
                message: 'PIX gerado com sucesso',
                qrCodeUrl: response.data.qr_codes[0].links[0].href,
                // Outros dados relevantes podem ser incluídos aqui
            });
        } else {
            throw new Error('Dados do QR Code não encontrados na resposta.');
        }
    } catch (error) {
        console.error('Erro ao gerar pagamento PIX:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao gerar pagamento PIX'
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
