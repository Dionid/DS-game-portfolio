
interface IComponent<T> {
    name: string
    state: T
}

type IComponentFactory<T> = (...args: any) => IComponent<T>

interface IEntityComponents {
    [key: string]: IComponent<any>
}

interface IEntity {
    id: string
    componentsByName: IEntityComponents
}

export {
    IComponent,
    IComponentFactory,
    IEntity,
    IEntityComponents,
}
