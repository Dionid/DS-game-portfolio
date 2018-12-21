import {IComponentFactory} from "game/ECS/types"
import ECSManager from "game/ECS/index"

interface IHealthComponentState {
    totalHealth: number
    currentHealth: number
}

const HEALTH_COMPONENT_NAME = "HealthComponent"

const HealthComponentFactory: IComponentFactory<IHealthComponentState> = (totalHealth?: number, currentHealth?: number) => {
    return {
        name: HEALTH_COMPONENT_NAME,
        state: {
            totalHealth: totalHealth || 5,
            currentHealth: currentHealth || 5,
        },
    }
}

interface IPositionComponentState {
    x: number
    y: number
}

const POSITION_COMPONENT_NAME = "PositionComponent"

const PositionComponentFactory: IComponentFactory<IPositionComponentState> = (x?: number, y?: number) => {
    return {
        name: POSITION_COMPONENT_NAME,
        state: {
            x: x || 0,
            y: y || 0,
        },
    }
}

const ENEMY_COMPONENT_NAME = "EnemyComponent"

const EnemyComponentFactory: IComponentFactory<{}> = () => {
    return {
        name: ENEMY_COMPONENT_NAME,
        state: {},
    }
}

const ECS = new ECSManager([

])

const playerEnt = ECS.entitiesManager.createEntity([PositionComponentFactory(), HealthComponentFactory()])
console.log(playerEnt)

const enemyEnt = ECS.entitiesManager.createEntity([EnemyComponentFactory(), PositionComponentFactory(), HealthComponentFactory()])
console.log(enemyEnt)

const qIdPl = ECS.entitiesManager.queryById(playerEnt.id)
console.log(qIdPl)

const qCompPl = ECS.entitiesManager.queryByComponentsName([POSITION_COMPONENT_NAME])
console.log(qCompPl)

const qCompPl2 = ECS.entitiesManager.queryByComponentsName([POSITION_COMPONENT_NAME, HEALTH_COMPONENT_NAME])
console.log(qCompPl2)

const qEnemyPl = ECS.entitiesManager.queryByComponentsName([ENEMY_COMPONENT_NAME, POSITION_COMPONENT_NAME, HEALTH_COMPONENT_NAME])
console.log(qEnemyPl)

const qEnemyPl2 = ECS.entitiesManager.queryByComponentsName([ENEMY_COMPONENT_NAME])
console.log(qEnemyPl2)


