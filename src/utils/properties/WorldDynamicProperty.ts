import { world, World } from "@minecraft/server"
import type { DynamicPropertyValueTypes } from "../../models/utils/players/types/DynamicPropertyValueTypes"
import { DynamicProperty } from "./DynamicProperty"

/**
 * @summary World dynamic property.
 * @description A class that represents a dynamic property for a world.
 */
class WorldDynamicProperty extends DynamicProperty {
    /**
     * @summary Data source.
     * @description The data source of the dynamic property.
     */
    declare protected dataSource: World

    /**
     * @summary Constructor.
     * @description Creates a new instance of the WorldDynamicProperty class.
     */
    private static dataSource: World = world

    /**
     * @summary Private constructor.
     * @description Prevents instantiation & inheritance.
     */
    private constructor() {
        super()
    }

    /**
     * @summary Gets the property.
     * @description Gets the property from the data source.
     * @param key - The key of the property.
     * @param defaultValue - The default value of the property.
     * @returns The property.
     */
    public static getProperty(key: string, defaultValue?: DynamicPropertyValueTypes): DynamicPropertyValueTypes {
        return this.dataSource.getDynamicProperty(key) ?? defaultValue
    }

    /**
     * @summary Sets the property.
     * @description Sets the property to the data source.
     * @param key - The key of the property.
     * @param value - The value of the property.
     */
    public static setProperty(key: string, value?: DynamicPropertyValueTypes): void {
        this.dataSource.setDynamicProperty(key, value)
    }

    /**
     * @summary Adds to the property.
     * @description Adds to the property in the data source.
     * @param key - The key of the property.
     * @param value - The value to add to the property.
     */
    public static addToProperty(key: string, value: number): void {
        this.dataSource.setDynamicProperty(key, (this.getProperty(key, 0) as number) + value)
    }
}

export { WorldDynamicProperty }
