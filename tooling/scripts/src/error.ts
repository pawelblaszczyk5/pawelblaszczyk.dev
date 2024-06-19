import { Data } from "effect";

export const {
	FlyAppDeployError,
	FlyAppDestroyError,
	FlyAppLaunchError,
	FlyConfigCopyError,
	FlySecretSettingError,
	ImplicitProductionEnvironmentUsageError,
	TursoDatabaseCreateError,
	TursoDatabaseDestroyError,
	TursoDatabaseRetrieveError,
	TursoDatabaseTokenMintError,
} = Data.taggedEnum<
	Data.TaggedEnum<{
		FlyAppDeployError: Record<never, never>;
		FlyAppDestroyError: Record<never, never>;
		FlyAppLaunchError: Record<never, never>;
		FlyConfigCopyError: Record<never, never>;
		FlySecretSettingError: { secretName: string };
		ImplicitProductionEnvironmentUsageError: Record<never, never>;
		TursoDatabaseCreateError: Record<never, never>;
		TursoDatabaseDestroyError: Record<never, never>;
		TursoDatabaseRetrieveError: Record<never, never>;
		TursoDatabaseTokenMintError: Record<never, never>;
	}>
>();
