export function prepareHostname(hostname: string): string {
    if (!hostname) return '';
    let hostnameToUse = hostname;

    // If don't have a protocol, add https://
    if (!hostnameToUse.startsWith('http://') && !hostnameToUse.startsWith('https://')) {
        hostnameToUse = `https://${hostnameToUse}`;
    }

    // If has a trailing slash, remove it

    if (hostnameToUse.endsWith('/')) {
        hostnameToUse = hostnameToUse.slice(0, -1);
    }

    return hostnameToUse;
}