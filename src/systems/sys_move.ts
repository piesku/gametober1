import {Anim, Animate} from "../components/com_animate.js";
import {Get} from "../components/com_index.js";
import {components_of_type} from "../components/com_transform.js";
import {Entity, Game} from "../game.js";
import {Vec3} from "../math/index.js";
import {get_translation} from "../math/mat4.js";
import {add, normalize, scale, transform_direction, transform_point} from "../math/vec3.js";

const QUERY = (1 << Get.Transform) | (1 << Get.Move);

export function sys_move(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let transform = game[Get.Transform][entity];
    let move = game[Get.Move][entity];
    for (let animate of components_of_type<Animate>(game, transform, Get.Animate)) {
        if (!animate.Trigger) {
            animate.Trigger = move.Directions.length ? Anim.Move : Anim.Idle;
        }
    }

    if (move.Directions.length) {
        let direction = move.Directions.reduce(add_directions);
        let world_position = get_translation([], transform.World);

        // Transform the movement vector into a direction in the world space.
        let world_direction = transform_direction([], direction, transform.World);
        normalize(world_direction, world_direction);

        // Scale by the distance travelled in this tick.
        scale(world_direction, world_direction, move.MoveSpeed * delta);
        let new_position = add([], world_position, world_direction);

        if (transform.Parent) {
            // Transform the movement vector into a point in the local space.
            transform_point(new_position, new_position, transform.Parent.Self);
        }
        transform.Translation = new_position;
        transform.Dirty = true;
        move.Directions = [];
    }
}

function add_directions(acc: Vec3, cur: Vec3) {
    return add(acc, acc, cur);
}
