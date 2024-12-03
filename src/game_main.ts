import Asteroid from "./sprites/asteroid";
import AsteroidField from "./sprites/asteroidFeilds";
import Player from "./sprites/player";
import Shot from "./sprites/shot";
import { Sprite_abstract, Sprite_group } from "./sprites/sprite";
import { sleepFrame } from "./utils/frameTimer";
import global_Object from "./values/global";

type callback_events = "game_over";

function game_main(
    ctx: CanvasRenderingContext2D,
    callback: (event: callback_events, data: any) => void,
) {
    // create all groups
    const drawables = new Sprite_group<
        Sprite_abstract & { draw: (ctx: CanvasRenderingContext2D) => void }
    >();
    const updateables = new Sprite_group<
        Sprite_abstract & { update: (dt: number) => void }
    >();
    const allSprites = new Sprite_group<Sprite_abstract>();
    const asteroids = new Sprite_group<Asteroid>();
    const shots = new Sprite_group<Shot>();

    // set groups
    Player.groups = [drawables, updateables, allSprites];
    Asteroid.groups = [drawables, updateables, allSprites, asteroids];
    AsteroidField.groups = [updateables, allSprites];
    Shot.groups = [drawables, updateables, allSprites, shots];

    // create player
    let player = new Player(
        global_Object.screenWidth / 2,
        global_Object.screenHeight / 2,
    );

    // create asteroid field
    new AsteroidField();

    let dt = 0;
    let stop = true;
    async function mainLoop() {
        if (!ctx) {
            throw new Error("Canvas not found");
        }
        while (true) {
            if (stop) {
                break;
            }
            ctx.fillStyle = "black";
            ctx.fillRect(
                0,
                0,
                global_Object.screenWidth,
                global_Object.screenHeight,
            );
            updateables.forEach((sprite) => sprite.update(dt));
            asteroids.forEach((asteroid) => {
                // asteroid collision with player
                if (asteroid.isCollided(player)) {
                    // allSprites
                    //     .getSpriteArray()
                    //     .forEach((sprite) => sprite.kill());
                    stop = true;
                    callback("game_over", null);
                }
            });
            asteroids.forEach((asteroid) => {
                shots.getSpriteArray().forEach((shot) => {
                    // shot collision with asteroid
                    if (asteroid.isCollided(shot)) {
                        asteroid.split();
                        shot.kill();
                    }
                });
            });
            drawables.forEach((sprite) => sprite.draw(ctx));
            dt = await sleepFrame(60);
        }
    }

    return {
        start: () => {
            stop = false;
            mainLoop();
        },
        reset: () => {
            allSprites.getSpriteArray().forEach((sprite) => sprite.kill());
            player = new Player(
                global_Object.screenWidth / 2,
                global_Object.screenHeight / 2,
            );
            new AsteroidField();
        },
        pause: () => {
            stop = true;
        },
    };
}

export default game_main;
