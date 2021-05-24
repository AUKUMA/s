import { ContentWarningKey } from "./enums";
import { ContentWarning } from "./types";

// eslint-disable-next-line import/prefer-default-export
export const ContentWarnings: { [key: string]: ContentWarning } = {
  [ContentWarningKey.ECCHI]: { key: ContentWarningKey.ECCHI, name: "Ecchi" },
  [ContentWarningKey.SMUT]: { key: ContentWarningKey.SMUT, name: "Smut" },
  [ContentWarningKey.PORNOGRAPHIC]: {
    key: ContentWarningKey.PORNOGRAPHIC,
    name: "Pornographic",
  },
  [ContentWarningKey.GORE]: { key: ContentWarningKey.GORE, name: "Gore" },
  [ContentWarningKey.SEXUAL_VIOLENCE]: {
    key: ContentWarningKey.SEXUAL_VIOLENCE,
    name: "Sexual Violence",
  },
};

export const contentWarningKeysFromNames = (names: string[]) => {
  return names.map((name: string) => {
    const matching: ContentWarning | undefined = Object.values(
      ContentWarnings
    ).find((contentWarning: ContentWarning) => contentWarning.name === name);
    return matching === undefined ? -1 : matching.key;
  });
};
