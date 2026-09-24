export type Region = "pk" | "us" | "uk"

type RegionInfo = {
  /** What the document is called in that market */
  docName: "Resume" | "CV"
  /** Served from /public; includes the basePath because plain <a href> doesn't get it added */
  file: string
  /** Filename the browser saves it as */
  downloadAs: string
  /** One-line availability shown in the hero and contact sections */
  availability: string
  /** Extra line shown only in the contact section */
  contactNote?: string
  /** One-line slogan under the titles in the hero */
  slogan?: string
  /** Paragraph on working across timezones, shown under the contact heading */
  timezonePitch?: string
}

export const REGION_INFO: Record<Region, RegionInfo> = {
  pk: {
    docName: "Resume",
    file: "/Portfolio/cv/saim-wajid-resume-pk.pdf",
    downloadAs: "Saim_Wajid_Resume.pdf",
    availability: "Karachi, Pakistan · On-site, hybrid or remote",
    contactNote: "Open to relocate to Islamabad or Lahore",
  },
  us: {
    docName: "Resume",
    file: "/Portfolio/cv/saim-wajid-resume-us.pdf",
    downloadAs: "Saim_Wajid_Resume_US.pdf",
    availability: "Remote (GMT+5), flexible for US hours · Open to relocate (sponsorship required)",
    slogan: "The timezone isn't a gap. It's a head start.",
    // Pakistan has no daylight saving, so the gap to US Eastern is 9 hours in summer (EDT) and 10 in winter (EST)
    timezonePitch:
      "Pakistan (UTC+5) is 9–10 hours ahead of US Eastern time, depending on daylight saving. I can shift my day to overlap your mornings for standups, code reviews and live incidents, and when you hand work off at the end of your day, you wake up to progress: fixes pushed, pipelines run, notes waiting. Used right, the time difference makes your team's day longer, not slower.",
  },
  uk: {
    docName: "CV",
    file: "/Portfolio/cv/saim-wajid-cv-uk-ie.pdf",
    downloadAs: "Saim_Wajid_CV_UK_Ireland.pdf",
    availability: "Open to relocate (Glasgow · Edinburgh · Dublin; sponsorship required) or remote (UTC+5)",
    // "Hours", not a number: the gap to UK/IE is 4 h in summer (BST/IST) and 5 h in winter
    slogan: "Hours ahead, tea already in hand.",
    timezonePitch:
      "Pakistan (UTC+5) is 4–5 hours ahead of the UK and Ireland. That means several hours of overlap for standups, code reviews and live incidents, plus an early start on anything that needs to be ready by the time your day begins: fixes pushed, pipelines run, notes waiting.",
  },
}

/**
 * Best-effort guess from the visitor's timezone. Runs only in the browser,
 * needs no network call or cookie. Only used on `/`; the region routes pin their version.
 * Continental Europe gets the UK/IE CV: same English-language format, closest fit.
 */
export function guessRegion(): Region {
  let tz = ""
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? ""
  } catch {
    return "pk"
  }
  if (tz.startsWith("America/") || tz.startsWith("US/") || tz === "Pacific/Honolulu") return "us"
  if (tz.startsWith("Europe/") || tz === "GB" || tz === "Eire") return "uk"
  return "pk"
}
