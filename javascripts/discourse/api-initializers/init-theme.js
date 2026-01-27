import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  // Add custom classes to header for styling
  api.onPageChange(() => {
    const header = document.querySelector(".d-header");
    if (header) {
      header.classList.add("mm-header");
    }
  });
});
