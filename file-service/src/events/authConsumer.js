require('dotenv').config();
const amqp = require('amqplib');
const { handleUserCreated } = require('../handlers/userHandlers');

async function startAuthConsumer() {
    const amqpUrl = process.env.AMQP_URL || "amqp://guest:guest@localhost:5672//";
    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();

    const exchangeName = "ExchangeFile";
    const queueName = "queueFile";
    await channel.assertExchange(exchangeName, "topic", { durable: true });
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchangeName, "file.stockage.#");

    console.log("Waiting for file messages in queueFile...");
    channel.consume(queueName, async message => {
        if (message !== null) {
            try {
                const routingKey = message.fields.routingKey;
                const eventData = JSON.parse(message.content.toString());
                console.log(`Received auth event on ${routingKey}:`, eventData);
    
                // Handle the message based on the routing key
                if (routingKey === 'file.stockage.registered') {
                    // Call the handler function
                    await handleUserCreated(eventData);
                }
    
                channel.ack(message);
            } catch (error) {
                console.error("Failed to process message:", error);
                channel.nack(message, false, false); 
            }
        } else {
            console.error("Received null message");
        }
    }, { noAck: false });
}

module.exports = { startAuthConsumer };
