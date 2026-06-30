export type BriefFormType = "smart_brief" | "quick_service_brief";

export const buildBriefSource = (formType: BriefFormType) => {
  if (typeof window === "undefined") {
    return {
      formType,
      pageUrl: "",
      referrer: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    formType,
    pageUrl: window.location.href,
    referrer: document.referrer,
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
  };
};
