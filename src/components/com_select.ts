import {Entity, Game} from "../game.js";
import {Collide} from "./com_collide.js";
import {Get, Has} from "./com_index.js";

export interface Select {
    Hit?: Collide;
}

export function select() {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Has.Select;
        game[Get.Select][entity] = <Select>{};
    };
}
