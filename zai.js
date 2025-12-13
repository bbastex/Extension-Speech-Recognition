import { SttBaseProvider } from './stt-base.js';

export class ZaiSttProvider extends SttBaseProvider {
    constructor() {
        super();
        this.providerName = 'Z.AI';
        this.apiEndpoint = '/api/openai/zai/transcribe-audio';
        this.idPrefix = 'zai_stt';
        this.defaultSettings = {
            language: '',
            model: 'glm-asr-2512',
        };
        this.modelOptions = [
            { value: 'glm-asr-2512', label: 'glm-asr-2512' },
        ];
        this.providerNote = 'Will use Common API. Coding API is not supported!';
    }
}
