import { ManagedRuntime } from "effect";

import { DatabaseLive } from "@pawelblaszczyk.dev/database";

export const runtime = ManagedRuntime.make(DatabaseLive);
