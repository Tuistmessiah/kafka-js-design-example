const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'iot-consumer', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'iot-group' });

async function run() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'iot.temperature', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            console.log(`Consumed: ${message.value.toString()}`);
        },
    });
}

run().catch(console.error);
