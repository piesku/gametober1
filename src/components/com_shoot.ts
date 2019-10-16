import {Blueprint} from "../blueprints/blu_common.js";
import {Entity, Game} from "../game.js";
import {Get, Has} from "./com_index.js";

export interface Shoot {
    Trigger: boolean;
    Projectile: Blueprint;
}

export function shoot(Projectile: Blueprint) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Has.Shoot;
        game[Get.Shoot][entity] = <Shoot>{
            Projectile,
        };
    };
}
