import moment from "moment";

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
}
