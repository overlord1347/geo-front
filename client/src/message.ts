import { RoomType } from './room-type';
import User from './user'

export default class Message {
  constructor(fromId: string, toId: string, message: string) {
    this.fromId = fromId;
    this.toId = toId;
    this.message = message;
  }
  private id?: string;
  private message: string = '';
  private time?: Date;
  private fromId: string ='';
  private toId: string ='';

  public To():string {
    return this.toId;
  }
}
