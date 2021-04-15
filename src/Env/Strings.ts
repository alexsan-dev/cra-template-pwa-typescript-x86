export interface Strings {
    es: Es;
}

export interface Es {
    home:         Home;
    initPrompt:   InitPrompt;
    promptFields: PromptFields;
}

export interface Home {
    title:       string;
    description: string;
}

export interface InitPrompt {
    title:       string;
    confirmText: string;
    body:        string;
}

export interface PromptFields {
    name:     string;
    nameHelp: string;
    disk:     string;
    diskHelp: string;
}
