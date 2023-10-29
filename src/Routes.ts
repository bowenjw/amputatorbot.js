const amputatorBotURL = new URL("https://www.amputatorbot.com/api/v1/convert");

export const Routes = {
	/**
 	 * 
 	 * @param link one or more AMP URLs.
	 * @param gac Whether to use the canonical-finding method guess-and-check. While prone to errors, it's handy as a last resort. It essentially guesses canonical links and tests to see if they could be correct.
	 * @param md The maximum number of refferals to canonicals to follow (max-depth). AmputatorBot keeps scraping referred canonical pages untill the max-depth has been reached.
	 * @returns Returns an array of object containing
	 */
	getConvert(q: URL[] | string[] | URL | string, gac:boolean = true, md: number = 3) {
		let stringQ =''

		if(Array.isArray(q)) {
			for (const url of q) {
				if(typeof url == "string") stringQ +=  url +';'
				else stringQ +=  url.toString() +';'
			}
			stringQ.slice(0, -1);
		}
		else {
			if(typeof q == "string") stringQ = q
				else stringQ = q.toString();
		}

		return `${amputatorBotURL}?gac=${gac}&md=${md}&q=${stringQ}`
	}
};
