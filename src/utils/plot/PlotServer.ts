import { type RawMessage, type Vector3, world } from "@minecraft/server"
import type { DynamicPropertyValueTypes } from "../../models/utils/players/types/DynamicPropertyValueTypes"
import { PlayerDataServer } from "../player/PlayerDataServer"
import { PlayerServer } from "../player/PlayerServer"
import { WorldDynamicProperty } from "../properties/WorldDynamicProperty"

/**
 * @summary Plot server.
 * @description A class that represents a plot server.
 */
class PlotServer {
    /**
     * @summary Plot owner.
     * @description The owner (offline instance) of the plot.
     */
    public readonly plotOwner: PlayerDataServer
    /**
     * @summary Plot ID.
     * @description The ID of the plot.
     */
    public readonly plotId: number
    /**
     * @summary Plot location.
     * @description Center of the plot.
     */
    public readonly plotLocation: Vector3

    /**
     * @summary Gets the next plot ID.
     * @description Gets the next plot ID.
     * @returns The next plot ID.
     */
    public static get nextPlotId(): number {
        return (WorldDynamicProperty.getProperty("nextPlotId", 0) as number) + 1
    }

    /**
     * @summary Moves the next plot ID.
     * @description Moves the next plot ID by adding 1 to the current next plot ID.
     */
    public static moveNextPlotId(): void {
        WorldDynamicProperty.addToProperty("nextPlotId", 1)
    }

    /**
     * @summary Constructor.
     * @description Creates a new instance of the PlotServer class.
     * @param plotId - The ID of the plot.
     */
    public constructor(plotId: number) {
        this.plotId = plotId
        this.plotOwner = new PlayerDataServer(this.getProperty("plotOwnerId") as number)
        this.plotLocation = this.getProperty("plotLocation") as Vector3
    }

    /**
     * @summary Gets the center of the plot.
     * @description Gets the center of the plot.
     * @returns The center of the plot.
     */
    public get center(): Vector3 {
        return this.getProperty("plotLocation") as Vector3
    }

    /**
     * @summary Gets the property.
     * @description Gets the property from the plot's properties.
     * @param key - The key of the property.
     * @param defaultValue - The default value of the property.
     * @returns The property.
     */
    public getProperty(key: string, defaultValue?: DynamicPropertyValueTypes): DynamicPropertyValueTypes {
        return WorldDynamicProperty.getProperty(`plot:${key}: ${this.plotId}`) ?? defaultValue
    }

    /**
     * @summary Sets the property.
     * @description Sets the property to the plot's properties.
     * @param key - The key of the property.
     * @param value - The value of the property.
     */
    public setProperty(key: string, value?: DynamicPropertyValueTypes): void {
        WorldDynamicProperty.setProperty(`plot:${key}: ${this.plotId}`, value)
    }

    /**
     * @summary Adds to the property.
     * @description Adds to the property in the plot's properties.
     * @param key - The key of the property.
     * @param value - The value to add to the property.
     */
    public addToProperty(key: string, value: number): void {
        WorldDynamicProperty.addToProperty(`plot:${key}: ${this.plotId}`, value)
    }

    /**
     * @summary Sends a message to the members of the plot.
     * @description Sends a message to the members of the plot.
     * @param message - The message to send.
     */
    public sendMessageToMembers(message: string | string[] | RawMessage): void {
        const parsedMessage: string | RawMessage = Array.isArray(message) ? message.join("§r\n§r") : message
        for (const player of world.getAllPlayers()) {
            if (new PlayerServer(player).plotId === this.plotId) player.sendMessage(parsedMessage)
        }
    }
}

export { PlotServer }
