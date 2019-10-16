import {create_tower_1} from "../blueprints/blu_tower_1.js";
import {RayTarget} from "../components/com_collide.js";
import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {get_translation} from "../math/mat4.js";

const QUERY = Has.Select;

export function sys_control_placement(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let select = game[Get.Select][entity];

    if (game.InputEvent.mouse_0_down && select.Hit && select.Hit.RayMask & RayTarget.Placeable) {
        let tile = select.Hit.EntityId;
        let transform = game[Get.Transform][tile];
        let [x, _, z] = get_translation([], transform.World);
        game.Add({
            ...create_tower_1(game),
            Translation: [x, 1.5, z],
        });
    }
}
