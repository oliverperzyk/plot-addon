import type { Player } from "@minecraft/server"
import { ChatConfiguration } from "../../config/chat/ChatConfiguration"

/**
 * @summary Handles the chat cooldown.
 * @description A handler that is in demand of handling the chat cooldown.
 */
class ChatCooldownHandler {
    /**
     * @summary Private constructor.
     * @description Prevents instantiation & inheritance.
     */
    private constructor() {}

    /**
     * @summary Map of player IDs and cooldown times.
     */
    private static readonly CHAT_COOLDOWN: Map<string, number> = new Map<string, number>([])

    /**
     * @summary Resolves the cooldown time left for a player.
     * @description Resolves the cooldown time left for a player by checking the map of player IDs and cooldown times.
     * @param player - The player to resolve the cooldown time left for.
     * @returns The cooldown time left for the player.
     */
    public static resolveCooldownTimeLeft(player: Player): number {
        return (this.CHAT_COOLDOWN.get(player.id) ?? 0) - Math.floor(new Date().getTime() / 1000)
    }

    /**
     * @summary Sets the cooldown for a player.
     * @description Sets the cooldown for a player by adding the cooldown time to the map of player IDs and cooldown times.
     * @param player - The player to set the cooldown for.
     */
    public static setCooldown(player: Player): void {
        this.CHAT_COOLDOWN.set(player.id, Math.floor(new Date().getTime() / 1000) + ChatConfiguration.CHAT_COOLDOWN)
    }

    /**
     * @summary Removes the cooldown for a player.
     * @description Removes the cooldown for a player by deleting the player's ID from the map of player IDs and cooldown times.
     * @param player - The player to remove the cooldown for.
     */
    public static removeCooldown(player: Player): void {
        this.CHAT_COOLDOWN.delete(player.id)
    }
}

export { ChatCooldownHandler }
