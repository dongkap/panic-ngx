import { SecurityResourceModel } from '@dongkap/do-core';

export const oauthResource: SecurityResourceModel = {
    client_id: 'do-core',
    client_secret: 'secretdo01',
    grant_type: 'password',
    private_key: 'UHU3NG42QjNuNHI=',
    aes_key: 'UHVsYW5nQjNuNHI=',
    session_idle: 5,
    session_timeout: 10,
    signature: true,
    vapid: 'BB3fvY674t6pB9TjZONmYxxlebCmSskbf8lvRLTMYHE-zZ7FONNXOCPv4ndOa1FDov10k26UXZl6rQ7nT9sxWwc',
    recaptcha: '6LdQB9YZAAAAAI12Oyn9yoi5BoW0Bivxo8vJl8rd',
};
