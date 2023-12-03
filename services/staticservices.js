import urls from "../helpers/url_helpers";
import { get } from "../helpers/api_helpers";

export async function getcountries(config = {}) {
  return await get(urls.GET_COUNTRIES, config);
}
