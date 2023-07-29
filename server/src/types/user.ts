import { RoomType } from './room-type';
export default class User {
  private socketId?: string;
  private id?: string;
  private name: string = '';
  private time?: Date;
  private type?: RoomType;
  private newMessage?: boolean;
  private show?: boolean = true;
  constructor(socketId: string, id:string, name:string, time:Date, type:RoomType) {
    this.socketId = socketId;
    this.id = id;
    this.name = name;
    this.time = time;
    this.type = type;
}
  public setShow(show: boolean) {
    this.show = show;
  }
  public get Show(): boolean {
    return this.show ;
  }
  public get Name(): string{
    return this.name;
  }
  public get Type(): RoomType{
    return this.type;
  }
  public get SocketId():string{
    return this.socketId;
  }
  public get Id():string{
    return this.id;
  }
}
