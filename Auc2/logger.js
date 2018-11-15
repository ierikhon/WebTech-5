const winston = require('winston');
const Sentry = require('winston-raven-sentry');

const enumerateErrorFormat = winston.format(info => {
    if (info instanceof Error) {
        return Object.assign({
            message: info.message,
            stack: info.stack
        }, info);
    }
    return info;
});

let logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ //Вывод в консоль
            level: 'debug', // Уровень debug или выше
            format: winston.format.combine(
                enumerateErrorFormat(),
                winston.format.colorize(),
                winston.format.timestamp({
                    format: 'HH:mm:ss'
                }),
                winston.format.printf(info => {
                    if (info.message instanceof Error){
                        return `${info.timestamp} ${info.level}: ${info.message.name} ${info.message.message}\n` +
                            `${info.message.stack}`
                    }
                    return `${info.timestamp} ${info.level}: ${info.message}`;
                })
            )
        }),
    ],
});

logger.add(new Sentry({ //Вывод в Sentry
    level: 'warn', //Уровень warn или выше
    dsn: "https://27fa4786f6794ff3b8aba990c86be5ad3d0d6c32f470481d8478bc165a9d0dd0@sentry.io/1310383"
}));