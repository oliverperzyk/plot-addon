import type { RawMessage } from "@minecraft/server"

/**
 * @summary Configuration for the chat.
 */
class ChatConfiguration {
    /**
     * @summary Private constructor.
     * @description Prevents instantiation & inheritance.
     */
    private constructor() {}

    /**
     * @summary Time in seconds between messages.
     */
    public static readonly CHAT_COOLDOWN: number = 4

    /**
     * @summary Time in seconds between automatic messages.
     */
    public static readonly AUTOMATIC_MESSAGES_INTERVAL: number = 120

    /**
     * @summary Messages sent automatically every {@link ChatConfiguration.AUTOMATIC_MESSAGES_INTERVAL} seconds.
     */
    public static readonly AUTOMATIC_MESSAGES: readonly (readonly string[] | readonly RawMessage[])[] = [
        [
            {
                text: "Testowa 1",
            },
        ],
        [
            {
                text: "Testowa 2",
            },
        ],
    ]
}

export { ChatConfiguration }
