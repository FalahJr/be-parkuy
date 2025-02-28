"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const environment_utils_1 = require("./utils/environment.utils");
const app_config_1 = require("./config/app.config");
const port = process.env.PORT;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: "*"
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
        transform: true,
        validateCustomDecorators: true,
        transformOptions: {
            enableImplicitConversion: true
        }
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Parkuy API Docs')
        .setDescription('Parkuy API documentation collection')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    const isProduction = new environment_utils_1.EnvironmentUtils().isProduction();
    if (!isProduction) {
        swagger_1.SwaggerModule.setup('docs', app, document);
    }
    const serverConfig = (0, app_config_1.default)().server;
    await app.listen(serverConfig.port);
}
bootstrap();
//# sourceMappingURL=main.js.map