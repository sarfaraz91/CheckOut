const { request, response } = require('express');

const stripe = require('stripe')('sk_test_8WONGxWo090F1C4Ggqm8nUn9');

exports.completePaymentWithStripe = functions.https.onRequest(
    (request, response) => {
        const dividedAmount = request.body.amount / request.body.group.members;

        stripe.charges
            .create({
                amount: dividedAmount,
                source: request.body.token,
                currency: 'us'
            })
            .then(function(){
                res.json({message:'Payment Succeded'})
            }).catch(function(){
                res.json({
                    status:500,
                    message:'Payment Failed'})
            })
    },
);


// {
//     "amount": "200",
//     "token": "sdlkfslkdfj",
//     "group": {
//         "members": "5"        
//     }
// }