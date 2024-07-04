import express from 'express'
import 'dotenv/config'
import { connectDB } from './DB/connection.js';
import { Appinit } from './src/Appinit.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, process.env.Stripe_Secret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if(event.type == 'checkout.session.completed'){
    //create order
    console.log('create order ...')
    const checkoutSessionCompleted = event.data.object;
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }
  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

 Appinit(app,express);
 connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})
 }).catch(err =>{
   console.log("fail while connecting to server"+ err);
 })




