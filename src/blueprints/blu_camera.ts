import {camera} from "../components/com_camera.js";
import {move} from "../components/com_move.js";
import {player_control} from "../components/com_player_control.js";
import {select} from "../components/com_select.js";
import {Game} from "../game.js";
import {from_euler} from "../math/quat.js";
import {Blueprint} from "./blu_common";

export function create_camera(game: Game) {
    return <Blueprint>{
        Rotation: from_euler([], 0, -135, 0),
        Using: [player_control(true, false), move(50)],
        Children: [
            {
                Using: [player_control(false, true), move(200)],
                Children: [
                    {
                        Rotation: from_euler([], -45, 180, 0),
                        Using: [
                            camera(game.Canvas.width / game.Canvas.height, 1, 1, 1000),
                            select(),
                        ],
                    },
                ],
            },
        ],
    };
}
