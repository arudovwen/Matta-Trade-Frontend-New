import urls from "../helpers/url_helpers";
import { get, post } from "../helpers/api_helpers";
import store from "../store";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};

export async function getnotification({
  PageNumber = 1,
  PageSize = 10,
  BusinessId,
  UserId,
  Role,
}) {
  return await get(
    `${urls.GET_NOTIFICATION}?PageNumber=${PageNumber}&PageSize=${PageSize}&Role=${Role}&BusinessId=${BusinessId}&UserId=${UserId}`,
    config
  );
}

export async function marknotification(data) {
  return await post(`${urls.MARK_NOTIFICATION}`, data, config);
}

export async function markallnotification(data) {
  return await post(`${urls.MARK_ALL_NOTIFICATION}`, data, config);
}
// export async function getnotificationsettings() {
//   return await get(
//     `${
//       urls.GET_NOTIFICATION_SETTINGS
//     }?PageNumber=${1}&PageSize=${10}&Role=${""}&BusinessId=${
//       store.getters.businessId
//     }&UserId=${store.getters.userId}`,
//     config
//   );
// }
// export async function updatesettings(data) {
//   return await post(`${urls.UPDATE_NOTIFICATION_SETTINGS}`, data, config);
// }
