import type { BriefMessageInput } from "@/data/briefTemplates";

export type LeadPayload = BriefMessageInput;

export class LeadDeliveryError extends Error {
  status: number;

  constructor(status: number) {
    super(`Lead delivery failed with status ${status}`);
    this.name = "LeadDeliveryError";
    this.status = status;
  }
}

export const leadApiUrl = "/api/telegram-brief";

export const submitLeadPayload = async (payload: LeadPayload) => {
  const response = await fetch(leadApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new LeadDeliveryError(response.status);
  }
};
