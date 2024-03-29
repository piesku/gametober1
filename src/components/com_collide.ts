import {Entity, Game} from "../game.js";
import {Vec3} from "../math/index.js";
import {Get, Has} from "./com_index.js";

export interface Collide {
    readonly EntityId: Entity;
    New: boolean;
    /**
     * Dynamic colliders collide with all colliders. Static colliders collide
     * only with dynamic colliders.
     */
    Dynamic: boolean;
    /** The size of the collider in self units. */
    Size: [number, number, number];
    /** The min corner of the AABB. */
    Min: Vec3;
    /** The max corner of the AABB. */
    Max: Vec3;
    /** The world position of the AABB. */
    Center: Vec3;
    /** The half-extents of the AABB on the three axes. */
    Half: [number, number, number];
    /** Collisions detected with this collider during this tick. */
    Collisions: Array<Collision>;
    RayMask: RayTarget;
    OwnMask: CollisionLayer;
    OtherMask: CollisionLayer;
}

export function collide(
    Dynamic: boolean = true,
    Size: [number, number, number] = [1, 1, 1],
    RayMask = RayTarget.None,
    OwnMask = CollisionLayer.Default,
    OtherMask = CollisionLayer.Default
) {
    return (game: Game, EntityId: Entity) => {
        game.World[EntityId] |= Has.Collide;
        game[Get.Collide][EntityId] = <Collide>{
            EntityId,
            New: true,
            Dynamic,
            Size,
            Min: [0, 0, 0],
            Max: [0, 0, 0],
            Center: [0, 0, 0],
            Half: [0, 0, 0],
            Collisions: [],
            RayMask,
            OwnMask,
            OtherMask,
        };
    };
}

export interface Collision {
    /** The other collider in the collision. */
    Other: Collide;
    /** The direction and magnitude of the hit from this collider's POV. */
    Hit: Vec3;
}

export const enum CollisionLayer {
    Default = 1 << 0,
    Mob = 1 << 1,
    Projectile = 1 << 2,
}

export const enum RayTarget {
    /** Ignored by raycasting. */
    None = 1 << 0,
    Placeable = 1 << 1,
    Selectable = 1 << 2,
}
