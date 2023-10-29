export interface AmputatorURL {
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
