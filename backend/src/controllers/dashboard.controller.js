import asyncHandler from "../utils/asyncHandler.js";
import apiresponse from "../utils/apiresponse.js";
import apierror from "../utils/apierror.js";

import Lead from "../models/Lead.models.js";
import Meeting from "../models/Meeting.models.js";
import FollowUp from "../models/FollowUp.models.js";
import Conversation from "../models/Conversation.models.js";
import User from "../models/User.models.js";

//helper: build filters//

const buildLeadFilter = (query, user) => {
    const filter = {};

    filter.isDeleted = false;
    
    if (query.setter) {
        filter.setter = query.setter;
    }

    if (query.closer) {
        filter.closer = query.closer;
    }

    if (query.source) {
        filter.source = query.source;
    }

    if (query.from || query.to) {
        filter.createdAt = {};

        if (query.from) {
            filter.createdAt.$gte = new Date(query.from);
        }

        if (query.to) {
            filter.createdAt.$lte = new Date(query.to);
        }
    }

    // Role-based restriction
    if (user.role === "setter") {
        filter.setter = user._id;
    }

    if (user.role === "closer") {
        filter.closer = user._id;
    }

    return filter;
};

const buildRelatedFilter = (query, user) => {
    const meetingFilter = {};
    const followUpFilter = {};
    const conversationFilter = {};

    if (query.setter) {
        meetingFilter.setter = query.setter;
    }

    if (query.closer) {
        meetingFilter.closer = query.closer;
    }

    if (query.setter) {
        conversationFilter.userId = query.setter;
        followUpFilter.userId = query.setter;
    }

    if (user.role === "setter") {
        meetingFilter.setter = user._id;
        followUpFilter.userId = user._id;
        conversationFilter.userId = user._id;
    }

    if (user.role === "closer") {
        meetingFilter.closer = user._id;
        followUpFilter.userId = user._id;
        conversationFilter.userId = user._id;
    }

    if (query.from || query.to) {

        const dateFilter = {};

        if (query.from) {
            dateFilter.$gte = new Date(query.from);
        }

        if (query.to) {
            dateFilter.$lte = new Date(query.to);
        }

        meetingFilter.meetingDate = dateFilter;
        followUpFilter.followUpDate = dateFilter;
        conversationFilter.date = dateFilter;
    }

    return {
        meetingFilter,
        followUpFilter,
        conversationFilter
    };
};

//Dashboard Overview//

const getDashboardOverview = asyncHandler(async (req, res) => {

    const filter = buildLeadFilter(req.query, req.user);

    const {
       meetingFilter,
       followUpFilter,
       conversationFilter
    } = buildRelatedFilter(req.query, req.user);

    const [
        totalLeads,
        totalUsers,
        totalMeetings,
        totalFollowUps,
        totalConversations,
        wonLeads,
        lostLeads,
        proposalLeads,
        depositLeads
    ] = await Promise.all([

        Lead.countDocuments(filter),

        (req.user.role === "admin" || req.user.role === "manager")
            ? User.countDocuments()
            : Promise.resolve(null),

        Meeting.countDocuments(meetingFilter),

        FollowUp.countDocuments(followUpFilter),

        Conversation.countDocuments(conversationFilter),

        Lead.countDocuments({
            ...filter,
            status: "won"
        }),

        Lead.countDocuments({
            ...filter,
            status: "lost"
        }),

        Lead.countDocuments({
            ...filter,
            status: "proposal"
        }),

        Lead.countDocuments({
            ...filter,
            status: "deposit"
        })

    ]);

    return res.status(200).json(
        new apiresponse(
            200,
            {
                totalLeads,
                totalUsers,
                totalMeetings,
                totalFollowUps,
                totalConversations,
                wonLeads,
                lostLeads,
                proposalLeads,
                depositLeads,
            },
            "Dashboard overview fetched successfully"
        )
    );
});

