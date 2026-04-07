import { IStreamLogger } from "../../core/handlers/steam-logger.interface";

export class ConsoleLogger implements IStreamLogger {

    private static logger: ConsoleLogger
    public static getInstance() {
        if (!ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger()
        }
        return ConsoleLogger.logger
    }
    error(...args: any[]): void {
        console.log(args)
    }

    log(...args: any[]): void {
        console.log(args)
    }

    end(): void {
        console.log('готово')
    }

}