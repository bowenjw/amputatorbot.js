import { get } from 'https';
import { Routes } from './Routes.js';
import { AmputatorResponse, AmputatorResponseError } from './interfaces.js';

export { Routes } from './Routes.js';
export { AmputatorResponse, AmputatorResponseError, AmputatorSubResponse, AmputatorURL } from './interfaces.js';
export { hyperlink } from './regex.js';

/**
 * 
 * @param urls one or more AMP URLs.
 * @param gac Whether to use the canonical-finding method guess-and-check. While prone to errors, it's handy as a last resort. It essentially guesses canonical links and tests to see if they could be correct.
 * @param md The maximum number of refferals to canonicals to follow (max-depth). AmputatorBot keeps scraping referred canonical pages untill the max-depth has been reached.
 * @returns Returns an array of object containing
 */
export function amputatorBot(urls:string[] | string, gac:boolean = true, md: number = 3) {

    return new Promise<AmputatorResponse[] | AmputatorResponseError>(function(resolve, _reject) {
        get(Routes.getConvert(urls, gac, md), (resp) => {
            
            let data = '';

            resp.on('data', (chunk) =>{ data += chunk;});

            resp.on('end', () => { resolve(JSON.parse(data))});

        }).on('error', err => { console.error(err) });
    })
    
}
