import HomePage from "../pages/HomePage/index.svelte";
import FormPage from "../pages/FormPage/index.svelte";

export const routes = {
  "/": HomePage,
  "/view/:id?": FormPage,
  "/edit/:id?": FormPage,
  "/add": FormPage,
};
