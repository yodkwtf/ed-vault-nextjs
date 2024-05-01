import express from 'express';
import { WebhookRequest } from './server';
import { stripe } from './lib/stripe';
import { getPayloadClient } from './get-payload';
import { Product } from './payload-types';
import type Stripe from 'stripe';
import { Resend } from 'resend';
import { ReceiptEmailHtml } from './components/emails/ReceiptEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export const stripeWebhookHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const webhookRequest = req as any as WebhookRequest;
  const body = webhookRequest.rawBody;
  const signature = req.headers['stripe-signature'] || '';

  console.log('Webhook received:', body.toString());
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    console.log('Webhook event:', event);
  } catch (err) {
    console.log(
      'Webhook Error:',
      err instanceof Error ? err.message : 'Unknown Error'
    );
    return res
      .status(400)
      .send(
        `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`
      );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  console.log('Session:', session);

  if (!session?.metadata?.userId || !session?.metadata?.orderId) {
    return res.status(400).send(`Webhook Error: No user present in metadata`);
  }

  if (event.type === 'checkout.session.completed') {
    const payload = await getPayloadClient();

    const { docs: users } = await payload.find({
      collection: 'users',
      where: {
        id: {
          equals: session.metadata.userId,
        },
      },
    });

    const [user] = users;

    console.log('User:', user);

    if (!user) return res.status(404).json({ error: 'No such user exists.' });

    const { docs: orders } = await payload.find({
      collection: 'orders',
      depth: 2,
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    const [order] = orders;

    console.log('Order:', order);

    if (!order) return res.status(404).json({ error: 'No such order exists.' });

    await payload.update({
      collection: 'orders',
      data: {
        _isPaid: true,
      },
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    // send receipt
    try {
      const data = await resend.emails.send({
        from: 'DigitalHippo <hello@joshtriedcoding.com>',
        to: [user.email],
        subject: 'Thanks for your order! This is your receipt.',
        html: ReceiptEmailHtml({
          date: new Date(),
          email: user.email,
          orderId: session.metadata.orderId,
          products: order.products as Product[],
        }),
      });
      res.status(200).json({ data });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error });
    }
  }

  console.log('Webhook handled successfully');

  return res.status(200).send();
};
