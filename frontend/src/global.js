// import Vue from "vue";
// import { useToast } from "vue-toastification";
export const userKey = "_course_mentor";
export const baseApiUrl = "http://localhost:3000";

// export function showError(e) {
//   const toast = useToast();
//   if (e && e.response && e.response.data) {
//     toast.global.defaultError({ msg: e.response.data });
//   } else if (typeof e === "string") {
//     toast.global.defaultError({ msg: e });
//   } else {
//     toast.global.defaultError();
//   }
// }

export default { userKey, baseApiUrl };
