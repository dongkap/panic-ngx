export enum Pattern {
    FULLNAME = '[a-zA-Z .,]+$',
    EMAIL = '.+@.+\..+',
    USERNAME = '[a-z0-9.]*$',
    PHONE_NUMBER = '^(([+]([0-9]{1,2}))|([0-9]{1}))([0-9]{2}-?)([0-9]{4}-?)([0-9]{1,6}-?)$',
    PASSWORD_MEDIUM = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])([@$!%*?&]*)[A-Za-z0-9@$!%*?&]{8,}$',
    PASSWORD_STRONG = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$',
    LOCALE = '^en-US$|^id-ID$',
}
