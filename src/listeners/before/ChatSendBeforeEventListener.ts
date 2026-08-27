import { world, type ChatSendBeforeEvent, PlayerPermissionLevel, system } from "@minecraft/server"
import { ChatCooldownHandler } from "../../utils/chat/ChatCooldownHandler"
import { PlayerRankManager } from "../../utils/managers/PlayerRankManager"

/**
 * @summary Handles the chat send before event.
 * @description A listener that is in demand of handling the chat send before event.
 */
class ChatSendBeforeEventListener {
    /**
     * @summary Private constructor.
     * @description Prevents instantiation & inheritance.
     */
    private constructor() {}

    /**
     * @summary Initializes the listener.
     */
    public static init(): void {
        world.beforeEvents.chatSend.subscribe(this.handleChatSendBeforeEvent)
    }

    /**
     * @summary Handles the chat send before event.
     * @description Handles the chat send before event by checking if the message is a command.
     * @param eventData - Data from the event.
     */
    private static handleChatSendBeforeEvent(eventData: ChatSendBeforeEvent): void {
        eventData.cancel = true
        const { message, sender: player } = eventData

        if (player.playerPermissionLevel !== PlayerPermissionLevel.Operator) {
            const cooldownTimeLeft: number = ChatCooldownHandler.resolveCooldownTimeLeft(player)
            if (cooldownTimeLeft > 0) {
                // player.sendMessage(`§8» §bPoczekaj jeszcze §e${cooldownTimeLeft} §6sekund!`);
                player.sendMessage({
                    rawtext: [
                        {
                            text: "§8» §f",
                        },
                        {
                            translate: "chat.cooldown",
                            with: [cooldownTimeLeft.toString()],
                        },
                    ],
                })
                system.run((): void => {
                    player.playSound("random.break")
                })
                return
            }

            ChatCooldownHandler.setCooldown(player)
        }

        const playerRank: string = PlayerRankManager.resolveRankFromPlayer(player)
        world.sendMessage(`${playerRank} ${player.name}: §r§f${message}`)
        ChatCooldownHandler.setCooldown(player)
    }
}

export { ChatSendBeforeEventListener }
