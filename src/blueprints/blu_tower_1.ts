import {collide, CollisionLayer, RayTarget} from "../components/com_collide.js";
import {tower_control} from "../components/com_control_tower.js";
import {move} from "../components/com_move.js";
import {render_vox} from "../components/com_render_vox.js";
import {shoot} from "../components/com_shoot.js";
import {Game} from "../game.js";
import {Blueprint} from "./blu_common.js";
import {create_projectile_1} from "./blu_projectile_1.js";

export function create_tower_1(game: Game) {
    return <Blueprint>{
        Using: [
            tower_control(1),
            move(0, 1),
            shoot(create_projectile_1(game)),
            collide(
                false,
                [24, 24, 24],
                RayTarget.None,
                CollisionLayer.Default,
                CollisionLayer.Mob
            ),
        ],
        Children: [
            {
                Using: [render_vox(Float32Array.from([0, 0, 0, 2, 0, 1, 0, 3, 0, 1, 1, 3]))],
            },
        ],
    };
}
