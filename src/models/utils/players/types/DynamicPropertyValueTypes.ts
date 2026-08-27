import type { Vector3 } from "@minecraft/server"

/**
 * @summary Dynamic property value types.
 * @description A type that represents the possible values of a dynamic property.
 */
type DynamicPropertyValueTypes = string | number | boolean | Vector3 | undefined

export type { DynamicPropertyValueTypes }
