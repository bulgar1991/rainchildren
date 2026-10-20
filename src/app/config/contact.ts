// Contact details used across the site (contact page, footer). Also in the structured data in
// src/index.html - keep them in sync.
export const CONTACT_PHONE = '+373 69 396 519';

export const CONTACT_EMAIL = 'rainchildren.md@mail.ru';
export const CONTACT_EMAIL_HREF = 'mailto:' + CONTACT_EMAIL;

// For `href="tel:..."` - digits and a leading +, no spaces.
export const CONTACT_PHONE_HREF = 'tel:' + CONTACT_PHONE.replace(/[^\d+]/g, '');
