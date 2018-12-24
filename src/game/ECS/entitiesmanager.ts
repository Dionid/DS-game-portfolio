import {IComponent, IEntity} from "game/ECS/types"

export default class EntitiesManager {
    constructor(
        public entitiesById: {[key: string]: IEntity} = {},
        public entitiesByComponentName: {[key: string]: IEntity[]} = {},
    ) {}

    get entities() {
        return Object.keys(this.entitiesById).map( (key: string) => this.entitiesById[key])
    }

    public createEntity(components: Array<IComponent<any>>, id?: string): IEntity {
        if (!id) {
            id = Math.random() + ""
        }
        const ent = {
            id,
            componentsByName: {},
        }
        components.forEach((component) => {
            this.addComponent(ent, component)
        })
        this.entitiesById[id] = ent
        return ent
    }

    public addEntity(ent: IEntity): boolean {
        if (this.entitiesById[ent.id]) {
            return false
        }
        this.entitiesById[ent.id] = ent
        Object.keys(ent.componentsByName).forEach((compName: string) => {
            this.entitiesByComponentName[compName].push(ent)
        })
        return true
    }

    public removeEntityById(id: string): boolean {
        const ent = this.entitiesById[id]
        if (!ent) {
            return false
        }
        Object.keys(ent.componentsByName).forEach((compName: string) => {
            this.entitiesByComponentName[compName] = this.entitiesByComponentName[compName].filter(
                (cEnt) => cEnt !== ent,
            )
        })
        delete this.entitiesById[id]
        return true
    }

    public queryByComponentsName(componentNamesArr: string[]): IEntity[] {
        let res: IEntity[] | undefined

        if (componentNamesArr.length === 1) {
            res = this.entitiesByComponentName[componentNamesArr[0]]
        } else {
            res = componentNamesArr.reduce((sum: IEntity[] | undefined, compName) => {
                const checkEnt = this.entitiesByComponentName[compName]

                if (sum === undefined || checkEnt === undefined) {
                    return undefined
                }

                if (sum.length === 0) {
                    sum = checkEnt
                } else {
                    sum = sum.filter((ent: IEntity) => {
                        return !!ent.componentsByName[compName]
                    })
                }
                return sum
            }, [])
        }

        return res || []
    }

    public queryById(id: string): IEntity | undefined {
        return this.entitiesById[id]
    }

    public addComponent(ent: IEntity, component: IComponent<any>): boolean {
        if (ent.componentsByName[component.name]) {
            return false
        }
        ent.componentsByName[component.name] = component
        let compEntArr = this.entitiesByComponentName[component.name]
        if (!compEntArr) {
            this.entitiesByComponentName[component.name] = []
            compEntArr = this.entitiesByComponentName[component.name]
        }
        compEntArr.push(ent)
        return true
    }

    public removeComponent(ent: IEntity, componentName: string): boolean {
        const ents = this.entitiesByComponentName[componentName]
        if (ents === undefined) {
            return true
        }
        delete ent.componentsByName[componentName]
        this.entitiesByComponentName[componentName] = ents.filter((cEnt) => cEnt !== ent)
        return true
    }
}
