import { SttBaseProvider } from './stt-base.js';

export class GroqSttProvider extends SttBaseProvider {
    constructor() {
        super();
        this.providerName = 'Groq';
        this.apiEndpoint = '/api/openai/groq/transcribe-audio';
        this.idPrefix = 'groq_stt';
        this.defaultSettings = {
            language: '',
            model: 'whisper-large-v3',
        };
        this.modelOptions = [
            { value: 'whisper-large-v3', label: 'whisper-large-v3' },
            { value: 'whisper-large-v3-turbo', label: 'whisper-large-v3-turbo' },
        ];
    }
}
