require('dotenv').config();

const express = require('express');
const PayOS = require('@payos/node');

const payos = new PayOS(
    '0082e1ad-0c99-44d9-a50d-e09329b6a0fb',
    '322cef93-0491-46a4-baa2-745d5a975b7a',
    '608d75517b129265ef1f4f4f452de476b501a1b5af7e518644d489dda6f96f76'
);

const DOMAIN = 'http://localhost:3001';
const port = process.env.PORT || 4000;
const hostname = process.env.HOST_NAME;
const app = express();
const connection = require('./src/configdb')
const mongoose = require('mongoose')

app.use(express.static('src'));
app.use(express.json());

app.post('/create-payment-link', async (req, res) => {
    const order = {
        amount: 10000,
        description: 'Thanh toan mua sach',
        orderCode: 13,
        returnUrl: `${DOMAIN}/success.html`,
        cancelUrl: `${DOMAIN}/cancel.html`,
    };
    const paymentLink = await payos.createPaymentLink(order);
    res.redirect(303, paymentLink.checkoutUrl);
});

(async () => {
    try {
        await connection();
        app.listen(port, hostname, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log('>>> DB conect error: ', error);
    }
})()
