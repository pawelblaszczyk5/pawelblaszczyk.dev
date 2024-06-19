import { Layer, ManagedRuntime } from "effect";

import { FlyServiceLive } from "#src/utils/fly-service.ts";
import { ShellLive } from "#src/utils/shell.ts";
import { TursoServiceLive } from "#src/utils/turso-service.ts";

const liveLayer = FlyServiceLive.pipe(Layer.provideMerge(ShellLive), Layer.merge(TursoServiceLive));

export const runtime = ManagedRuntime.make(liveLayer);
