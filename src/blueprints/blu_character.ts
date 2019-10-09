import {collide, CollisionLayer, RayTarget} from "../components/com_collide.js";
import {health} from "../components/com_health.js";
import {move} from "../components/com_move.js";
import {named} from "../components/com_named.js";
import {render_vox} from "../components/com_render_vox.js";
import {walking} from "../components/com_walking.js";
import {Game} from "../game.js";
import {Blueprint} from "./blu_common.js";

export function get_character_blueprint(game: Game, {X, Y}: {X: number; Y: number}) {
    return <Blueprint>{
        Using: [
            collide(true, [3, 3, 3], RayTarget.None, CollisionLayer.Mob),
            walking(X, Y),
            move(10.5, 0.2),
            health(5),
        ],
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
