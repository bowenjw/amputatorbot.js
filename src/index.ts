import { get } from 'https'

/**
 * Regex fro Https URLs
 */
export const hyperlink = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/gim

/**
 * 
 * @param link one or more AMP URLs.
 * @param gac Whether to use the canonical-finding method guess-and-check. While prone to errors, it's handy as a last resort. It essentially guesses canonical links and tests to see if they could be correct.
 * @param md The maximum number of refferals to canonicals to follow (max-depth). AmputatorBot keeps scraping referred canonical pages untill the max-depth has been reached.
 * @returns Returns an array of object containing
 */
export function amputatorBot(urls:string[] | string, gac:boolean = true, md: number = 3) {
    let amputatorBotURL = `https://www.amputatorbot.com/api/v1/convert?gac=${gac}&md=${md}&q=`
    if(typeof urls == 'string') {
        
        amputatorBotURL += urls

    } else {
        let mulitiURL:string = ''
        urls.forEach(url => {
            mulitiURL += url +';'
        })

        amputatorBotURL += mulitiURL.slice(0, -1)
    }

    console.log(amputatorBotURL)
    return new Promise<AmputatorResponse[] | AmputatorResponseError>(function(resolve, _reject) {
        get(amputatorBotURL, (resp) => {
            
            let data = '';

            resp.on('data', (chunk) =>{ data += chunk;});

            resp.on('end', () => { resolve(JSON.parse(data))});

        }).on('error', err => { console.error(err) });
    })
    
}

interface AmputatorURL {
    domain: string
    is_amp: boolean
    is_cached: boolean | null
    is_valid: boolean
    url: string
}
export interface AmputatorSubResponse extends AmputatorURL {
    is_alt: boolean
    type: string
    url_similarity: number
}

export interface AmputatorResponse {
    amp_canonical: AmputatorSubResponse | null
    canonical: AmputatorSubResponse | null
    canonicals: AmputatorSubResponse[]
    origin: AmputatorURL | null
}

export interface AmputatorResponseError {
    error_Message: string
    result_code: string
}