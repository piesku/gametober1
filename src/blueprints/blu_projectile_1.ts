import {collide, CollisionLayer, RayTarget} from "../components/com_collide.js";
import {projectile_control} from "../components/com_control_projectile.js";
import {lifespan} from "../components/com_lifespan.js";
import {move} from "../components/com_move.js";
import {render_vox} from "../components/com_render_vox.js";
import {Game} from "../game.js";
import {Blueprint} from "./blu_common.js";

export function create_projectile_1(game: Game) {
    return <Blueprint>{
        Using: [
            projectile_control(1),
            move(30),
            collide(true, [1, 1, 1], RayTarget.None, CollisionLayer.Projectile, CollisionLayer.Mob),
            lifespan(2),
        ],
        Children: [
            {
                Using: [render_vox(Float32Array.from([0, 0, 0, 4]))],
            },
        ],
    };
}
