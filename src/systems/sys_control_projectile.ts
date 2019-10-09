import {Get} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY =
    (1 << Get.Transform) | (1 << Get.ProjectileControl) | (1 << Get.Move) | (1 << Get.Collide);

export function sys_control_projectile(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let move = game[Get.Move][entity];
    move.Directions.push([0, 0, 1]);

    let collide = game[Get.Collide][entity];
    if (collide.Collisions.length > 0) {
        game.Destroy(entity);
        let control = game[Get.ProjectileControl][entity];
        for (let collision of collide.Collisions) {
            let mob_id = collision.Other.EntityId;
            if (game.World[mob_id] & (1 << Get.Health)) {
                game[Get.Health][mob_id].Damages.push(control.Damage);
            }
        }
    }
}
