// Display-only cleanup: preserve stored product titles, URLs, SKUs and filter values.
export function formatContainerTitle(title = "") {
  return String(title ?? "")
    .replace(/(?<=\p{L})[-‐‑](?=[\p{L}\p{N}])|(?<=\p{N})[-‐‑](?=\p{L})/gu, " ")
    .replace(/\s+[–—-]\s+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
