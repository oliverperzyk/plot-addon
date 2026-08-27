import type { Vector3 } from "@minecraft/server"
import { PlotConfiguration } from "../../config/general/PlotConfiguration"
import { PlotServer } from "../plot/PlotServer"

/**
 * @summary Plot finder.
 * @description A class that finds a plot in a given location.
 */
class PlotFinder {
    /**
     * @summary Private constructor.
     * @description Prevents instantiation & inheritance.
     */
    private constructor() {}

    /**
     * @summary Gets the plot in a given location.
     * @description Gets the plot in a given location.
     * @param location - The location to find the plot in.
     * @param range - The range of the plot, by default it uses a range from the plot configuration.
     * @returns The plot in the given location or null if no plot is found.
     */
    public static getPlotInLocation(location: Vector3, range: number = PlotConfiguration.plotRange): PlotServer | null {
        for (let i: number = 1; i < PlotServer.nextPlotId; i++) {
            const selectedPlot: PlotServer = new PlotServer(i)

            if (selectedPlot.getProperty("plotDeleted", false) === true) continue

            if (location.x > selectedPlot.plotLocation.x + range) continue
            if (location.x < selectedPlot.plotLocation.x - range) continue
            if (location.z > selectedPlot.plotLocation.z + range) continue
            if (location.z < selectedPlot.plotLocation.z - range) continue

            return selectedPlot
        }

        return null
    }
}

export { PlotFinder }
