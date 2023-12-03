import urls from "../helpers/url_helpers";
import { get } from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Authentication

export const getorderchart = withRetryHandling(
  ({ StartDate = "", EndDate = "" }) => {
    return get(
      `${urls.ORDER_TREND}?EndDate=${EndDate}&StartDate=${StartDate}`,
      config
    );
  }
);
export const getchart = withRetryHandling(
  ({ StartDate = "", EndDate = "" }) => {
    return get(
      `${urls.CHART_TREND}?EndDate=${EndDate}&StartDate=${StartDate}`,
      config
    );
  }
);
