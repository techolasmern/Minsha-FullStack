import "dotenv/config";

export const env = {
    port: process.env.PORT,
    client_url: process.env.CLIENT_URL,
    db: {
        url: process.env.DATABASE_URL,
        name: process.env.DATABASE_NAME,
    },
    jwt_secret: process.env.JWT_SECRET,
    email: {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
    }
}