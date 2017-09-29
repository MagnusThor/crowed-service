"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var thor_io_vnext_1 = require("thor-io.vnext");
var OnlinerModel_1 = require("../Models/OnlinerModel");
var ChatMessageModel_1 = require("../Models/ChatMessageModel");
var InviteMessageModel_1 = require("../Models/InviteMessageModel");
var ChatController = (function (_super) {
    __extends(ChatController, _super);
    function ChatController(connection) {
        var _this = _super.call(this, connection) || this;
        _this.Onliner = new OnlinerModel_1.OnlinerModel(thor_io_vnext_1.ThorIO.Utils.randomString(), "Hello world");
        _this.onclose = function () {
            // notify lost?
        };
        return _this;
    }
    Object.defineProperty(ChatController.prototype, "uuid", {
        get: function () {
            return this.connection.clientInfo.CI;
        },
        enumerable: true,
        configurable: true
    });
    ChatController.prototype.getOnliners = function () {
        var onliners = function (pre) {
            return pre.Onliner.ScreenName;
        };
        this.invoke(onliners, "onOnliners");
    };
    ChatController.prototype.sendChatMessage = function (chatMessage) {
        chatMessage.sender = this.Onliner;
        // Maybe parse for @foo, @bar and target thoose?
        // like (?<=^|(?<=[^a-zA-Z0-9-_\.]))@([A-Za-z]+[A-Za-z0-9]+)
        this.invokeToOthers(chatMessage, "onChatMessage");
    };
    ChatController.prototype.setOnliner = function (onliner) {
        this.Onliner = onliner;
        this.invoke(this.Onliner, "onOnineChange");
    };
    ChatController.prototype.sendInvite = function (recipient) {
        var invite = new InviteMessageModel_1.InviteMessageModel(this.uuid, recipient, 0);
        var expr = function (pre) {
            return pre.uuid === recipient;
        };
        this.invokeTo(expr, invite, "onInvite");
    };
    ChatController.prototype.acceptInvite = function (recipient) {
        var invite = new InviteMessageModel_1.InviteMessageModel(this.uuid, recipient, 1);
        var expr = function (pre) {
            return pre.uuid === recipient;
        };
        this.invokeTo(expr, invite, "onAcceptInvite");
    };
    ChatController.prototype.denyInvite = function (recipient) {
        var invite = new InviteMessageModel_1.InviteMessageModel(this.uuid, recipient, -1);
        var expr = function (pre) {
            return pre.uuid === recipient;
        };
        this.invokeTo(expr, invite, "onDenyInvite");
    };
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ChatController.prototype, "getOnliners", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [ChatMessageModel_1.ChatMessageModel]),
        __metadata("design:returntype", void 0)
    ], ChatController.prototype, "sendChatMessage", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [OnlinerModel_1.OnlinerModel]),
        __metadata("design:returntype", void 0)
    ], ChatController.prototype, "setOnliner", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ChatController.prototype, "sendInvite", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ChatController.prototype, "acceptInvite", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ChatController.prototype, "denyInvite", null);
    return ChatController;
}(thor_io_vnext_1.ThorIO.Controller));
exports.ChatController = ChatController;
//# sourceMappingURL=ChatController.js.map