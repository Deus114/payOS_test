require('dotenv').config();
const orderCode = require("./orderCode");
const DOMAIN = process.env.DOMAIN;

module.exports = {
    makeOrder: async () => {
        let currentCode = await orderCode.findOne().sort({ orderCode: -1 });
        if (currentCode) {
            try {
                let res = await orderCode.updateOne({ orderCode: currentCode.orderCode },
                    {
                        orderCode: currentCode.orderCode + 1,
                    });
                const order = {
                    amount: 10000,
                    description: 'Thanh toan mua sach',
                    orderCode: currentCode.orderCode + 1,
                    returnUrl: `${DOMAIN}/success.html`,
                    cancelUrl: `${DOMAIN}/cancel.html`,
                };

                return order;
            } catch (error) {
                // Do nothing
            }
        } else {
            return null;
        }
    }
}