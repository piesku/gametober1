import {Entity, Game} from "../game.js";
import {Get} from "./com_index.js";

export interface Health {
    Max: number;
    Current: number;
    Damages: Array<number>;
}

export function health(Max: number) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= 1 << Get.Health;
        game[Get.Health][entity] = <Health>{
            Max,
            Current: Max,
            Damages: [],
        };
    };
}
