import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Move | Has.PlayerControl;

export function sys_control_player(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let control = game[Get.PlayerControl][entity];

    if (control.Move) {
        let move = game[Get.Move][entity];
        if (game.InputState.KeyW) {
            // Move forward
            move.Directions.push([0, 0, 1]);
        }
        if (game.InputState.KeyA) {
            // Strafe left
            move.Directions.push([1, 0, 0]);
        }
        if (game.InputState.KeyS) {
            // Move backward
            move.Directions.push([0, 0, -1]);
        }
        if (game.InputState.KeyD) {
            // Strafe right
            move.Directions.push([-1, 0, 0]);
        }
    }

    if (control.Zoom) {
        let move = game[Get.Move][entity];
        if (game.InputEvent.wheel_y) {
            move.Directions.push([0, Math.sign(game.InputEvent.wheel_y), 0]);
        }
    }
}
