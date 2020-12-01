const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.handler = async function (event, context) {
  // your server-side functionality
  const body = JSON.parse(event.body)
  console.log('BODY')
  console.log(body)

  const line_items = body.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.title,
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
    description: item.description.content[0].content[0].value,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: line_items,
    mode: 'payment',
    success_url: `${process.env.APP_HOST}/thanks`,
    cancel_url: `${process.env.APP_HOST}/for-sale`,
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  }
}
