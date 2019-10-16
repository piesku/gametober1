import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {get_rotation, get_translation} from "../math/mat4.js";

const QUERY = Has.Transform | Has.Shoot;

export function sys_shoot(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let shoot = game[Get.Shoot][entity];

    if (shoot.Trigger) {
        shoot.Trigger = false;

        let transform = game[Get.Transform][entity];
        game.Add({
            ...shoot.Projectile,
            Translation: get_translation([], transform.World),
            Rotation: get_rotation([], transform.World),
        });
    }
}
