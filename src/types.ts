import {
  SeriesSourceType,
  GenreKey,
  ThemeKey,
  ContentWarningKey,
  FormatKey,
  SeriesStatus,
  LanguageKey,
  DemographicKey,
} from "./enums";

export type ExtensionMetadata = {
  id: string;
  name: string;
  url: string;
  version: string;
  translatedLanguage: LanguageKey | undefined;
  hasSettings: boolean;
  notice: string;
  noticeUrl: string;
  pageLoadMessage: string;
};

export type PageRequesterData = {
  server: string;
  hash: string;
  numPages: number;
  pageFilenames: string[];
};

export type WebviewResponse = {
  text: string;
  url: string;
  title: string;
};

export type SeriesListResponse = {
  seriesList: Series[];
  hasMore: boolean;
};

export type Series = {
  id?: string;
  extensionId: string;
  sourceId: string;
  sourceType: SeriesSourceType;
  title: string;
  altTitles: string[];
  description: string;
  authors: string[];
  artists: string[];
  genres: GenreKey[];
  themes: ThemeKey[];
  contentWarnings: ContentWarningKey[];
  formats: FormatKey[];
  demographic: DemographicKey;
  status: SeriesStatus;
  originalLanguageKey: LanguageKey;
  numberUnread: number;
  remoteCoverUrl: string;
  userTags: string[];
  trackerKeys?: { [trackerId: string]: string };
};

export type Chapter = {
  id?: string;
  seriesId?: string;
  sourceId: string;
  title: string;
  chapterNumber: string;
  volumeNumber: string;
  languageKey: LanguageKey;
  groupName: string;
  time: number;
  read: boolean;
};

export type Language = {
  key: LanguageKey;
  name: string;
  flagCode: string;
};

export type Genre = {
  key: GenreKey;
  name: string;
};

export type Theme = {
  key: ThemeKey;
  name: string;
};

export type Format = {
  key: FormatKey;
  name: string;
};

export type ContentWarning = {
  key: ContentWarningKey;
  name: string;
};

export type Demographic = {
  key: DemographicKey;
  name: string;
};
