import {Entity, Game} from "../game";
import {Quat, Vec3} from "../math";
import {Model} from "../model";

type Mixin = (game: Game, entity: Entity) => void;

export interface Blueprint {
    Translation?: Vec3;
    Rotation?: Quat;
    Scale?: Vec3;
    Using?: Array<Mixin>;
    Children?: Array<Blueprint>;
}
export function create_tile(size: number, colors: [number, number]) {
    let offsets = [];
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            offsets.push(
                x - size / 2 + 0.5,
                0.5,
                y - size / 2 + 0.5,
                Math.random() > 0.01 ? colors[0] : colors[1]
            );
        }
    }

    return Float32Array.from(offsets) as Model;
}

export let main_palette = [
    0.6,
    0.4,
    0,
    0.4,
    0.2,
    0,
    0.14,
    0,
    0,
    0.2,
    0.8,
    1,
    1,
    1,
    0,
    1,
    0.8,
    0.4,
    0.6,
    0.4,
    0,
    0.2,
    0.2,
    0.2,
    0.53,
    0.53,
    0.53,
];

export const enum PaletteColors {
    light_wood,
    wood,
    dark_wood,
    windows,
    gold,
    desert_ground_1,
    desert_ground_2,
    mine_ground_1,
    mine_ground_2,
    color_1,
    color_2,
}
