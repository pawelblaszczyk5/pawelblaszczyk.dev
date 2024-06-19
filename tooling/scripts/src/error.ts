import { Data } from "effect";

export const {
	FlyCopyConfigError,
	FlyDeployAppError,
	FlyDestroyAppError,
	FlyLaunchAppError,
	FlySetSecretError,
	ImplicitProductionEnvironmentUsageError,
	TursoCreateDatabaseError,
	TursoCreateTokenError,
	TursoDestroyDatabaseError,
	TursoRetrieveDatabaseError,
} = Data.taggedEnum<
	Data.TaggedEnum<{
		FlyCopyConfigError: Record<never, never>;
		FlyDeployAppError: Record<never, never>;
		FlyDestroyAppError: Record<never, never>;
		FlyLaunchAppError: Record<never, never>;
		FlySetSecretError: { secretName: string };
		ImplicitProductionEnvironmentUsageError: Record<never, never>;
		TursoCreateDatabaseError: Record<never, never>;
		TursoCreateTokenError: Record<never, never>;
		TursoDestroyDatabaseError: Record<never, never>;
		TursoRetrieveDatabaseError: Record<never, never>;
	}>
>();
