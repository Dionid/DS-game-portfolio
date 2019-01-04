import System from "game/ECS/system"
import EntitiesManager from "game/ECS/entitiesmanager"

export default class ECSManager<T, I> {
    public systemsObj: {[key: string]: System<T, I>} = {}
    public systemNamesArr: string[] = []

    constructor(
        systemsArr: Array<System<T, I>> = [],
        public entitiesManager: EntitiesManager = new EntitiesManager(),
    ) {
        systemsArr.forEach(this.addSystem)
    }

    get systems(): Array<System<T, I>> {
        return this.systemNamesArr.map((sysName: string) => this.systemsObj[sysName])
    }

    public getSystemByName(sysName: string): System<T, I> {
        return this.systemsObj[sysName]
    }

    public addSystem = (sys: System<T, I>) => {
        if (this.systemsObj[sys.name]) {
            throw new Error("system already exists")
        }
        this.systemNamesArr.push(sys.name)
        this.systemsObj[sys.name] = sys
    }

    public removeSystem(sysName: string) {
        this.systemNamesArr = this.systemNamesArr.filter((sName: string) => sName !== sysName)
        delete this.systemsObj[sysName]
    }

    public replaceSystem(sysName: string, sys: System<T, I>): boolean {
        if (!this.systemsObj[sysName]) {
            return false
        }
        this.systemsObj[sysName] = sys
        return true
    }

    public onInit(additional: T, injectable: I): undefined {
        this.systemNamesArr.forEach((sysName: string) => {
            this.systemsObj[sysName].init(this.entitiesManager, additional, injectable)
        })
        return
    }

    public exec(additional: T, injectable: I): undefined {
        this.systemNamesArr.forEach((sysName: string) => {
            this.systemsObj[sysName].exec(this.entitiesManager, additional, injectable)
        })
        return
    }
}
