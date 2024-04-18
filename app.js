require('dotenv').config();

const express = require('express');
const PayOS = require('@payos/node');

const payos = new PayOS('client-id', 'api-key', 'checksum-key');

const DOMAIN = 'http://localhost:3000';
const port = process.env.PORT || 4000;
const hostname = process.env.HOST_NAME;
const app = express();

app.use(express.static('src'));
app.use(express.json());

app.post('/create-payment-link', async (req, res) => {
    const order = {
        amount: 1,
        description: 'Thanh toan mua sach',
        ordercode: 1,
        returnUrl: `${DOMAIN}/success.html`,
        cancelUrl: `${DOMAIN}/cancel.html`,
    };
    const paymentLink = await payos.createPaymentLink(oder);
    res.redirect(303, paymentLink.checkoutUrl);
});

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})