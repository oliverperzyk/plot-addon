import { TicksPerSecond, system, world } from "@minecraft/server"
import { ChatConfiguration } from "../config/chat/ChatConfiguration"

/**
 * @summary Sends custom messages.
 * @description A system that is in demand of sending custom messages.
 */

class CustomMessages {
    /**
     * @summary Private constructor.
     * @description Prevents instantiation & inheritance.
     */
    private constructor() {}

    /**
     * @summary Index of the message to send.
     */
    private static messageIndexCounter: number = 0

    /**
     * @summary Initializes the interval.
     * @description Runs the interval to send automatic messages.
     */
    public static init(): void {
        system.runInterval(this.sendAutomaticMessages, ChatConfiguration.AUTOMATIC_MESSAGES_INTERVAL * TicksPerSecond)
    }

    /**
     * @summary Sends the automatic messages.
     * @description Sends the automatic messages to the world.
     */
    private static sendAutomaticMessages(): void {
        world.sendMessage(ChatConfiguration.AUTOMATIC_MESSAGES[this.messageIndexCounter].join("§r\n§r"))

        if (this.messageIndexCounter === ChatConfiguration.AUTOMATIC_MESSAGES.length - 1) this.messageIndexCounter = 0
        else this.messageIndexCounter++
    }
}

export { CustomMessages }
