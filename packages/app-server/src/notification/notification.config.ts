import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {
    EMAIL_VERIFY_EMAIL_TEMPLATE,
    REGISTRATION_EMAIL_TEMPLATE,
    RESET_PASSWORD_EMAIL_TEMPLATE,
    RESET_PASSWORD_PAGE_TEMPLATE,
    TEMPLATE_PAGES_PATH,
    TEMPLATE_PARTIALS_PATH
} from "../@config/templates.config";
import {ACTIONS} from '../@config/actions.config'
import {ADMIN_CONTACT} from "../@config/server.config";
import {AUTH_DAEMON_CONTACT} from '../auth/auth.config'
import {EMAIL, PAGE} from "../@constants";
import {isProd} from "back-common"

export const notificationConfig = {
    transport: isProd()
        ? process.env["SMTP_URL_PROD"]
        : process.env["SMTP_URL_DEV"],
    defaults: {
        from: ADMIN_CONTACT
    },
    template: {
        dir: TEMPLATE_PAGES_PATH,
        adapter: new HandlebarsAdapter(),
        options: {
            strict: true
        }
    },
    options: {
        partials: {
            dir: TEMPLATE_PARTIALS_PATH,
            options: {
                strict: true
            }
        }
    }
};

export const NOTIFICATION_CONFIG = {
    [ACTIONS.EMAIL_VERIFY_EMAIL]: {
        carrier: EMAIL,
        data: {
            subject: "Email verification notification",
            from: AUTH_DAEMON_CONTACT,
            template: EMAIL_VERIFY_EMAIL_TEMPLATE,
            text: "A email verification has been issued for this email address. To proceed follow this link:"
        }
    },
    [ACTIONS.RESET_PASSWORD_EMAIL]: {
        carrier: [EMAIL],
        data: {
            subject: "Reset password request notification",
            from: AUTH_DAEMON_CONTACT,
            template: RESET_PASSWORD_EMAIL_TEMPLATE
        }
    },
    [ACTIONS.REGISTRATION_REQUEST]: {
        carrier: EMAIL,
        data: {
            subject: "Registration request notification",
            from: AUTH_DAEMON_CONTACT,
            template: REGISTRATION_EMAIL_TEMPLATE
        }
    },
    [ACTIONS.RESET_PASSWORD_PAGE]: {
        carrier: PAGE,
        data: {
            title: "Password reset",
            template: RESET_PASSWORD_PAGE_TEMPLATE
        }
    }
};
