import { SttBaseProvider } from './stt-base.js';

export class MistralSttProvider extends SttBaseProvider {
    constructor() {
        super();
        this.providerName = 'MistralAI';
        this.apiEndpoint = '/api/openai/mistral/transcribe-audio';
        this.idPrefix = 'mistral_stt';
        this.defaultSettings = {
            language: '',
            model: 'voxtral-mini-latest',
        };
        this.modelOptions = [
            { value: 'voxtral-mini-latest', label: 'voxtral-mini-latest' },
        ];
    }
}
