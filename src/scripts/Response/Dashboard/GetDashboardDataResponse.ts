import BaseApiResponse from "@/scripts/Response/BaseApiResponse";
import ErrorHandler    from "@/scripts/Response/ErrorHandler";

/**
 * Response containing data for dashboard
 */
export default class GetDashboardDataResponse extends BaseApiResponse
{
    public recentFailedJobSearchesHoursOffset: number;
    public pendingJobSearchesCount: number;
    public recentFailedJobSearchesCount: number;
    public pointsSpentTotally: number;
    public pointsAvailable: number;
    public jobApplicationsPerDay: Array<Array<number>>
    public uniqueOffersFoundPerDay: Array<Array<number>>

    /**
     * @description Create GetDashboardDataResponse from json
     */
    public static fromJson(json: string): GetDashboardDataResponse
    {
        let apiResponse = new GetDashboardDataResponse();
        apiResponse.prefillBaseFields(json);

        try {
            var object = JSON.parse(json);
        } catch (Exception) {
            ErrorHandler.throwJsonParsingError('GetDashboardDataResponse', Exception, json);
        }

        apiResponse.recentFailedJobSearchesHoursOffset = object.recentFailedJobSearchesHoursOffset;
        apiResponse.pendingJobSearchesCount            = object.pendingJobSearchesCount;
        apiResponse.recentFailedJobSearchesCount       = object.recentFailedJobSearchesCount;
        apiResponse.pointsSpentTotally                 = object.pointsSpentTotally;
        apiResponse.pointsAvailable                    = object.pointsAvailable;
        apiResponse.jobApplicationsPerDay              = object.jobApplicationsPerDay;
        apiResponse.uniqueOffersFoundPerDay            = object.uniqueOffersFoundPerDay;

        return apiResponse;
    }

}