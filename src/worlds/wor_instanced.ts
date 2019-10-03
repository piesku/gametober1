import {create_camera} from "../blueprints/blu_camera.js";
import {get_character_blueprint} from "../blueprints/blu_character.js";
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

let starting_position = [map[0].length - 1, 0];

let half_map_size = (8 * map.length) / 2;
export function world_instanced(game: Game) {
    game.World = [];
    game.Cameras = [];
    game.Lights = [];
    game.GL.clearColor(1, 0.3, 0.3, 1);

    // Player-controlled camera.
    game.Add({
        Translation: [50, 35, 50],
        ...create_camera(game),
    });

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            game.Add({
                ...get_tile_blueprint(game, !!map[y][x], x, y),
                Translation: [half_map_size - x * 8, 0, half_map_size - y * 8],
            });
        }
    }

    // Light and audio source.
    game.Add({
        Translation: [1, 1, -1],
        Using: [light([1, 1, 1], 0)],
    });

    // Spawn character
    game.Add({
        ...get_character_blueprint(game),
        Translation: [
            half_map_size - starting_position[0] * 8,
            1.5,
            half_map_size - starting_position[1] * 8,
        ],
    });
}
