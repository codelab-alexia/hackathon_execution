import { KafkaClient, Producer, Consumer, Message } from 'kafka-node';

import { InMemoryHackathonDataService } from './app/database/in_memory_hackathon_data_service';

import { CreateHackathon } from './core/usecases/create_hackathon';

export function bootstrap(): void {
  const client = new KafkaClient({
    kafkaHost: process.env.KAKFA_HOST || 'kafka:9092',
  });

  const consumer = new Consumer(client, [{ topic: 'new.hackathon', partition: 0 }], {});

  const hackDS = new InMemoryHackathonDataService();
  const context = {
    services: { hackathonDataService: hackDS },
  };
  const createHackathon = new CreateHackathon(context);

  consumer.on('message', async (msg: Message) => {
    const { name, description, period } = JSON.parse(msg.value as string);

    await createHackathon.run(name, description, period);
  });

  consumer.on('error', (err) => console.log(err));

  // FOR DEBUGGING PURPOSES ONLY

  const producer = new Producer(client);

  producer.on('ready', () => {
    setTimeout(() => {
      producer.send(
        [
          {
            topic: 'new.hackathon',
            messages: JSON.stringify({
              name: 'InterHack Final',
              description: 'Foo bar baz baz baz',
              period: {
                start: new Date(2019, 10, 17),
                end: new Date(2019, 10, 18),
              },
            }),
          },
        ],
        (err, data) => {
          if (err) console.log('producer error: ', err);
          else console.log('producer data: ', data);
        },
      );
    }, 500);
  });

  setTimeout(() => hackDS.dump(), 2000);

  // FOR DEBUGGING PURPOSES ONLY
}

bootstrap();
