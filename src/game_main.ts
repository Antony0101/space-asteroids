import DrawArea from "./lib/draw_area/draw_area";
import Canvas2DAdapterDrawArea from "./lib/draw_area/draw_area_canvas_adapter";
import Asteroid from "./sprites/asteroid";
import AsteroidField from "./sprites/asteroidFeilds";
import Player from "./sprites/player";
import Shot from "./sprites/shot";
import { Sprite_abstract, Sprite_group } from "./sprites/sprite";
import prinfDebugLogs from "./utils/debugLogs";
import { sleepFrame } from "./utils/frameTimer";
import { DEBUG_MODE, FRAME_RATE } from "./values/constants";
import global_Object from "./values/global";

type callback_events = "game_over" | "shot_hit" | "game_reset";

function game_main(
    ctx: CanvasRenderingContext2D,
    callback: (event: callback_events, data: any) => void,
) {
    // create all groups
    const drawables = new Sprite_group<
        Sprite_abstract & { draw: () => DrawArea }
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
    let player = new Player(0, 0);

    // create asteroid field
    new AsteroidField();

    // create canvas Adapter for draw Area
    const canvasAdapter = new Canvas2DAdapterDrawArea(ctx);

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
                        callback("shot_hit", null);
                    }
                });
            });
            // drawables.forEach((sprite) => sprite.draw(ctx));
            const mainArea = new DrawArea();
            drawables.forEach((sprite) => {
                mainArea.addDrawArea(sprite.draw());
            });
            canvasAdapter.render(mainArea);
            if (DEBUG_MODE === "few") {
                prinfDebugLogs(allSprites);
            }
            dt = await sleepFrame(FRAME_RATE);
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
                // global_Object.screenWidth / 2,
                0,
                // global_Object.screenHeight / 2,
                0,
            );
            new AsteroidField();
            callback("game_reset", null);
        },
        pause: () => {
            stop = true;
        },
        isPaused: () => stop,
    };
}

export default game_main;
