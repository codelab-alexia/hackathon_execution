import { HackathonDataService } from '../adapters/hackathon_data_service';

import { Hackathon, IPeriod } from '../models/hackathon';

export class CreateHackathon {
  private hackathonDataService: HackathonDataService;

  constructor({ services: { hackathonDataService } }: any) {
    this.hackathonDataService = hackathonDataService;
  }

  async run(name: string, description: string, period: IPeriod): Promise<void> {
    const preExistingHackathon = await this.hackathonDataService.findBy({ name });

    if (!preExistingHackathon) {
      const newHackathon = new Hackathon(name, description, period);
      await this.hackathonDataService.create(newHackathon);
    } else {
      console.log('\n\n');
      console.log('+---------');
      console.log('| Hackahton already exists:');
      console.log(`| \t- name: ${name}`);
      console.log(`| \t- description: ${description}`);
      console.log(`| \t- period: ${period}`);
      console.log('+---------');
      console.log('\n\n');
    }
  }
}
