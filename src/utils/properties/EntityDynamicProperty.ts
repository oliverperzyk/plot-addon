import type { Entity } from "@minecraft/server"
import { DynamicProperty } from "./DynamicProperty"

/**
 * @summary Entity dynamic property.
 * @description A class that represents a dynamic property for an entity.
 */
class EntityDynamicProperty extends DynamicProperty {
    /**
     * @summary Data source.
     * @description The data source of the dynamic property.
     */
    declare protected dataSource: Entity

    /**
     * @summary Constructor.
     * @description Creates a new instance of the EntityDynamicProperty class.
     * @param entity - The entity to create the dynamic property for.
     */
    public constructor(entity: Entity) {
        super()
        this.dataSource = entity
    }
}

export { EntityDynamicProperty }
