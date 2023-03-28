const faqTabs = document.querySelectorAll('.faq-tab input[type="checkbox"]');

faqTabs.forEach((tab) => {
  tab.addEventListener("change", () => {
    if (tab.checked) {
      faqTabs.forEach((otherTab) => {
        if (otherTab !== tab) {
          otherTab.checked = false;
        }
      });
    }
  });
});
