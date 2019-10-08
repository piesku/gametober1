import {create_camera} from "../blueprints/blu_camera.js";
import {get_character_blueprint} from "../blueprints/blu_character.js";
import {get_tile_blueprint} from "../blueprints/blu_ground_tile.js";
import {Get} from "../components/com_index.js";
import {light} from "../components/com_light.js";
import {move} from "../components/com_move.js";
import {find_navigable, Navigable} from "../components/com_navigable.js";
import {walking} from "../components/com_walking.js";
import {Entity, Game} from "../game.js";

export function world_instanced(game: Game) {
    game.World = [];
    game.Cameras = [];
    game.Lights = [];
    game.GL.clearColor(1, 0.3, 0.3, 1);

    let map_size = 15;
    let half_map_size = (8 * map_size) / 2;

    for (let y = 0; y < map_size; y++) {
        game.Grid[y] = [];
        for (let x = 0; x < map_size; x++) {
            if (x == 0 || x == map_size - 1 || y == 0 || y == map_size - 1) {
                game.Grid[y][x] = NaN;
            } else {
                game.Grid[y][x] = Infinity;
            }
        }
    }

    generate_maze(game, [0, map_size - 1], [0, map_size - 1], map_size, 0.2);

    let start_position = {
        X: 0,
        Y: 1,
    };

    let end_position = {
        X: map_size - 1,
        Y: map_size - 2,
    };

    game.Grid[start_position.Y][start_position.X] = Infinity;
    game.Grid[end_position.Y][end_position.X] = Infinity;

    // Player-controlled camera.
    game.Add({
        Translation: [50, 35, 50],
        ...create_camera(game),
    });

    for (let x = 0; x < map_size; x++) {
        for (let y = 0; y < map_size; y++) {
            game.Add({
                ...get_tile_blueprint(game, !isNaN(game.Grid[y][x]), x, y),
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
    for (let i = 1; i < 16; i++) {
        setTimeout(() => {
            let character = game.Add({
                Translation: [
                    half_map_size - start_position.X * 8,
                    0,
                    half_map_size - start_position.Y * 8,
                ],
                Using: [walking(start_position.X, start_position.Y), move(10.5, 0.2)],
                Children: [get_character_blueprint(game)],
            });

            setTimeout(() => {
                game[Get.Walking][character].Route = get_route(game, character, end_position);
            }, 200 * i);
        }, 1500 * i);
    }
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

export function get_route(game: Game, entity: Entity, destination: Navigable) {
    let walking = game[Get.Walking][entity];

    let route: Array<{X: number; Y: number}> = [];
    while (!(destination.X == walking.X && destination.Y == walking.Y)) {
        route.push(destination);

        let neighbors = get_neighbors(game, destination);

        for (let i = 0; i < neighbors.length; i++) {
            let neighbor_coords = neighbors[i];
            if (
                game.Grid[neighbor_coords.Y][neighbor_coords.X] <
                game.Grid[destination.Y][destination.X]
            ) {
                destination = game[Get.Navigable][find_navigable(game, neighbor_coords)];
            }
        }
    }

    return route;
}

export function generate_maze(
    game: Game,
    [x1, x2]: number[],
    [y1, y2]: number[],
    size: number,
    probablity: number
) {
    let width = x2 - x1;
    let height = y2 - y1;
    if (width >= height) {
        // vertical bisection
        if (x2 - x1 > 3) {
            let bisection = Math.ceil((x1 + x2) / 2);
            let max = y2 - 1;
            let min = y1 + 1;
            let randomPassage = ~~(Math.random() * (max - min + 1)) + min;
            let first = false;
            let second = false;
            if (game.Grid[y2][bisection] == Infinity) {
                randomPassage = max;
                first = true;
            }
            if (game.Grid[y1][bisection] == Infinity) {
                randomPassage = min;
                second = true;
            }
            for (let i = y1 + 1; i < y2; i++) {
                if (first && second) {
                    if (i == max || i == min) {
                        continue;
                    }
                } else if (i == randomPassage) {
                    continue;
                }
                game.Grid[i][bisection] = Math.random() > probablity ? NaN : Infinity;
            }
            generate_maze(game, [x1, bisection], [y1, y2], size, probablity);
            generate_maze(game, [bisection, x2], [y1, y2], size, probablity);
        }
    } else {
        // horizontal bisection
        if (y2 - y1 > 3) {
            let bisection = Math.ceil((y1 + y2) / 2);
            let max = x2 - 1;
            let min = x1 + 1;
            let randomPassage = ~~(Math.random() * (max - min + 1)) + min;
            let first = false;
            let second = false;
            if (game.Grid[bisection][x2] == Infinity) {
                randomPassage = max;
                first = true;
            }
            if (game.Grid[bisection][x1] == Infinity) {
                randomPassage = min;
                second = true;
            }
            for (let i = x1 + 1; i < x2; i++) {
                if (first && second) {
                    if (i == max || i == min) {
                        continue;
                    }
                } else if (i == randomPassage) {
                    continue;
                }
                game.Grid[bisection][i] = Math.random() > probablity ? NaN : Infinity;
            }
            generate_maze(game, [x1, x2], [y1, bisection], size, probablity);
            generate_maze(game, [x1, x2], [bisection, y2], size, probablity);
        }
    }
}