//Kanban Summary//
const getKanbanSummary = asyncHandler(async (req, res) => {
    const filter = buildLeadFilter(req.query, req.user);
    const kanban = await Lead.aggregate([
        {
            $match: filter
        },

        {
            $group: {
                _id: "$status",

                total: {
                    $sum: 1
                }
            }
        },

        {
            $sort: {
                _id: 1
            }
        }

    ]);

    return res.status(200).json(
        new apiresponse(
            200,
            kanban,
            "Kanban summary fetched successfully"
        )

    );

});

//Lead Source Analytics//
const getLeadSourceAnalytics = asyncHandler(async (req, res) => {
    const filter = buildLeadFilter(req.query, req.user);
    const analytics = await Lead.aggregate([
        {
            $match: filter
        },

        {
            $group: {
                _id: "$source",
                totalLeads: {
                    $sum: 1
                },

                totalRevenue: {
                    $sum: "$cashCollected"
                }
            }
        },

        {
            $sort: {
                totalLeads: -1
            }

        }

    ]);

    return res.status(200).json(
        new apiresponse(
            200,
            analytics,
            "Lead source analytics fetched successfully"
        )
    );
});

//Setter Metrics//

const getSetterMetrics = asyncHandler(async (req, res) => {

    if (!["admin", "manager", "setter"].includes(req.user.role)) {
        throw new apierror(403, "Access denied");
    }

    const filter = buildLeadFilter(req.query, req.user);

    const {
      meetingFilter
    } = buildRelatedFilter(req.query, req.user);

    const totalLeads = await Lead.countDocuments(filter);
    const totalConversations = await Conversation.countDocuments();
    const bookedMeetings = await Lead.countDocuments({
        ...filter,
        meetingBookedAt: { $ne: null }
    });

    const conversationToBooked =
        totalConversations === 0
            ? 0
            : ((bookedMeetings / totalConversations) * 100).toFixed(2);

    const scheduledCalls = await Meeting.countDocuments({
       ...meetingFilter,
        status: "scheduled"
    });

    const callsTaken = await Meeting.countDocuments({
        ...meetingFilter,
        status: "show"
    });

    const noShows = await Meeting.countDocuments({
        ...meetingFilter,
        status: "no_show"
    });

    const cancelledCalls = await Meeting.countDocuments({
        ...meetingFilter,
        status: "cancelled"
    });

    const rescheduledCalls = await Meeting.countDocuments({
        ...meetingFilter,
        status: "rescheduled"
    });

    const dqMeetings = await Meeting.countDocuments({
        ...meetingFilter,
        status: "dq"
    });

    const showRate =
        scheduledCalls === 0
            ? 0
            : ((callsTaken / scheduledCalls) * 100).toFixed(2);

    const dqRate =
        scheduledCalls === 0
            ? 0
            : ((dqMeetings / scheduledCalls) * 100).toFixed(2);

    const speedToLead = await Lead.aggregate([
        {
            $match: {
                ...filter,
                firstContactAt: { $ne: null }
            }
        },
        {
            $project: {
                responseTime: {
                    $divide: [
                        {
                            $subtract: [
                                "$firstContactAt",
                                "$createdAt"
                            ]
                        },
                        1000 * 60
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                averageMinutes: {
                    $avg: "$responseTime"
                }
            }
        }
    ]);

    const bookingLag = await Lead.aggregate([
        {
            $match: {
                ...filter,
                meetingBookedAt: { $ne: null }
            }
        },
        {
            $project: {
                bookingHours: {
                    $divide: [
                        {
                            $subtract: [
                                "$meetingBookedAt",
                                "$createdAt"
                            ]
                        },
                        1000 * 60 * 60
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                averageHours: {
                    $avg: "$bookingHours"
                }
            }
        }
    ]);

    return res.status(200).json(
        new apiresponse(
            200,
            {
                totalLeads,
                totalConversations,
                bookedMeetings,
                conversationToBookedPercentage: conversationToBooked,

                scheduledCalls,
                callsTaken,

                noShows,
                cancelledCalls,
                rescheduledCalls,

                showRate,

                dqMeetings,
                dqRate,

                averageSpeedToLeadMinutes:
                    speedToLead.length
                        ? speedToLead[0].averageMinutes
                        : 0,

                averageBookingLagHours:
                    bookingLag.length
                        ? bookingLag[0].averageHours
                        : 0
            },
            "Setter metrics fetched successfully"
        )
    );

});

//Recent Setter Activity//

const getRecentSetterActivity = asyncHandler(async (req, res) => {

    if (!["admin", "manager", "setter"].includes(req.user.role)) {
        throw new apierror(403, "Access denied");
    }

    let query = {};

    if (
       req.user.role === "setter" ||
       req.user.role === "closer"
    ) {
       query.userId = req.user._id;
    }

    const activities = await Conversation.find(query)
       .populate("leadId")
       .populate("userId", "name role")
       .sort({ createdAt: -1 })
       .limit(20);

    return res.status(200).json(
        new apiresponse(
            200,
            activities,
            "Recent setter activity fetched successfully"
        )
    );
});

//Closer Metrics//

const getCloserMetrics = asyncHandler(async (req, res) => {

    if (!["admin", "manager", "closer"].includes(req.user.role)) {
        throw new apierror(403, "Access denied");
    }

    const filter = buildLeadFilter(req.query, req.user);

    const {
      meetingFilter,
      followUpFilter
    } = buildRelatedFilter(req.query, req.user);

    const totalMeetingsTaken = await Meeting.countDocuments({
        ...meetingFilter,
        status: "show"
    });

    const offersMade = await Lead.countDocuments({
        ...filter,
        offerMade: true
    });

    const wonDeals = await Lead.countDocuments({
        ...filter,
        status: "won"
    });

    const followUpSales = await Lead.countDocuments({
        ...filter,
        saleType: "follow_up_sale"
    });

    const oneCallSales = await Lead.countDocuments({
        ...filter,
        saleType: "one_call_sale"
    });

    const offerRate =
        totalMeetingsTaken === 0
            ? 0
            : ((offersMade / totalMeetingsTaken) * 100).toFixed(2);

    const closeRate =
        totalMeetingsTaken === 0
            ? 0
            : ((wonDeals / totalMeetingsTaken) * 100).toFixed(2);

    const closeRateOnOffers =
        offersMade === 0
            ? 0
            : ((wonDeals / offersMade) * 100).toFixed(2);

    const averageDeal = await Lead.aggregate([
        {
            $match: filter
        },
        {
            $group: {
                _id: null,
                averageDealSize: {
                    $avg: "$totalDealValue"
                }
            }
        }
    ]);

    const revenuePerCall = await Lead.aggregate([
        {
            $match: filter
        },
        {
            $group: {
                _id: null,
                revenue: {
                    $sum: "$cashCollected"
                }
            }
        }
    ]);

    const revenuePerCallTaken =
        totalMeetingsTaken === 0
            ? 0
            : (
                  (revenuePerCall.length
                      ? revenuePerCall[0].revenue
                      : 0) / totalMeetingsTaken
              ).toFixed(2);

    const followUpAging = await FollowUp.aggregate([
        {
            $match: {
                ...followUpFilter,
                status: "pending"
            }
        },
        {
            $project: {
                agingDays: {
                    $divide: [
                        {
                            $subtract: [
                                new Date(),
                                "$followUpDate"
                            ]
                        },
                        1000 * 60 * 60 * 24
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                averageDays: {
                    $avg: "$agingDays"
                }
            }
        }
    ]);

    return res.status(200).json(
        new apiresponse(
            200,

            {
                totalMeetingsTaken,
                offersMade,
                wonDeals,
                offerRate,
                closeRate,
                closeRateOnOffers,
                oneCallSales,
                followUpSales,

                averageDealSize:
                    averageDeal.length
                        ? averageDeal[0].averageDealSize
                        : 0,

                revenuePerCallTaken,

                averageFollowUpAge:
                    followUpAging.length
                        ? followUpAging[0].averageDays
                        : 0
            },

            "Closer metrics fetched successfully"
        )
    );
});

//Closer Revenue Breakdown//

const getCloserRevenueBreakdown = asyncHandler(async (req, res) => {

    if (!["admin", "manager"].includes(req.user.role)) {
        throw new apierror(403, "Access denied");
    }

    const revenue = await Lead.aggregate([
        {
            $group: {
                _id: "$closer",

                dealsClosed: {
                    $sum: 1
                },

                revenueGenerated: {
                    $sum: "$cashCollected"
                },

                totalDealValue: {
                    $sum: "$totalDealValue"
                },

                commissionEarned: {
                    $sum: "$commissionEarned"
                }
            }
        },

        {
            $sort: {
                revenueGenerated: -1
            }
        }
    ]);

    return res.status(200).json(
        new apiresponse(
            200,
            revenue,
            "Closer revenue breakdown fetched successfully"
        )
    );
});

//Money Metrics//

const getMoneyMetrics = asyncHandler(async (req, res) => {

    if (!["admin", "manager"].includes(req.user.role)) {
        throw new apierror(403, "Access denied");
    }

    const filter = buildLeadFilter(req.query, req.user);
    const money = await Lead.aggregate([

        {
            $match: filter
        },

        {
            $group: {

                _id: null,

                totalDeposits: {
                    $sum: "$depositAmount"
                },

                totalSales: {
                    $sum: "$totalDealValue"
                },

                revenueGenerated: {
                    $sum: "$totalDealValue"
                },

                cashCollected: {
                    $sum: "$cashCollected"
                },

                totalRefunds: {
                    $sum: "$refundAmount"
                },

                totalCommission: {
                    $sum: "$commissionEarned"
                }

            }

        }

    ]);

    const summary = money.length
        ? money[0]
        : {
              totalDeposits: 0,
              totalSales: 0,
              revenueGenerated: 0,
              cashCollected: 0,
              totalRefunds: 0,
              totalCommission: 0
          };

    const netRevenue =
        summary.cashCollected - summary.totalRefunds;

    const paidInFull = await Lead.countDocuments({
        ...filter,
        cashCollected: {
            $gte: 1
        }
    });

    const depositLeads = await Lead.countDocuments({
        ...filter,
        depositAmount: {
            $gt: 0
        }
    });

    const depositConversion =
        depositLeads === 0
            ? 0
            : (
                  (paidInFull / depositLeads) *
                  100
              ).toFixed(2);

    const averageCollection = await Lead.aggregate([

        {
            $match: {
                ...filter,

                meetingDate: {
                    $ne: null
                },

                cashCollected: {
                    $gt: 0
                }
            }
        },

        {

            $project: {
                days: {
                    $divide: [
                        {
                            $subtract: [
                                "$updatedAt",
                                "$meetingDate"
                            ]
                        },

                        1000 * 60 * 60 * 24
                    ]
                }
            }
        },

        {

            $group: {
                _id: null,
                averageDays: {
                    $avg: "$days"
                }
            }
        }
    ]);

    const commissionPerRep = await Lead.aggregate([

        {
            $group: {
                _id: "$closer",
                commission: {
                    $sum: "$commissionEarned"
                }
            }
        },

        {
            $sort: {
                commission: -1
            }
        }
    ]);

    return res.status(200).json(
        new apiresponse(
            200,
            {
                totalDeposits: summary.totalDeposits,
                totalSales: summary.totalSales,
                revenueGenerated: summary.revenueGenerated,
                cashCollected: summary.cashCollected,
                refunds: summary.totalRefunds,
                netRevenue,
                totalCommission: summary.totalCommission,

                depositToPaidConversion:
                    depositConversion,

                averageDaysToCollect:
                    averageCollection.length
                        ? averageCollection[0].averageDays
                        : 0,

                commissionPerRep

            },
            "Money metrics fetched successfully"
        )
    );
});

//Revenue Projection//

const getRevenueProjection = asyncHandler(async (req, res) => {

    if (!["admin", "manager"].includes(req.user.role)) {
        throw new apierror(403, "Access denied");
    }

    const filter = buildLeadFilter(req.query, req.user);
    const projection = await Lead.aggregate([

        {
            $match: {
                ...filter,
                status: {
                    $in: [
                        "proposal",
                        "deposit",
                        "meeting_follow_up"
                    ]
                }
            }
        },

        {
            $group: {
                _id: null,

                pipelineValue: {
                    $sum: "$totalDealValue"
                },

                averageDealSize: {
                    $avg: "$totalDealValue"
                },

                meetingsScheduled: {
                    $sum: 1
                }
            }
        }

    ]);

    const data = projection.length
        ? projection[0]
        : {
              pipelineValue: 0,
              averageDealSize: 0,
              meetingsScheduled: 0
          };

    // Placeholder projection logic//

    const bestCaseRevenue = data.pipelineValue;
    const expectedCaseRevenue = data.pipelineValue * 0.70;
    const worstCaseRevenue = data.pipelineValue * 0.40;

    return res.status(200).json(
        new apiresponse(
            200,
            {
                meetingsScheduled: data.meetingsScheduled,

                averageDealSize: data.averageDealSize,

                pipelineValue: data.pipelineValue,
                bestCaseRevenue,
                expectedCaseRevenue,
                worstCaseRevenue
            },

            "Revenue projection generated successfully"
        )
    );
});

//Alerts & Risk Indicators//

const getLeakReport = asyncHandler(async (req, res) => {
    const filter = buildLeadFilter(req.query, req.user);

     const {
        meetingFilter
    } = buildRelatedFilter(req.query, req.user);

    const bookingLagAlerts = await Lead.find({

        ...filter,
        meetingBookedAt: {
            $ne: null
        }
    });

    const delayedBookings = bookingLagAlerts.filter((lead) => {

        const diffDays =
            (lead.meetingBookedAt - lead.createdAt) /
            (1000 * 60 * 60 * 24);

        return diffDays > 4;
    });

    const staleFollowUps = await Lead.find({

        ...filter,
        followUpStatus: "ongoing",
        lastTouchAt: {
            $lt: new Date(
                Date.now() -
                7 * 24 * 60 * 60 * 1000
            )
        }
    });

    const unpaidDeposits = await Lead.find({

        ...filter,
        offerMade: true,
        depositAmount: 0,
        createdAt: {
            $lt: new Date(
                Date.now() -
                14 * 24 * 60 * 60 * 1000
            )
        }
    });

    const inactiveLeads = await Lead.find({

        ...filter,
        lastTouchAt: {
            $lt: new Date(
                Date.now() -
                30 * 24 * 60 * 60 * 1000
            )
        }
    });

    const noShows = await Meeting.find({
        ...meetingFilter,
        status: "no_show"
    }).populate("leadId");

    return res.status(200).json(
        new apiresponse(
            200,
            {
                delayedBookings,
                staleFollowUps,
                unpaidDeposits,
                inactiveLeads,
                noShows
            },
            "Alert & Risk report fetched successfully"

        )
    );
});

//Recent CRM Activities//

const getRecentActivities = asyncHandler(async (req, res) => {

    let query = {};

    if (
        req.user.role === "setter" ||
        req.user.role === "closer"
    ) {
        query.userId = req.user._id;
    }

    const activities = await Conversation.find(query)
        .populate("leadId")
        .populate("userId", "name role")
        .sort({
            createdAt: -1
        })
        .limit(20);

    return res.status(200).json(
        new apiresponse(
            200,
            activities,
            "Recent CRM activities fetched successfully"
        )
    );
});

export {
    getDashboardOverview,
    getKanbanSummary,
    getLeadSourceAnalytics,
    getSetterMetrics,
    getRecentSetterActivity,
    getCloserMetrics,
    getCloserRevenueBreakdown,
    getMoneyMetrics,
    getRevenueProjection,
    getLeakReport,
    getRecentActivities,
};
