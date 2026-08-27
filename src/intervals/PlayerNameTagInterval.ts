import { TicksPerSecond, system, world } from "@minecraft/server"
import { PlayerRankManager } from "../utils/managers/PlayerRankManager"

/**
 * @summary Updates the player's name tag.
 * @description A system that is in demand of updating the player's name tag.
 */
class PlayerNameTagInterval {
    /**
     * @summary Private constructor.
     * @description Prevents instantiation & inheritance.
     */
    private constructor() {}

    /**
     * @summary Update interval.
     * @description The interval at which the player's name tag will be updated.
     * @remarks Currently at 15 seconds (20 * 15 is 300 ticks).
     */
    private static readonly updateInterval: number = 20 * 15 * TicksPerSecond

    /**
     * @summary Initializes the interval.
     * @description Runs the interval to update the player's name tag.
     */
    static {
        system.runInterval(this.updatePlayersNameTags, this.updateInterval)
    }

    /**
     * @summary Updates the player's name tag.
     * @description Updates the player's name tag by resolving the rank from the player and adding it to the player's name.
     */
    private static updatePlayersNameTags(): void {
        for (const player of world.getAllPlayers()) {
            PlayerRankManager.updatePlayersNameTag(player)
        }
    }
}

export { PlayerNameTagInterval }
