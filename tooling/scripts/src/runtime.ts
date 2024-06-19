import { Layer, ManagedRuntime } from "effect";

import { ShellLive } from "#src/shell.ts";
import { TursoServiceLive } from "#src/turso-service.ts";

const liveLayer = Layer.merge(ShellLive, TursoServiceLive);

export const runtime = ManagedRuntime.make(liveLayer);
