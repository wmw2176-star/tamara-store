const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// اختبار
app.get("/", (req, res) => {
  res.send("Tamara server شغال 🚀");
});

// إنشاء طلب تمارا
app.get("/create-order", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.tamara.co/checkout",
      {
        total_amount: {
          amount: 100,
          currency: "SAR"
        },
        description: "طلب من متجري",
        consumer: {
          first_name: "Test",
          last_name: "User",
          phone_number: "0500000000"
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TAMARA_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || error.message);
  }
});

app.listen(PORT, () => {
  console.log("Server running 🚀");
});
