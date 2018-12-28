
export interface IGO {
    id: string
}

export function GODecorator<T extends {new(...args: any[]): {}}>(cl: T): T {
    return class extends cl implements IGO {
        public id = "id" + (new Date()).getTime()
    }
}

export class GOSprite extends Phaser.GameObjects.Sprite implements IGO {
    public id = "id" + (new Date()).getTime()
}

class GOManager {
    public gosById: {[key: string]: IGO} = {}

    public getGOById(id: string): any | undefined {
        return this.gosById[id]
    }

    public addGO(go: IGO) {
        this.gosById[go.id] = go
    }

    public removeGO(id: string) {
        delete this.gosById[id]
    }
}

export default GOManager
