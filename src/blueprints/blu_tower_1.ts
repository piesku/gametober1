import {collide, RayTarget} from "../components/com_collide.js";
import {tower_control} from "../components/com_control_tower.js";
import {render_vox} from "../components/com_render_vox.js";
import {Game} from "../game.js";
import {Blueprint} from "./blu_common.js";

export function create_tower_1(game: Game) {
    return <Blueprint>{
        Using: [tower_control(), collide(false, [24, 24, 24], RayTarget.None)],
        Children: [
            {
                Using: [render_vox(Float32Array.from([0, 0, 0, 2, 0, 1, 0, 3]))],
            },
        ],
    };
}
