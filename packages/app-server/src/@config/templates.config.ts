import {join} from "path";

const TEMPLATE_FOLDER = "@templates";
const TEMPLATE_PAGES = "sections";
const TEMPLATE_PARTIALS = "partials";
export const TEMPLATE_PAGES_PATH = join(__dirname, "../", TEMPLATE_FOLDER, TEMPLATE_PAGES);
export const TEMPLATE_PARTIALS_PATH = join(__dirname, "../", TEMPLATE_FOLDER, TEMPLATE_PARTIALS);

// email templates
export const EMAIL_VERIFY_EMAIL_TEMPLATE = "email-verify.email.hbs";
export const RESET_PASSWORD_EMAIL_TEMPLATE = "reset-password.email.hbs";
export const REGISTRATION_EMAIL_TEMPLATE = "registration.email.hbs";

// page templates
export const RESET_PASSWORD_PAGE_TEMPLATE = "reset-password.page.hbs";