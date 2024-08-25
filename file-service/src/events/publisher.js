const amqp = require('amqplib');

let connection = null;
let channel = null;

async function initAmqp() {
    if (!connection) {
        const amqpUrl = process.env.AMQP_URL || 'amqp://guest:guest@localhost:5672//';
        connection = await amqp.connect(amqpUrl);
        channel = await connection.createChannel();
        await channel.assertExchange('ExchangeFile', 'topic', { durable: true });
    }
}

async function publishEvent(eventType, exchangeName, eventData) {
    try {
        await initAmqp();
        
        const routingKey = eventType;
        const message = Buffer.from(JSON.stringify(eventData));

        channel.publish(exchangeName, routingKey, message, { persistent: true, mandatory: true });
        console.log(`Published ${eventType} event on ${exchangeName} with routing key ${routingKey}:`, eventData);
    } catch (error) {
        console.error(`Failed to publish event: ${eventType}`, error);
    }
}

module.exports = { publishEvent };
