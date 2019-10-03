import {Collide, RayTarget} from "../components/com_collide.js";
import {Get} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {get_translation} from "../math/mat4.js";
import {raycast_aabb} from "../math/raycast.js";
import {normalize, subtract, transform_point} from "../math/vec3.js";

const QUERY = (1 << Get.Transform) | (1 << Get.Camera) | (1 << Get.Select);
const TARGET = (1 << Get.Transform) | (1 << Get.Collide);

export function sys_select(game: Game, delta: number) {
    let colliders: Array<Collide> = [];
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & TARGET) == TARGET) {
            if (game[Get.Collide][i].Flags !== RayTarget.None) {
                colliders.push(game[Get.Collide][i]);
            }
        }
    }

    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, colliders);
        }
    }
}

function update(game: Game, entity: Entity, colliders: Array<Collide>) {
    let transform = game[Get.Transform][entity];
    let camera = game[Get.Camera][entity];
    let select = game[Get.Select][entity];

    let x = (game.InputState.mouse_x / game.Canvas.width) * 2 - 1;
    // In the browser, +Y is down. Invert it, so that in NDC it's up.
    let y = -(game.InputState.mouse_y / game.Canvas.height) * 2 + 1;
    let origin = get_translation([], transform.World);
    let target = [x, y, -1];
    let direction = [0, 0, 0];

    transform_point(target, target, camera.Unproject);
    transform_point(target, target, transform.World);
    subtract(direction, target, origin);
    normalize(direction, direction);
    select.Hit = raycast_aabb(colliders, origin, direction);
}
