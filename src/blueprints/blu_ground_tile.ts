import {render_vox} from "../components/com_render_vox.js";
import {Game} from "../game.js";
import {from_euler} from "../math/quat.js";
import {Blueprint, create_tile} from "./blu_common.js";

export function get_tile_blueprint(
    game: Game,
    is_walkable: boolean,
    x: number = 0,
    y: number = 0,
    colors: [number, number]
): Blueprint {
    let tile_model = create_tile(8, colors);

    let tile: Blueprint = {
        Using: [render_vox(tile_model)],
        Children: [],
    };

    return {
        Rotation: from_euler([], 0, ~~(Math.random() * 4) * 90, 0),
        Translation: [0, 0, 0],
        Using: [
            // collide(false, [8, 1, 8], is_walkable ? RayTarget.Navigable : RayTarget.None),
            // cull(Get.Collide),
            // navigable(x, y),
        ],
        Children: [tile],
    };
}
