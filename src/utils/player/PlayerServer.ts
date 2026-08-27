import { EntityComponentTypes, type ItemStack, type Player } from "@minecraft/server"
import { PlayerDataServer } from "./PlayerDataServer"
import { type ActionFormData, type ActionFormResponse, FormCancelationReason } from "@minecraft/server-ui"
import { EntityDynamicProperty } from "../properties/EntityDynamicProperty"

/**
 * @summary Player server.
 * @description A class that represents a player server.
 */
class PlayerServer extends PlayerDataServer {
    /**
     * @summary Player.
     * @description The player.
     */
    public player: Player

    /**
     * @summary Constructor.
     * @description Creates a new instance of the PlayerServer class.
     * @param player - The player.
     */
    public constructor(player: Player) {
        super(new EntityDynamicProperty(player).getProperty("playerId", 0) as number)
        this.player = player
    }

    /**
     * @summary Shows a form.
     * @description Shows a form to the player.
     * @param form - The form data to show.
     * @returns The result of the form.
     */
    public async showForm(form: ActionFormData): Promise<ActionFormResponse> {
        while (true) {
            const formResult: ActionFormResponse = await form.show(this.player)
            if (formResult.cancelationReason !== FormCancelationReason.UserBusy) return formResult
        }
    }

    /**
     * @summary Adds an item to the player.
     * @description Adds an item to the player's inventory.
     * @param itemStack - The item stack to add.
     */
    public addItem(itemStack: ItemStack): void {
        try {
            const droppedItem: ItemStack | undefined = this.player
                .getComponent(EntityComponentTypes.Inventory)
                ?.container?.addItem(itemStack)
            if (droppedItem) this.player.dimension.spawnItem(droppedItem, this.player.location)
        } catch {
            return
        }
    }
}

export { PlayerServer }
