import {collide, CollisionLayer, RayTarget} from "../components/com_collide.js";
import {render_vox} from "../components/com_render_vox.js";
import {Game} from "../game.js";
import {Blueprint} from "./blu_common.js";

export function get_character_blueprint(game: Game) {
    return <Blueprint>{
        Translation: [0, 1.5, 0],
        Using: [collide(true, [4, 4, 4], RayTarget.None, CollisionLayer.Mob)],
        Children: [
            {
                Using: [render_vox(Float32Array.from([0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1]))],
            },
        ],
    };
}
