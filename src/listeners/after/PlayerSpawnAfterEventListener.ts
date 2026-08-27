import { PlayerSpawnAfterEvent, world } from "@minecraft/server"
import { PlayerRankManager } from "../../utils/managers/PlayerRankManager"

/**
 * @summary Handles the player spawn after event.
 * @description A listener that is in demand of handling the player spawn after event.
 */
class PlayerSpawnAfterEventListener {
    /**
     * @summary Private constructor.
     * @description Prevents instantiation & inheritance.
     */
    private constructor() {}

    /**
     * @summary Initializes the listener.
     */
    public static init(): void {
        world.afterEvents.playerSpawn.subscribe(this.handlePlayerSpawnAfterEvent)
    }

    /**
     * @summary Handles the player spawn after event.
     * @description Handles the player spawn after event by updating the player's name tag.
     * @param event - The event data.
     */
    private static handlePlayerSpawnAfterEvent({ player, initialSpawn }: PlayerSpawnAfterEvent): void {
        if (!initialSpawn) return
        PlayerRankManager.updatePlayersNameTag(player)

        world.sendMessage({
            rawtext: [
                {
                    text: "chat.welcome",
                    with: [world.getAllPlayers().length.toString()],
                },
            ],
        })
    }
}

export { PlayerSpawnAfterEventListener }
