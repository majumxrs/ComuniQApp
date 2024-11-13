import AWS from "aws-sdk";

if (!process.env.EXPO_PUBLIC_AWS_REGION || !process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID || !process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY) {
    throw new Error("Variáveis de ambiente AWS não estão definidas.");
}

AWS.config.update({
    region: process.env.EXPO_PUBLIC_AWS_REGION,
    credentials: {
        accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY,
    }

});

export default AWS;