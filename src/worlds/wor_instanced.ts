import {ani_scale} from "../animations/ani_scale.js";
import {create_fly_camera} from "../blueprints/blu_fly_camera.js";
import {Anim, animate} from "../components/com_animate.js";
import {collide} from "../components/com_collide.js";
import {light} from "../components/com_light.js";
import {render_shaded} from "../components/com_render_shaded.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Game} from "../game.js";
import {Mat} from "../materials/mat_index.js";
import {Cube} from "../shapes/Cube.js";
import {Icosphere} from "../shapes/Icosphere.js";

export function world_stage(game: Game) {
    game.World = [];
    game.Cameras = [];
    game.Lights = [];
    game.GL.clearColor(1, 0.3, 0.3, 1);

    // Player-controlled camera.
    game.Add({
        Translation: [0, 0, 5],
        ...create_fly_camera(game),
    });

    // Ground.
    game.Add({
        Translation: [0, -2, 0],
        Scale: [10, 1, 10],
        Using: [
            render_shaded(game.Materials[Mat.Gouraud], Cube, [1, 1, 0.3, 1]),
            collide(false),
            rigid_body(false),
        ],
    });

    // Light and audio source.
    game.Add({
        Translation: [0, 3, 5],
        Using: [light([1, 1, 1], 5)],
    });

    game.Add({
        Translation: [2, 1, 0],
        Using: [
            render_shaded(game.Materials[Mat.Phong], Icosphere, [1, 1, 0.3, 1]),
            collide(true),
            rigid_body(true),
            animate({
                [Anim.Idle]: ani_scale,
            }),
        ],
    });
}
