export interface IPeriod {
  start: Date;
  end: Date;
}

export class Hackathon {
  constructor(public readonly name: string, public readonly description: string, public readonly period: IPeriod) {}
}
