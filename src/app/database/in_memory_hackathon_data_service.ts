import { HackathonDataService } from '../../core/adapters/hackathon_data_service';
import { Hackathon } from '../../core/models/hackathon';

export class InMemoryHackathonDataService implements HackathonDataService {
  private hackathons: Hackathon[] = [];

  findBy(query: any): Promise<Hackathon> {
    return new Promise((res) =>
      res(
        this.hackathons.find((hack: Hackathon): boolean => {
          const attr = Object.keys(query)[0];
          const val = query[attr];

          return hack[attr] === val;
        }),
      ),
    );
  }

  create(hack: Hackathon): Promise<any> {
    return new Promise((res) => {
      res(this.hackathons.push(hack));
    });
  }

  dump(): void {
    console.log('dump: ', this);
  }
}
