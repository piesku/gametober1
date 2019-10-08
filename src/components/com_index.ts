import {Animate} from "./com_animate";
import {AudioSource} from "./com_audio_source";
import {Camera} from "./com_camera";
import {Collide} from "./com_collide";
import {ProjectileControl} from "./com_control_projectile";
import {TowerControl} from "./com_control_tower";
import {Lifespan} from "./com_lifespan";
import {Light} from "./com_light";
import {Mimic} from "./com_mimic";
import {Move} from "./com_move";
import {Named} from "./com_named";
import {Navigable} from "./com_navigable.js";
import {PlayerControl} from "./com_player_control";
import {Render} from "./com_render";
import {RigidBody} from "./com_rigid_body";
import {Select} from "./com_select";
import {Shake} from "./com_shake";
import {Shoot} from "./com_shoot";
import {Transform} from "./com_transform";
import {Trigger} from "./com_trigger";
import {Walking} from "./com_walking.js";

export const enum Get {
    Transform,
    Render,
    Camera,
    Light,
    AudioSource,
    Animate,
    Named,
    PlayerControl,
    TowerControl,
    ProjectileControl,
    Move,
    Collide,
    RigidBody,
    Trigger,
    Mimic,
    Lifespan,
    Shake,
    Shoot,
    Select,
    Navigable,
    Walking,
}

export interface ComponentData {
    [Get.Transform]: Array<Transform>;
    [Get.Render]: Array<Render>;
    [Get.Camera]: Array<Camera>;
    [Get.Light]: Array<Light>;
    [Get.AudioSource]: Array<AudioSource>;
    [Get.Animate]: Array<Animate>;
    [Get.Named]: Array<Named>;
    [Get.Move]: Array<Move>;
    [Get.PlayerControl]: Array<PlayerControl>;
    [Get.TowerControl]: Array<TowerControl>;
    [Get.ProjectileControl]: Array<ProjectileControl>;
    [Get.Collide]: Array<Collide>;
    [Get.RigidBody]: Array<RigidBody>;
    [Get.Trigger]: Array<Trigger>;
    [Get.Mimic]: Array<Mimic>;
    [Get.Lifespan]: Array<Lifespan>;
    [Get.Shake]: Array<Shake>;
    [Get.Shoot]: Array<Shoot>;
    [Get.Select]: Array<Select>;
    [Get.Navigable]: Array<Navigable>;
    [Get.Walking]: Array<Walking>;
}
