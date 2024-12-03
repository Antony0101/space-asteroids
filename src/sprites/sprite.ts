class Sprite_abstract {
    // static variables
    static groups: Sprite_group<any>[] | null = null;
    static curSpriteId: number = 0;

    // instance variables
    spriteId: number = 0;
    isActive: boolean = true;

    constructor() {
        this.spriteId = Sprite_abstract.curSpriteId;
        Sprite_abstract.curSpriteId += 1;
        if ((this.constructor as typeof Sprite_abstract).groups) {
            (this.constructor as typeof Sprite_abstract).groups?.forEach(
                (group) => {
                    group.sprites.set(this.spriteId, this);
                },
            );
        }
    }
    kill() {
        this.isActive = false;
        (this.constructor as typeof Sprite_abstract).groups?.forEach(
            (group) => {
                group.sprites.delete(this.spriteId);
            },
        );
    }
}

class Sprite_group<T extends Sprite_abstract> {
    sprites: Map<number, T>;
    constructor() {
        this.sprites = new Map<number, T>();
    }
    add(sprite: T) {
        this.sprites.set(sprite.spriteId, sprite);
    }
    remove(sprite: T) {
        this.sprites.delete(sprite.spriteId);
    }
    clear() {
        this.sprites.clear();
    }
    getSprite(spriteId: number) {
        return this.sprites.get(spriteId);
    }
    getSpriteArray() {
        return Array.from(this.sprites.values());
    }
}

export { Sprite_abstract, Sprite_group };
