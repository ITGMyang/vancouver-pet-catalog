# Vancouver Pet Picks

Mobile-first bilingual product catalog for a Vancouver pet grooming studio.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

Product data, CAD prices, categories, and the WhatsApp number live in `src/catalog.ts`.

## Current Sales Flow

This version is a B2C display catalog for a groomer to show existing pet clients. It does not include login, checkout, payment, inventory, shipping rules, or order management. Customers inquire through WhatsApp.

## Backend Roadmap

When the catalog has real demand, add backend capabilities in this order:

1. Cart or selected-items list.
2. Customer name, phone, and address form.
3. Delivery method: shipping or in-store pickup.
4. Submitted order status: pending confirmation / pending payment.
5. Stripe Checkout, with WeChat Pay explored through supported merchant settings.

Do not add a full account system until repeat purchase behavior is clear.
