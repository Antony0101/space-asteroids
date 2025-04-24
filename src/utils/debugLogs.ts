import { Sprite_abstract, Sprite_group } from "../sprites/sprite";

let FrameCount = 0;

export default function prinfDebugLogs(
    allSprites: Sprite_group<Sprite_abstract>,
) {
    FrameCount++;
    if (FrameCount % 120 !== 0) {
        return;
    }
    let data: any = { all: 0 };
    data = allSprites.getSpriteArray().reduce((data, sprite) => {
        data.all += 1;
        if (data[sprite.spriteType]) {
            data[sprite.spriteType] += 1;
        } else {
            data[sprite.spriteType] = 1;
        }
        return data;
    }, data);
    console.info({ sprite: data });
}
