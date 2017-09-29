"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatMessageModel = (function () {
    function ChatMessageModel(message, sender) {
        this.message = message;
        this.ts = performance.now();
        this.sender = sender;
    }
    return ChatMessageModel;
}());
exports.ChatMessageModel = ChatMessageModel;
//# sourceMappingURL=ChatMessageModel.js.map