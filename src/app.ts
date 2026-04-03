import { PromptService } from "./core/prompt/prompt.service";

export class App {
    async run() {
        console.log('WORK')
        const res = await (new PromptService()).input<string>('Введите число', 'number')
        console.log(res)
    }
}

const app = new App()

app.run()