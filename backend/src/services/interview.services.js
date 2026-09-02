export async function getUserInterviewReport(interviewId, userId) {
    return interviewReportModel.findOne({
        _id: interviewId,
        user: userId,
    });
}