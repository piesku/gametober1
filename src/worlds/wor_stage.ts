import {create_camera} from "../blueprints/blu_camera.js";
import {audio_source} from "../components/com_audio_source.js";
import {collide, RayTarget} from "../components/com_collide.js";
import {light} from "../components/com_light.js";
import {render_shaded} from "../components/com_render_shaded.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Game} from "../game.js";
import {Mat} from "../materials/mat_index.js";
import {Cube} from "../shapes/Cube.js";
import {snd_music} from "../sounds/snd_music.js";

export function world_stage(game: Game) {
    game.World = [];
    game.Cameras = [];
    game.Lights = [];
    game.GL.clearColor(1, 0.3, 0.3, 1);

    // Player-controlled camera.
    game.Add({
        Translation: [10, 10, 10],
        ...create_camera(game),
    });

    // Ground.
    game.Add({
        Translation: [0, -2, 0],
        Scale: [10, 1, 10],
        Using: [
            render_shaded(game.Materials[Mat.Gouraud], Cube, [1, 1, 0.3, 1]),
            collide(false, [1, 1, 1], RayTarget.Selectable),
            rigid_body(false),
        ],
    });

    game.Add({
        Translation: [10, -2, 0],
        Scale: [10, 1, 10],
        Using: [
            render_shaded(game.Materials[Mat.Gouraud], Cube, [1, 1, 0.3, 1]),
            collide(false, [1, 1, 1], RayTarget.Selectable),
            rigid_body(false),
        ],
    });

    // Light and audio source.
    game.Add({
        Translation: [0, 3, 5],
        Using: [light([1, 1, 1], 5), audio_source(snd_music)],
    });
}
