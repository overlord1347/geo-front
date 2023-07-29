import { RoomType } from './room-type';
import Message from './message';
export default class User {
  private messageList: Message[] = [];
  private id: string;
  private name: string = '';
  private time?: Date;
  private type: RoomType = RoomType.USER;
  private newMessage: boolean = true;
  private show: boolean = true;
  private joined: boolean = false;

  constructor(id: string, name: string, time: Date, type: RoomType) {
    this.id = id;
    this.name = name;
    this.time = time;
    this.type = type;
  }
  public setShow(show: boolean) {
    this.show = show;
  }
  public get Show(): boolean {
    return this.show;
  }
  public get Name(): string {
    return this.name;
  }
  public get Id(): string {
    return this.id;
  }
  public get Type(): RoomType {
    return this.type;
  }
  public get MessageList(): Message[] {
    return this.messageList;
  }
}
