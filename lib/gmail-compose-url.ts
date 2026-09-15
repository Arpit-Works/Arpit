/** Opens Gmail web compose with the recipient pre-filled (works without a system mail client). */
export function gmailComposeUrl(to: string): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`;
}
