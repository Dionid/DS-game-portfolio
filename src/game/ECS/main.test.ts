import {IComponentFactory, IEntity} from "game/ECS/types"
import ECSManager from "game/ECS/index"
import System from "game/ECS/system"
import EntitiesManager from "game/ECS/entitiesmanager"
import Cursors from "game/models/Cursors"

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

interface IMovementComponentState {
    velocity: number,
}

const MOVEMENT_COMPONENT_NAME = "MovementComponent"

const MovementComponentFactory: IComponentFactory<IMovementComponentState> = (velocity?: number) => {
    return {
        name: MOVEMENT_COMPONENT_NAME,
        state: {
            velocity: velocity || 0,
        },
    }
}

const PLAYER_COMPONENT_NAME = "PlayerComponent"

const PlayerComponentFactory: IComponentFactory<{}> = () => {
    return {
        name: PLAYER_COMPONENT_NAME,
        state: {},
    }
}

const ENEMY_COMPONENT_NAME = "EnemyComponent"

const EnemyComponentFactory: IComponentFactory<{}> = () => {
    return {
        name: ENEMY_COMPONENT_NAME,
        state: {},
    }
}

describe("ESC testing", () => {

    describe("ECS Manager", () => {
        let ECS: ECSManager<any, any>
        beforeAll(() => {
            ECS = new ECSManager([])
        })
    })

    describe("Entities", () => {
        let ECS: ECSManager<any, any>
        let playerEnt: IEntity
        let enemyEnt: IEntity
        beforeAll(() => {
            ECS = new ECSManager([])
        })

        test("adding Player entity", () => {
            const posComp = PositionComponentFactory()
            const hComp = HealthComponentFactory()
            const pComp = PlayerComponentFactory()
            playerEnt = ECS.entitiesManager.createEntity([posComp, hComp, pComp])

            expect(playerEnt).toHaveProperty("id")
            expect(playerEnt).toMatchObject({
                componentsByName: {
                    [HEALTH_COMPONENT_NAME]: hComp,
                    [POSITION_COMPONENT_NAME]: posComp,
                    [PLAYER_COMPONENT_NAME]: pComp,
                },
            })
        })

        test("adding Enemy entity", () => {
            const posComp = PositionComponentFactory()
            const hComp = HealthComponentFactory()
            const enComp = EnemyComponentFactory()
            enemyEnt = ECS.entitiesManager.createEntity([posComp, hComp, enComp])

            expect(enemyEnt).toHaveProperty("id")
            expect(enemyEnt).toMatchObject({
                componentsByName: {
                    [HEALTH_COMPONENT_NAME]: hComp,
                    [POSITION_COMPONENT_NAME]: posComp,
                    [ENEMY_COMPONENT_NAME]: enComp,
                },
            })
        })

        test("find Player entity by Id", () => {
            const qIdPl = ECS.entitiesManager.queryById(playerEnt.id)
            expect(qIdPl).toBe(playerEnt)
        })

        test("find Player entity by one Component", () => {
            const qCompPl = ECS.entitiesManager.queryByComponentsName([PLAYER_COMPONENT_NAME])
            expect(qCompPl[0]).toBe(playerEnt)
        })

        test("find Player entity by multiple Components", () => {
            const qCompPl = ECS.entitiesManager.queryByComponentsName([
                HEALTH_COMPONENT_NAME,
                POSITION_COMPONENT_NAME,
                PLAYER_COMPONENT_NAME,
            ])
            expect(qCompPl[0]).toBe(playerEnt)
        })

        test("find Enemy entity by Id", () => {
            const qIdPl = ECS.entitiesManager.queryById(enemyEnt.id)
            expect(qIdPl).toBe(enemyEnt)
        })

        test("find Enemy entity by Components", () => {
            const qCompPl = ECS.entitiesManager.queryByComponentsName([ENEMY_COMPONENT_NAME])
            expect(qCompPl[0]).toBe(enemyEnt)
        })

        test("find every Position Component Entity (it must be 2)", () => {
            const qComps = ECS.entitiesManager.queryByComponentsName([
                POSITION_COMPONENT_NAME,
            ])
            expect(qComps).toBeInstanceOf(Array)
            expect(qComps).toHaveLength(2)
        })

        test("find every Movement Component Entity (it must be zero)", () => {
            const qComps = ECS.entitiesManager.queryByComponentsName([
                MOVEMENT_COMPONENT_NAME,
            ])
            expect(qComps).toBeInstanceOf(Array)
            expect(qComps).toHaveLength(0)
        })

        test("adding new Enemy entity", () => {
            const posComp = PositionComponentFactory()
            const hComp = HealthComponentFactory()
            const enComp = EnemyComponentFactory()
            const mComp = MovementComponentFactory()
            const enemyEnt2 = ECS.entitiesManager.createEntity([posComp, hComp, enComp, mComp])

            expect(enemyEnt2).toHaveProperty("id")
            expect(enemyEnt2).toMatchObject({
                componentsByName: {
                    [HEALTH_COMPONENT_NAME]: hComp,
                    [POSITION_COMPONENT_NAME]: posComp,
                    [ENEMY_COMPONENT_NAME]: enComp,
                    [MOVEMENT_COMPONENT_NAME]: mComp,
                },
            })
        })

        test("find every Position Component Entity (it must be 3)", () => {
            const qComps = ECS.entitiesManager.queryByComponentsName([
                POSITION_COMPONENT_NAME,
            ])
            expect(qComps).toBeInstanceOf(Array)
            expect(qComps).toHaveLength(3)
        })

        test("find every Movement Component Entity (it must be 1)", () => {
            const qComps = ECS.entitiesManager.queryByComponentsName([
                MOVEMENT_COMPONENT_NAME,
            ])
            expect(qComps).toBeInstanceOf(Array)
            expect(qComps).toHaveLength(1)
        })

        test("find every Enemy Component Entity (it must be 2)", () => {
            const qComps = ECS.entitiesManager.queryByComponentsName([
                ENEMY_COMPONENT_NAME,
            ])
            expect(qComps).toBeInstanceOf(Array)
            expect(qComps).toHaveLength(2)
        })

        test("delete Position Component from Player", () => {
            const playerEntPosComp = playerEnt.componentsByName[POSITION_COMPONENT_NAME]

            expect(playerEnt.componentsByName).toMatchObject({
                [POSITION_COMPONENT_NAME]: playerEntPosComp,
            })

            let qComps = ECS.entitiesManager.queryByComponentsName([
                POSITION_COMPONENT_NAME,
                PLAYER_COMPONENT_NAME,
            ])

            expect(qComps).toBeInstanceOf(Array)
            expect(qComps).toHaveLength(1)

            expect(ECS.entitiesManager.entitiesByComponentName[POSITION_COMPONENT_NAME]).toContain(playerEnt)

            // Removing
            ECS.entitiesManager.removeComponent(playerEnt, POSITION_COMPONENT_NAME)

            expect(playerEnt.componentsByName).not.toMatchObject({
                [POSITION_COMPONENT_NAME]: playerEntPosComp,
            })

            qComps = ECS.entitiesManager.queryByComponentsName([
                POSITION_COMPONENT_NAME,
                PLAYER_COMPONENT_NAME,
            ])

            expect(qComps).toBeInstanceOf(Array)
            expect(qComps).toHaveLength(0)

            expect(ECS.entitiesManager.entitiesByComponentName[POSITION_COMPONENT_NAME]).not.toContain(playerEnt)
        })

        test("adding Position Component from Player", () => {
            expect(playerEnt.componentsByName[POSITION_COMPONENT_NAME]).not.toBeDefined()

            let qComps = ECS.entitiesManager.queryByComponentsName([
                POSITION_COMPONENT_NAME,
                PLAYER_COMPONENT_NAME,
            ])

            expect(qComps).toBeInstanceOf(Array)
            expect(qComps).toHaveLength(0)

            expect(ECS.entitiesManager.entitiesByComponentName[POSITION_COMPONENT_NAME]).not.toContain(playerEnt)

            // Adding
            const playerEntPosComp = PositionComponentFactory()

            ECS.entitiesManager.addComponent(playerEnt, playerEntPosComp)

            expect(playerEnt.componentsByName[POSITION_COMPONENT_NAME]).toMatchObject(playerEntPosComp)

            qComps = ECS.entitiesManager.queryByComponentsName([
                POSITION_COMPONENT_NAME,
                PLAYER_COMPONENT_NAME,
            ])

            expect(qComps).toBeInstanceOf(Array)
            expect(qComps).toHaveLength(1)

            expect(ECS.entitiesManager.entitiesByComponentName[POSITION_COMPONENT_NAME]).toContain(playerEnt)
        })

        test("removing entity", () => {
            const emptyEnt = ECS.entitiesManager.createEntity([PositionComponentFactory()])
            const entL = ECS.entitiesManager.entities.length

            expect(ECS.entitiesManager.entities).toHaveLength(entL)

            expect(ECS.entitiesManager.entitiesByComponentName[POSITION_COMPONENT_NAME]).toContain(emptyEnt)

            ECS.entitiesManager.removeEntityById(emptyEnt.id)

            expect(ECS.entitiesManager.entities).toHaveLength(entL - 1)

            expect(ECS.entitiesManager.entitiesByComponentName[POSITION_COMPONENT_NAME]).not.toContain(emptyEnt)
        })
    })
})

// This object is not connected with anything,
// it used in Client and Server as Isomorphic logic
// containing Common Logic from Local Logic
interface ISystemAdditional {
    time: number,
    delta: number,
    inputs: {
        down: {
            pressed: true,
        },
    }
}

// TODO: Add PhaserToInputsSystem

interface ISystemPhaserInjectable {
    cursors: Cursors,
    // playerGO:
    // enemiesArrGO:
}

// TODO: Understand how to Inject Phaser into SOME Systems
// For example: you can use SystemName to specify systemsObj that needs injection on the fly in gameLoop()
const PlayerMovementSystemName = "playerMovementSystem"

class PlayerMovementSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {
        const playerEntity = entityManager.queryByComponentsName([
            PLAYER_COMPONENT_NAME,
            MOVEMENT_COMPONENT_NAME,
        ])[0]

        const movementComp: IMovementComponentState = playerEntity.componentsByName[MOVEMENT_COMPONENT_NAME].state

        movementComp.velocity = 0

        if (inj.cursors.down.isDown) {
            movementComp.velocity = -150
        }

        return
    }
}

const playerMovementSystem = new PlayerMovementSystem(PlayerMovementSystemName)
