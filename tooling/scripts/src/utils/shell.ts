import { Path } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import { Context, Effect, Layer } from "effect";
import { $ } from "zx";

const makeShellLive = () =>
	Effect.gen(function* () {
		const path = yield* Path.Path;

		$.cwd = path.join(process.cwd(), "../../");

		return $;
	});

export const Shell = Context.GenericTag<ReturnType<Effect.Effect.Success<ReturnType<typeof makeShellLive>>>>(
	"@pawelblaszczyk.dev/tooling/Shell",
);

export const ShellLive = Layer.effect(Shell, makeShellLive().pipe(Effect.provide(NodeContext.layer)));
