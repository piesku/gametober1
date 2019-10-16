import {Entity, Game} from "../game.js";
import {Get, Has} from "./com_index.js";

export interface ProjectileControl {
    Damage: number;
}

export function projectile_control(Damage: number) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Has.ProjectileControl;
        game[Get.ProjectileControl][entity] = <ProjectileControl>{
            Damage,
        };
    };
}
