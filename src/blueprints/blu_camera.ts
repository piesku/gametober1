import {camera} from "../components/com_camera.js";
import {move} from "../components/com_move.js";
import {player_control} from "../components/com_player_control.js";
import {Game} from "../game.js";
import {from_euler} from "../math/quat.js";
import {Blueprint} from "./blu_common";

export function create_camera(game: Game) {
    return <Blueprint>{
        Rotation: from_euler([], 45, -135, 0),
        Using: [player_control(true), move(10, 0.2)],
        Children: [
            {
                Rotation: [0, 1, 0, 0],
                Using: [camera(game.Canvas.width / game.Canvas.height, 1, 0.1, 1000)],
            },
        ],
    };
}