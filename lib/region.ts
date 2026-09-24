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
    availability: "Remote (GMT+5), flexible for US hours · Open to relocate (will require sponsorship)",
  },
  uk: {
    docName: "CV",
    file: "/Portfolio/cv/saim-wajid-cv-uk-ie.pdf",
    downloadAs: "Saim_Wajid_CV_UK_Ireland.pdf",
    availability: "Open to relocate (Glasgow · Edinburgh · Dublin; will require sponsorship) or remote (UTC+5)",
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
