import {Get} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = (1 << Get.Transform) | (1 << Get.TowerControl) | (1 << Get.Collide);

export function sys_control_tower(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let collide = game[Get.Collide][entity];
    if (collide.Collisions.length > 0) {
        let first = collide.Collisions[0];
        console.log(first.Other.EntityId);
    }
}
