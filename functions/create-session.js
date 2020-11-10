const stripe = require('stripe')(process.env.STRIPE_KEY)

exports.handler = async function (event, context) {
  // your server-side functionality
  const body = JSON.parse(event.body)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  })

  return {
    statusCode: 200,
    body: {
      id: session.id,
    },
  }
}
