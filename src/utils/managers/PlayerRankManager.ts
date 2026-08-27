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
}

export { PlayerRankManager }
