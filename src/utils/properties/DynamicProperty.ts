import type { Entity, World } from "@minecraft/server"
import type { DynamicPropertyValueTypes } from "../../models/utils/players/types/DynamicPropertyValueTypes"

/**
 * @summary Dynamic property.
 * @description A class that represents a dynamic property.
 */
abstract class DynamicProperty {
    /**
     * @summary Data source.
     * @description The data source of the dynamic property.
     */
    protected dataSource!: Entity | World

    /**
     * @summary Gets the property.
     * @description Gets the property from the data source.
     * @param key - The key of the property.
     * @param defaultValue - The default value of the property.
     * @returns The property.
     */
    public getProperty(key: string, defaultValue?: DynamicPropertyValueTypes): DynamicPropertyValueTypes {
        return this.dataSource.getDynamicProperty(key) ?? defaultValue
    }

    /**
     * @summary Sets the property.
     * @description Sets the property to the data source.
     * @param key - The key of the property.
     * @param value - The value of the property.
     */
    public setProperty(key: string, value?: DynamicPropertyValueTypes): void {
        this.dataSource.setDynamicProperty(key, value)
    }

    /**
     * @summary Adds to the property.
     * @description Adds to the property in the data source.
     * @param key - The key of the property.
     * @param value - The value to add to the property.
     */
    public addToProperty(key: string, value: number): void {
        this.dataSource.setDynamicProperty(key, (this.getProperty(key) as number) + value)
    }
}

export { DynamicProperty }
