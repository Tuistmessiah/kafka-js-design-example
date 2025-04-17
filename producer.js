const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'iot-producer', brokers: ['localhost:9092'] });
const producer = kafka.producer();

async function run() {
    await producer.connect();

    setInterval(async () => {
        const value = JSON.stringify({
            temperature: (20 + Math.random() * 10).toFixed(2),
            timestamp: new Date().toISOString(),
        });

        await producer.send({
            topic: 'iot.temperature',
            messages: [{ value }],
        });

        console.log(`Produced: ${value}`);
    }, 2000);
}

run().catch(console.error);
