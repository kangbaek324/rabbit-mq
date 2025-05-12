import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

interface MQData {
  timestamp: number;
  data: any;
}

const compareFunction = (a: MQData, b: MQData) => a.timestamp - b.timestamp;
const pq = new MinPriorityQueue<MQData>({ compare: compareFunction });

@Injectable()
export class AppService {
  constructor(@Inject("TEST_SERVICE") private client: ClientProxy) {}

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async sendRequestToMQ() {
    for (let i = 0; i < 100; i++) {
      await this.client.emit("rabbitMQ", { id: i, timestamp: new Date().getTime() });
      await this.sleep(1);
    }
  }
  
  async addQueue(data) {
    const NewMQdata: MQData = { 
      timestamp: data.timestamp,
      data: { someData: data.id }
    };
    
    pq.enqueue(NewMQdata);
  }

  async getQueue() {
    while(!pq.isEmpty()) {
      console.log(pq.dequeue());
    }
  }
}
