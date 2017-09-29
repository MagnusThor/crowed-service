import { OnlinerModel } from "./OnlinerModel";

export class ChatMessageModel{
        sender: OnlinerModel;
        ts: number;
        message: string;
        constructor(message:string,sender:OnlinerModel){
            this.message = message;
            this.ts = performance.now()
            this.sender= sender;
        }
}


