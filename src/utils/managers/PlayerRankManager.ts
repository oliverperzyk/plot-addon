import type { Player } from "@minecraft/server"

/**
 * @summary Manages the player ranks.
 * @description A manager that is in demand of managing the player ranks.
 */
class PlayerRankManager {
    /**
     * @summary Private constructor.
     * @description Prevents instantiation & inheritance.
     */
    private constructor() {}

    /**
     * @summary Default player rank.
     */
    private static readonly defaultPlayerRank: string = "playerRank:§l§7GRACZ§r§7"

    /**
     * @summary Resolves the rank from the tags.
     * @description Resolves the rank from the tags by finding the first tag that starts with "playerRank:".
     * @param tags - The tags to resolve the rank from.
     * @returns The resolved rank.
     */
    public static resolveRankFromTags(tags: readonly string[]): string {
        return (tags.find((tag: string) => tag.startsWith("playerRank:")) ?? this.defaultPlayerRank).slice(
            "playerRank:".length,
        )
    }

    /**
     * @summary Resolves the rank from the player.
     * @description Resolves the rank from the player by resolving the rank from the tags.
     * @param player - The player to resolve the rank from.
     * @returns The resolved rank.
     */
    public static resolveRankFromPlayer(player: Player): string {
        return this.resolveRankFromTags(player.getTags())
    }

    /**
     * @summary Updates the player's name tag.
     * @description Updates the player's name tag by resolving the rank from the player and adding it to the player's name.
     * @param player - The player to update the name tag for.
     */
    public static updatePlayersNameTag(player: Player): void {
        player.nameTag = this.resolveRankFromPlayer(player) + " " + player.name
    }
}

export { PlayerRankManager }
