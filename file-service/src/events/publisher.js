const amqp = require('amqplib');

async function publishEvent(eventType, exchangeName, eventData) {
    const amqpUrl = process.env.AMQP_URL || 'amqp://guest:guest@localhost:5672//';
    let connection, channel;
    try {
        connection = await amqp.connect(amqpUrl);
        channel = await connection.createChannel();
        
        await channel.assertExchange(exchangeName, 'topic', { durable: true });
        
        const routingKey = eventType;
        const message = Buffer.from(JSON.stringify(eventData));

        channel.publish(exchangeName, routingKey, message, { persistent: true, mandatory: true });
        console.log(`Published ${eventType} event on ${exchangeName} with routing key ${routingKey}:`, eventData);
    } catch (error) {
        console.error(`Failed to publish event: ${eventType}`, error);
    } finally {
        if (channel) {
            await channel.close();
        }
        if (connection) {
            await connection.close();
        }
    }
}

module.exports = { publishEvent };
