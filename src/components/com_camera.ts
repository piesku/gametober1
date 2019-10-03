import {Entity, Game} from "../game.js";
import {Mat4} from "../math/index.js";
import {create, invert, perspective} from "../math/mat4.js";
import {Get} from "./com_index.js";

export interface Camera {
    EntityId: Entity;
    Projection: Mat4;
    Unproject: Mat4;
    View: Mat4;
    PV: Mat4;
}

export function camera(aspect: number, fovy: number, near: number, far: number) {
    return (game: Game, EntityId: Entity) => {
        let Projection = perspective(create(), fovy, aspect, near, far);
        game.World[EntityId] |= 1 << Get.Camera;
        game[Get.Camera][EntityId] = <Camera>{
            EntityId,
            Projection,
            Unproject: invert([], Projection),
            View: create(),
            PV: create(),
        };
    };
}
