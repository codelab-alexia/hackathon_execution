import { Hackathon } from '../models/hackathon';

export interface HackathonDataService {
  findBy: (query: any) => Promise<Hackathon>;
  create: (hackathon: Hackathon) => Promise<any>;
}
