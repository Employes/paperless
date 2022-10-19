const getComponentClosestLanguage = (element: HTMLElement): string => {
    const closestElement = element.closest('[lang]') as HTMLElement;
    const htmlElement = document.documentElement;

    return closestElement
        ? closestElement.lang
        : htmlElement?.lang
        ? htmlElement.lang
        : 'en';
};

const fetchLocaleStringsForComponent = (
    componentName: string,
    locale: string
): Promise<any> => {
    return new Promise((resolve, reject): void => {
        fetch(`/assets/i18n/${componentName}.i18n.${locale}.json`).then(
            (result) => {
                if (result.ok) {
                    resolve(result.json());
                    return;
                }

                reject();
            },
            () => reject()
        );
    });
};

const cache = {};

export const getLocaleComponentStrings = async (
    element: HTMLElement
): Promise<any> => {
    let componentName = element.tagName.toLowerCase().replace('p-', '');
    let componentLanguage = getComponentClosestLanguage(element);
    let strings;

    if (cache[componentName]?.[componentLanguage]) {
        return cache[componentName][componentLanguage];
    }

    if (!cache[componentName]) {
        cache[componentName] = {};
    }

    if (!cache[componentName][componentLanguage]) {
        cache[componentName][componentLanguage] = {};
    }

    try {
        strings = await fetchLocaleStringsForComponent(
            componentName,
            componentLanguage
        );
    } catch (e) {
        console.warn(
            `no locale for ${componentName} (${componentLanguage}) loading default locale en.`
        );
        strings = await fetchLocaleStringsForComponent(componentName, 'en');
    }

    cache[componentName][componentLanguage] = strings;
    return strings;
};

export const formatTranslation = (str: string, data?: any) => {
    if (!str || !data) {
        return str;
    }

    for (const key of Object.keys(data)) {
        const regex = `{${key}}`;
        str = str.replace(new RegExp(regex, 'g'), data[key]);
    }

    return str;
};
