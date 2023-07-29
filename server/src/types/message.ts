import { RoomType } from './room-type';
import User from './user'

export default class Message {
  private id?: string;
  private message: string = '';
  private time?: Date;
  private fromId?: string;
  private toId?: string;
}
