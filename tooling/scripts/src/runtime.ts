import { Layer, ManagedRuntime } from "effect";

import { ShellLive } from "#src/shell.ts";
import { TursoApiLive } from "#src/turso-api.ts";

const liveLayer = Layer.merge(ShellLive, TursoApiLive);

export const runtime = ManagedRuntime.make(liveLayer);
