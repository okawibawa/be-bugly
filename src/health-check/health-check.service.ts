import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  async healthCheck() {
    return { code: 200, message: 'It is running.' };
  }
}
