import {collide, CollisionLayer, RayTarget} from "../components/com_collide.js";
import {named} from "../components/com_named.js";
import {render_vox} from "../components/com_render_vox.js";
import {Game} from "../game.js";
import {Blueprint} from "./blu_common.js";

export function get_character_blueprint(game: Game) {
    return <Blueprint>{
        Translation: [0, 1.5, 0],
        Using: [collide(true, [3, 3, 3], RayTarget.None, CollisionLayer.Mob)],
        Children: [
            {
                Using: [render_vox(Float32Array.from([0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1]))],
            },
            {
                Translation: [0, 0, 5],
                Using: [named("target")],
            },
        ],
    };
}
