import EntitiesManager from "game/ECS/entitiesmanager"

export default class System<T> {
    private frameNum: number = 0

    constructor(
        public freq: number = 1,
        public active: boolean = true,
    ) {}

    public init(entityManager: EntitiesManager, additional: T): undefined {
        return
    }

    public update(entityManager: EntitiesManager, additional: T): undefined {
        return
    }

    public exec(entityManager: EntitiesManager, additional: T): undefined {
        this.frameNum++
        if (this.frameNum < this.freq) {
            return
        } else {
            this.frameNum = 0
        }

        if (this.active) {
            this.update(entityManager, additional)
        }
        return
    }
}

