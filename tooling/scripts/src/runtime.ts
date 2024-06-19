import { Layer, ManagedRuntime } from "effect";

import { FlyServiceLive } from "#src/fly-service.ts";
import { ShellLive } from "#src/shell.ts";
import { TursoServiceLive } from "#src/turso-service.ts";

const liveLayer = FlyServiceLive.pipe(Layer.provideMerge(ShellLive), Layer.merge(TursoServiceLive));

export const runtime = ManagedRuntime.make(liveLayer);
