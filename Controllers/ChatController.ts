import {CanInvoke,CanSet,ControllerProperties,ThorIO} from 'thor-io.vnext';
import { OnlinerModel } from '../Models/OnlinerModel';
import { ChatMessageModel } from '../Models/ChatMessageModel';
import { InviteMessageModel } from '../Models/InviteMessageModel';


export class ChatController extends ThorIO.Controller{

    Onliner: OnlinerModel 
    
    public get uuid() : string {
        return  this.connection.clientInfo.CI
    }
    constructor(connection:ThorIO.Connection){
        super(connection);
        this.Onliner = new OnlinerModel(ThorIO.Utils.randomString(),"Hello world")
        this.onclose = () => {
                // notify lost?
        }
    }

    @CanInvoke(true)
    getOnliners(){
        let onliners = (pre:ChatController) => {
                return pre.Onliner.ScreenName
        }    
        this.invoke(onliners,"onOnliners");
    }

    @CanInvoke(true)
    sendChatMessage(chatMessage:ChatMessageModel){
        chatMessage.sender = this.Onliner;

        // Maybe parse for @foo, @bar and target thoose?
        // like (?<=^|(?<=[^a-zA-Z0-9-_\.]))@([A-Za-z]+[A-Za-z0-9]+)

        this.invokeToOthers(chatMessage,"onChatMessage");
    }

    @CanInvoke(true)
    setOnliner(onliner:OnlinerModel){
        this.Onliner = onliner;
        this.invoke(this.Onliner,"onOnineChange");
    }

    @CanInvoke(true)
    sendInvite(recipient:string){
        let invite = new InviteMessageModel(this.uuid,recipient,0)
        let expr = (pre:ChatController) => {
            return pre.uuid === recipient
        }
        this.invokeTo(expr,invite,"onInvite");
    }

    @CanInvoke(true)
    acceptInvite(recipient:string){
        let invite = new InviteMessageModel(this.uuid,recipient,1)
        let expr = (pre:ChatController) => {
            return pre.uuid === recipient
        }
        this.invokeTo(expr,invite,"onAcceptInvite");
    }

    @CanInvoke(true)
    denyInvite(recipient:string){
        let invite = new InviteMessageModel(this.uuid,recipient,-1)
        let expr = (pre:ChatController) => {
            return pre.uuid === recipient
        }
        this.invokeTo(expr,invite,"onDenyInvite");
    }


}