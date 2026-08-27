import type { DynamicPropertyValueTypes } from "../../models/utils/players/types/DynamicPropertyValueTypes"
import { WorldDynamicProperty } from "../properties/WorldDynamicProperty"

/**
 * @summary Player data server.
 * @description A class that represents a player data server.
 */
class PlayerDataServer {
    /**
     * @summary Player ID.
     * @description The ID of the player.
     */
    public readonly playerId: number

    /**
     * @summary Player name.
     * @description The name of the player.
     */
    public readonly playerName: string

    /**
     * @summary Next player identifier.
     * @description The next player identifier.
     */
    public static get nextPlayerIdentifier(): number {
        return (WorldDynamicProperty.getProperty("nextPlayerId", 0) as number) + 1
    }

    /**
     * @summary Moves the next player identifier.
     * @description Moves the next player identifier by adding 1 to the current next player identifier.
     */
    public static moveNextPlayerIdentifier(): void {
        WorldDynamicProperty.addToProperty("nextPlayerId", 1)
    }

    /**
     * @summary Constructor.
     * @description Creates a new instance of the PlayerDataServer class.
     * @param playerId - The ID of the player.
     */
    public constructor(playerId: number) {
        this.playerId = playerId
        this.playerName = this.getProperty("playerName") as string
    }

    /**
     * @summary Gets the property.
     * @description Gets the property from the data source.
     * @param key - The key of the property.
     * @param defaultValue - The default value of the property.
     * @returns The property.
     */
    public getProperty(key: string, defaultValue?: DynamicPropertyValueTypes): DynamicPropertyValueTypes {
        return WorldDynamicProperty.getProperty(`${key}: ${this.playerId}`) ?? defaultValue
    }

    /**
     * @summary Sets the property.
     * @description Sets the property to the data source.
     * @param key - The key of the property.
     * @param value - The value of the property.
     */
    public setProperty(key: string, value?: DynamicPropertyValueTypes): void {
        WorldDynamicProperty.setProperty(`${key}: ${this.playerId}`, value)
    }

    /**
     * @summary Adds to the property.
     * @description Adds to the property in the data source.
     * @param key - The key of the property.
     * @param value - The value to add to the property.
     */
    public addToProperty(key: string, value: number): void {
        WorldDynamicProperty.addToProperty(`${key}: ${this.playerId}`, value)
    }
}

export { PlayerDataServer }
