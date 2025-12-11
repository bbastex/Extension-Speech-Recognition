import { getRequestHeaders } from '../../../../script.js';
export { MistralSttProvider };

const DEBUG_PREFIX = '<Speech Recognition module (Mistral)> ';

class MistralSttProvider {
    settings;

    defaultSettings = {
        language: '',
        model: 'voxtral-mini-latest',
    };

    get settingsHtml() {
        return `
        <div class="flex-container flexFlowColumn" style="margin-top:8px">
            <label for="mistral_stt_model">Mistral Transcribe model</label>
            <select id="mistral_stt_model">
                <option value="voxtral-mini-latest">voxtral-mini-latest</option>
            </select>
        </div>
        `;
    }

    onSettingsChange() {
        // Used when provider settings are updated from UI
        const model = String($('#mistral_stt_model').val());
        this.settings.model = model;
    }

    loadSettings(settings) {
        // Populate Provider UI given input settings
        if (Object.keys(settings).length == 0) {
            console.debug(DEBUG_PREFIX + 'Using default Mistral STT extension settings');
        }

        // Only accept keys defined in defaultSettings
        this.settings = { ...this.defaultSettings };
        for (const key in settings) {
            if (key in this.settings) {
                this.settings[key] = settings[key];
            } else {
                throw `Invalid setting passed to STT extension: ${key}`;
            }
        }

        $('#speech_recognition_language').val(this.settings.language);
        $('#mistral_stt_model').val(this.settings.model);
        console.debug(DEBUG_PREFIX + 'Mistral STT settings loaded', this.settings);
    }

    async processAudio(audioBlob) {
        const requestData = new FormData();
        requestData.append('avatar', audioBlob, 'record.wav');
        requestData.append('model', this.settings.model || this.defaultSettings.model);

        if (this.settings.language) {
            requestData.append('language', this.settings.language);
        }

        console.debug(DEBUG_PREFIX + 'Model STT: ', this.settings.model)

        const apiResult = await fetch('/api/openai/mistral/transcribe-audio', {
            method: 'POST',
            headers: getRequestHeaders({ omitContentType: true }),
            body: requestData,
        });

        if (!apiResult.ok) {
            toastr.error(apiResult.statusText, 'STT Generation Failed (Mistral)', { timeOut: 10000, extendedTimeOut: 20000, preventDuplicates: true });
            throw new Error(`HTTP ${apiResult.status}: ${await apiResult.text()}`);
        }

        const result = await apiResult.json();
        return result.text;
    }
}
