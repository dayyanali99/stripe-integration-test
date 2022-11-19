// sk_test_51M5eZtKRVoH9Fxm177fUyD2PBAHG7A7l4agtCWZxEUDybsyifwQImGkylhNCWH7QwTgc1BDATQIO80gz7Bw9hIsp00uKFrrB1W
// coffee: price_1M5ejfKRVoH9Fxm1SaFoBB6N
// sunglasses: price_1M5el0KRVoH9Fxm197rGARLG
// camera: price_1M5elZKRVoH9Fxm17SnTjpQk

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51M5eZtKRVoH9Fxm177fUyD2PBAHG7A7l4agtCWZxEUDybsyifwQImGkylhNCWH7QwTgc1BDATQIO80gz7Bw9hIsp00uKFrrB1W"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  console.log(req.body);
  const items = req.body.items;
  const lineItems = [];
  for (const item of items) {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  }

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ url: session.url });
});

app.listen(3500, () => {
  console.log("Server started...");
});

// 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