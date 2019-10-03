import {Entity, Game} from "../game.js";
import {Get} from "./com_index.js";

export interface TowerControl {}

export function tower_control() {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= 1 << Get.TowerControl;
        game[Get.TowerControl][entity] = <TowerControl>{};
    };
}
