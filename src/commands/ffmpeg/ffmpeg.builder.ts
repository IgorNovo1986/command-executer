

export class FfmpegBuilder {
    private inputPath: string
    private option: Map<string, string> = new Map()

    constructor() {
        this.option.set('-c:v', 'libX264')
    }

    input(inputPath: string): this {
        this.inputPath = inputPath
        return this
    }

    setVideoSize(width: string, height: string): this {
        this.option.set('-s', `${width}x${height}`)
        return this
    }

    output(outputPath: string): string[] {
        if(!this.inputPath) {
            throw new Error('Не указан путь')
        }
        const result: string[] = ['-i', this.inputPath]
        this.option.forEach((value, key)=> {
            result.push(key)
            result.push(value)
        })
        result.push(outputPath)
        return result
    }
}