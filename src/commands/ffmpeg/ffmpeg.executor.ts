import {CommandExecutor} from "../../core/executer/command.executor";
import {ICommandExec} from "../../core/executer/command.types";
import {ChildProcessWithoutNullStreams, spawn} from "node:child_process";
import {IStreamLogger} from "../../core/handlers/steam-logger.interface";
import {PromptService} from "../../core/prompt/prompt.service";
import {FfmpegBuilder} from "./ffmpeg.builder";
import {ICommandExecFfmpeg, IFfmpegTypes} from "./ffmpeg.types";
import {FileService} from "../../core/files/file.service";
import {StreamHandler} from "../../core/handlers/stream.handler";

export class FfmpegExecutor extends CommandExecutor<IFfmpegTypes> {

    private promptService: PromptService = new PromptService()
    private fileService: FileService = new FileService()
    constructor(logger: IStreamLogger) {
        super(logger);
    }

    protected async prompt(): Promise<IFfmpegTypes> {
        const width = await this.promptService.input<number>('Ширина', 'number')
        const height = await this.promptService.input<number>('Высота', 'number')
        const path = await this.promptService.input<string>('Путь до файла', 'input')
        const name = await this.promptService.input<string>('Имя', 'input')
        return { width, height, name, path }
    }
    protected build({ width, height, path, name }: IFfmpegTypes): ICommandExecFfmpeg {
        const output = this.fileService.getFileName(path, name, 'mp4')
        const args = new FfmpegBuilder()
            .input(path)
            .setVideoSize(width, height)
            .output(output)
        return { command: 'ffmpeg', args, output }
    }
    protected  spawn({output, command, args}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileExists(output);
        return spawn('ffmpeg', args)
    }
    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger)
        handler.processOutput(stream)
    }

}