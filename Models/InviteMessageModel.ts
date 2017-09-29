export class InviteMessageModel{
    roomName: string;
    recipient: string;
    sender: string;
    messageType: number // 0 = invite, 1 = accept, -1 deny
    constructor(sender: string, recipient: string,messageType:number) {
        this.sender = sender;
        this.recipient = recipient;
       
    }
}
