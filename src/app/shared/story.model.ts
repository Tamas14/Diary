export interface Story {
  id: number,
  emoji?: string
  title: string,
  date: Date,
  text: string
}

export class StoryModel implements Story {
  constructor(public id: number, public title: string, public date: Date, public text: string, public emoji?: string) {
  }
}
