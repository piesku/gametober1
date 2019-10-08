import {Get} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {get_translation} from "../math/mat4.js";
import {rotation_to} from "../math/quat.js";
import {normalize, transform_point} from "../math/vec3.js";

const QUERY =
    (1 << Get.Transform) |
    (1 << Get.TowerControl) |
    (1 << Get.Collide) |
    (1 << Get.Move) |
    (1 << Get.Shoot);

export function sys_control_tower(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let control = game[Get.TowerControl][entity];
    control.Timer += delta;

    let collide = game[Get.Collide][entity];
    if (collide.Collisions.length > 0) {
        let tower_transform = game[Get.Transform][entity];
        let first_id = collide.Collisions[0].Other.EntityId;
        let mob_world_position = get_translation([], game[Get.Transform][first_id].World);
        let mob_self_position = transform_point([], mob_world_position, tower_transform.Self);
        normalize(mob_self_position, mob_self_position);

        let move = game[Get.Move][entity];
        move.Yaws.push(rotation_to([], [0, 0, 1], mob_self_position));

        if (control.Timer > control.ShootEvery) {
            control.Timer = 0;
            game[Get.Shoot][entity].Trigger = true;
        }
    }
}
