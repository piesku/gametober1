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

let start_position = {
    X: map[0].length - 1,
    Y: 0,
};

let end_position = {
    X: 0,
    Y: 1,
};

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
        game.Grid[y] = [];
        for (let x = 0; x < map[0].length; x++) {
            game.Grid[y][x] = !!map[y][x] ? Infinity : NaN;
            game.Add({
                ...get_tile_blueprint(game, !!map[y][x], x, y),
                Translation: [half_map_size - x * 8, 0, half_map_size - y * 8],
            });
        }
    }

    calculate_distance(game, start_position);

    // Light and audio source.
    game.Add({
        Translation: [1, 1, -1],
        Using: [light([1, 1, 1], 0)],
    });

    // Spawn character
    game.Add({
        ...get_character_blueprint(game),
        Translation: [
            half_map_size - start_position.X * 8,
            1.5,
            half_map_size - start_position.Y * 8,
        ],
    });
}

export function get_neighbors(game: Game, {X, Y}: {X: number; Y: number}) {
    let directions = [
        {X: X - 1, Y}, // w
        {X: X + 1, Y}, // e
        {X, Y: Y - 1}, // n
        {X, Y: Y + 1},
    ];

    return directions.filter(
        ({X, Y}) => X >= 0 && X < game.Grid.length && Y >= 0 && Y < game.Grid[0].length
    );
}

export function calculate_distance(game: Game, {X, Y}: {X: number; Y: number}) {
    // Reset the distance grid.
    for (let x = 0; x < game.Grid.length; x++) {
        for (let y = 0; y < game.Grid[0].length; y++) {
            if (!Number.isNaN(game.Grid[y][x])) {
                game.Grid[y][x] = Infinity;
            }
        }
    }
    game.Grid[Y][X] = 0;
    let frontier = [{X, Y}];
    let current;
    while ((current = frontier.shift())) {
        for (let cell of get_neighbors(game, current)) {
            if (game.Grid[cell.Y][cell.X] > game.Grid[current.Y][current.X] + 1) {
                game.Grid[cell.Y][cell.X] = game.Grid[current.Y][current.X] + 1;
                frontier.push(cell);
            }
        }
    }
}
