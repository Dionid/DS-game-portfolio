import System from "game/ECS/system"
import EntitiesManager from "game/ECS/entitiesmanager"

export default class ECSManager<T> {
    constructor(
        public systems: Array<System<T>> = [],
        public entitiesManager: EntitiesManager = new EntitiesManager(),
    ) {}

    public addSystem(sys: System<T>) {
        this.systems.push(sys)
    }
    public removeSystem(sys: System<T>) {
        this.systems = this.systems.filter((s) => s !== sys)
    }
    // public replaceSystem() {
    //     this.
    // }

    public onInit(additional: T): undefined {
        for (let i = 0; i < this.systems.length; i++) {
            this.systems[i].init(this.entitiesManager, additional)
        }
        return
    }

    public onUpdate(additional: T): undefined {
        for (let i = 0; i < this.systems.length; i++) {
            this.systems[i].exec(this.entitiesManager, additional)
        }
        return
    }
}