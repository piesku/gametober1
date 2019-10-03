import {Collide} from "../components/com_collide.js";
import {Vec3} from "./index.js";

export function raycast_aabb(colliders: Array<Collide>, origin: Vec3, direction: Vec3) {
    let nearest_t = Infinity;
    let nearest_i = null;
    for (let i = 0; i < colliders.length; i++) {
        let t = distance(origin, direction, colliders[i]);
        if (t < nearest_t) {
            nearest_t = t;
            nearest_i = i;
        }
    }

    if (nearest_i !== null) {
        return colliders[nearest_i];
    }
}

function distance(origin: Vec3, direction: Vec3, aabb: Collide) {
    let max_lo = -Infinity;
    let min_hi = +Infinity;

    for (let i = 0; i < 3; i++) {
        let lo = (aabb.Min[i] - origin[i]) / direction[i];
        let hi = (aabb.Max[i] - origin[i]) / direction[i];

        if (lo > hi) {
            [lo, hi] = [hi, lo];
        }

        if (hi < max_lo || lo > min_hi) {
            return Infinity;
        }

        if (lo > max_lo) max_lo = lo;
        if (hi < min_hi) min_hi = hi;
    }

    return max_lo > min_hi ? Infinity : max_lo;
}
