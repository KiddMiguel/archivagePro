const amqp = require('amqplib');

async function startConsumer() {
    // const amqpUrl = process.env.AMQP_URL  || 'amqp://guest:guest@localhost:5672//';
    // const connection = await amqp.connect(amqpUrl);
    // const channel = await connection.createChannel();

    // const queueName = 'event_bus_queue';

    // console.log("Waiting for messages in event_bus_queue...");
    // channel.consume(queueName, async message => {
    //     const eventData = JSON.parse(message.content.toString());
    //     console.log(`Received event:`, eventData);

    //     channel.ack(message);
    // });
}

module.exports = { startConsumer };