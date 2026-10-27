const interviewReportModel = require("../models/interviewReport.model");

async function getUserInterviewReport(interviewId, userId) {
    return interviewReportModel.findOne({
        _id: interviewId,
        user: userId,
    });
}

module.exports = { getUserInterviewReport };