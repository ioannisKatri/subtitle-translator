const SENTENCE_REGEX_VALIDATOR: string = `(^[0-9]{1,})\\s(\\[[0-9]{2}:[0-9]{2}:[0-9]{2}\\.[0-9]{2})(\\s\\-\\s[0-9]{2}:[0-9]{2}:[0-9]{2}\\.[0-9]{2}\\])\\s.*`
const TIME_EXTRACTOR: string = '(\\[[0-9]{2}:[0-9]{2}:[0-9]{2}\\.[0-9]{2})(\\s\\-\\s[0-9]{2}:[0-9]{2}:[0-9]{2}\\.[0-9]{2}\\])';


export const sentenceExtractor = (line: string): string => {
    const third = line.indexOf('] ')
    return line.substr(third + 2)
}

export const removeUnneededSpaces = (sentence:string): string => sentence.replace(/\s\s+/g, ' ');

export const templateSentenceCreator = (line: string): string => {
    const id = line.indexOf(' ')
    const time = line.match(TIME_EXTRACTOR) || []

    return `${id} ${time[0]} `;
}

export const rowValidator = (line: string): boolean => {
    const regex = new RegExp(SENTENCE_REGEX_VALIDATOR);
    return regex.test(line)
}
