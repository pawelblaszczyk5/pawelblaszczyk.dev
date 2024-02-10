import { hasPackageJsonField } from "#src/utils/has-package-json-field.ts";

const hasDescriptionField = hasPackageJsonField("description");

export default hasDescriptionField;
