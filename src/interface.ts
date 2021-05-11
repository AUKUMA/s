import { Chapter, Series, SeriesSourceType } from "./models";
import { PageRequesterData } from "./types";
import { Response, RequestInfo, RequestInit } from "node-fetch";
import DOMParser from "dom-parser";

/**
 * Request a series from the content source.
 *
 * @param sourceType the source type of the series
 * @param id the id of the series on the content source
 * @param fetchFn a fetch function, i.e. from node-fetch
 * @param webviewFunc a function to open a URL in a webview/BrowserView (handled by the client)
 * @returns Promise<Response> to be handled by ParseSeriesFunc
 */
export interface FetchSeriesFunc {
  (
    sourceType: SeriesSourceType,
    id: string,
    fetchFn: (
      url: RequestInfo,
      init?: RequestInit | undefined
    ) => Promise<Response>,
    webviewFunc: (url: string) => Promise<string>
  ): Promise<any>;
}

/**
 * Parse the response from FetchSeriesFunc
 *
 * @param sourceType the source type of the series
 * @param data the content of the response (JSON or text)
 * @param domParser a dom-parser DOMParser
 * @returns the series populated with fields from the content source, or undefined
 */
export interface ParseSeriesFunc {
  (sourceType: SeriesSourceType, data: any, domParser: DOMParser):
    | Series
    | undefined;
}

/**
 * Request chapters for a series from the content source.
 *
 * @param sourceType the source type of the series
 * @param id the id of the series on the content source
 * @param fetchFn a fetch function, i.e. from node-fetch
 * @param webviewFunc a function to open a URL in a webview/BrowserView (handled by the client)
 * @returns Promise<Response> to be handled by ParseChaptersFunc
 */
export interface FetchChaptersFunc {
  (
    sourceType: SeriesSourceType,
    id: string,
    fetchFn: (
      url: RequestInfo,
      init?: RequestInit | undefined
    ) => Promise<Response>,
    webviewFunc: (url: string) => Promise<string>
  ): Promise<any>;
}

/**
 * Parse the response from FetchChaptersFunc
 *
 * @param sourceType the source type of the series
 * @param data the content of the response (JSON or text)
 * @param domParser a dom-parser DOMParser
 * @returns a list of chapters for the series, populated with fields from the content source
 */
export interface ParseChaptersFunc {
  (sourceType: SeriesSourceType, data: any, domParser: DOMParser): Chapter[];
}

/**
 * Request data for a PageRequesterData object containing values used to get individual page URLs.
 *
 * This function is to support handling content sources with a non-uniform method of getting page
 * URLs -- i.e. each chapter may be hosted on an arbitrary server, which can only be identified
 * after requesting the base URL. The PageRequesterData received is solely used for GetPageUrlsFunc.
 *
 * @param sourceType the source type of the series
 * @param seriesSourceId
 * @param chapterSourceId
 * @param fetchFn a fetch function, i.e. from node-fetch
 * @param webviewFunc a function to open a URL in a webview/BrowserView (handled by the client)
 * @returns Promise<Response> to be handled by ParsePageRequesterDataFunc
 */
export interface FetchPageRequesterDataFunc {
  (
    sourceType: SeriesSourceType,
    seriesSourceId: string,
    chapterSourceId: string,
    fetchFn: (
      url: RequestInfo,
      init?: RequestInit | undefined
    ) => Promise<Response>,
    webviewFunc: (url: string) => Promise<string>
  ): Promise<any>;
}

/**
 * Parse the response from FetchPageRequesterDataFunc
 *
 * @param data the content of the response (JSON or text)
 * @param domParser a dom-parser DOMParser
 * @returns the PageRequesterData for passing to any GetPageUrlsFunc call for the chapter
 */
export interface ParsePageRequesterDataFunc {
  (data: any, chapterSourceId: string, domParser: DOMParser): PageRequesterData;
}

/**
 * Get page URLs for a chapter.
 *
 * Strictly speaking, this function does not necessarily return precise URLs for a resource; it only
 * needs to return identifiers that can locate the actual page source (using the Series object if
 * necessary). Particularly, if the series is an archive file, this function returns a list of paths
 * within the archive that need to be extracted separately.
 *
 * @param pageRequesterData
 * @returns list of URLs that can be used to retrieve page data (using GetPageDataFunc)
 */
export interface GetPageUrlsFunc {
  (pageRequesterData: PageRequesterData): string[];
}

/**
 * Get data for a page.
 *
 * This method should return a value that can be put inside the src tag of an HTML <img>. In most
 * cases that can simply be the URL itself.
 *
 * @param series the series this page belongs to
 * @param url the url for this page from GetPageUrlsFunc
 * @returns promise for the data for the page that can be put inside an <img> src
 */
export interface GetPageDataFunc {
  (series: Series, url: string): Promise<string>;
}

/**
 * Search the content source for a series.
 *
 * @param text the user's search content, with any entered search params removed
 * @param params a map of user-specified parameters for searching. These are currently entered in
 * the form "key:value" like "author:oda" but this is not currently well-defined.
 * @param fetchFn a fetch function, i.e. from node-fetch
 * @param webviewFunc a function to open a URL in a webview/BrowserView (handled by the client)
 * @returns Promise<Response> to be handled by ParseSearchFunc
 */
export interface FetchSearchFunc {
  (
    text: string,
    params: { [key: string]: string },
    fetchFn: (
      url: RequestInfo,
      init?: RequestInit | undefined
    ) => Promise<Response>,
    webviewFunc: (url: string) => Promise<string>
  ): Promise<any>;
}

/**
 * Parse the response from FetchSearchFunc
 *
 * @param data the content of the response (JSON or text)
 * @param domParser a dom-parser DOMParser
 * @returns a list of series found from the content source, with fields set as available
 */
export interface ParseSearchFunc {
  (data: any, domParser: DOMParser): Series[];
}

/**
 * Get the directory for the content source (often equivalent to an empty search).
 *
 * @param fetchFn a fetch function, i.e. from node-fetch
 * @param webviewFunc a function to open a URL in a webview/BrowserView (handled by the client)
 * @returns Promise<Response> to be handled by ParseDirectoryFunc
 */
export interface FetchDirectoryFunc {
  (
    fetchFn: (
      url: RequestInfo,
      init?: RequestInit | undefined
    ) => Promise<Response>,
    webviewFunc: (url: string) => Promise<string>
  ): Promise<any>;
}

/**
 * Parse the response from FetchDirectoryFunc
 *
 * @param data the content of the response (JSON or text)
 * @param domParser a dom-parser DOMParser
 * @returns a list of series found from the content source, with fields set as available
 */
export interface ParseDirectoryFunc {
  (data: any, domParser: DOMParser): Series[];
}
