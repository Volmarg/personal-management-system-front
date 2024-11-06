import moment, {Moment} from "moment";

/**
 * @description handles date / time - not just the standard DateTime but also moment.js
 */
export default class DateTimeProcessor {

    /**
     * @description takes the comparedDate and compares it with today-date, returns days difference
     */
    public static getDaysAgo(comparedDate: string): number {
        let now = moment();
        let postedMoment = moment(comparedDate);
        return now.diff(postedMoment, 'days');
    }

    /**
     * @description takes array of string based dates and returns the latest one
     */
    public static getLatestDate(dates: Array<string>): string {
        let latestDate: null | Moment = null;
        for (let date of dates) {
            if (!latestDate) {
                latestDate = moment(date);
                continue;
            }

            if (moment(date) > latestDate) {
                latestDate = moment(date);
            }
        }

        return latestDate.format("YYYY-MM-DD HH:mm:ss");
    }
}
