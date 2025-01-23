const cron = require("node-cron");
const { Cart } = require("../../model");

// Delete cart if not updated since 10 days
// Cron activated at 11pm everydays
cron.schedule(
  "00 00 23 * * *",

  async () => {
    try {
      console.log("Delete carts");

      const carts = await Cart.findAll();
      let counter = 0;
      const now = new Date();
      carts.forEach((cart) => {
        if (
          new Date(cart.updatedAt) < new Date(now - 10 * 24 * 60 * 60 * 1000)
        ) {
          cart.destroy();
          counter++;
        }
      });
      console.log(`${counter} cart(s) deleted`);
    } catch (error) {
      console.error("Error deleting carts:", error);
    }
  },
  {
    schedule: true,
    timezone: "Europe/Paris",
  }
);
