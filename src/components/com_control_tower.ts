import {Entity, Game} from "../game.js";
import {Get, Has} from "./com_index.js";

export interface TowerControl {
    readonly ShootEvery: number;
    Timer: number;
}

export function tower_control(ShootEvery: number) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Has.TowerControl;
        game[Get.TowerControl][entity] = <TowerControl>{
            ShootEvery,
            Timer: 0,
        };
    };
}
