/**
 * @summary Main class for the add-on.
 * @description This class initializes the whole add-on's logic.
 * @author oliverperzyk (Oliwier Perzyński) <olek@oliverperzyk.com>
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Main {
    /**
     * @summary Private constructor.
     * @description Prevents instantiation & inheritance.
     */
    private constructor() {}

    /**
     * @summary Initializes entry point of the add-on.
     */
    static {
        void this.init()
    }

    /**
     * @summary Initializes the add-on's logic.
     * @description This method is called when the add-on is initialized.
     */
    private static async init(): Promise<void> {}
}
