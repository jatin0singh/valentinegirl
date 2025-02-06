const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(express.json());
app.use(cors()); // Allow CORS for frontend

const accountSid = 'AC42f9bbed55837cd516a6a899fdb7ff63'; // Replace with your actual SID
const authToken = '76cca039dd20409fd41b6267a851df4c'; // Replace with your actual Auth Token
const client = twilio(accountSid, authToken);

app.post('/send-whatsapp', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await client.messages.create({
            from: 'whatsapp:+14155238886', // Twilio Sandbox Number
            to: 'whatsapp:+916006885526', // Your WhatsApp number
            body: message,
        });

        res.json({ success: true, response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

 
