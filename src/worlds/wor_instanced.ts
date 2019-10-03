import {create_camera} from "../blueprints/blu_camera.js";
import {get_tile_blueprint} from "../blueprints/blu_ground_tile.js";
import {light} from "../components/com_light.js";
import {Game} from "../game.js";

let map = [
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
];

export function world_instanced(game: Game) {
    game.World = [];
    game.Cameras = [];
    game.Lights = [];
    game.GL.clearColor(1, 0.3, 0.3, 1);

    // Player-controlled camera.
    game.Add({
        Translation: [50, 50, 50],
        ...create_camera(game),
    });

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            game.Add({
                ...get_tile_blueprint(game, true, x, y, [0, 1]),
                Translation: [x * 8, 0, y * 8],
            });
        }
    }

    // Light and audio source.
    game.Add({
        Translation: [0, 3, 5],
        Using: [light([1, 1, 1], 5)],
    });
}
