import asyncHandler from "../utils/asyncHandler.js";
import apierror from "../utils/apierror.js";
import apiresponse from "../utils/apiresponse.js";

import Lead from "../models/Lead.models.js";
import Conversation from "../models/Conversation.models.js";
import Meeting from "../models/Meeting.models.js";
import FollowUp from "../models/FollowUp.models.js";
import Activity from "../models/Activity.models.js";

// Hide financial fields for Setter & Closer
const removeFinancialFields = (lead) => {

    const leadObject = lead.toObject ? lead.toObject() : { ...lead };

    delete leadObject.depositAmount;
    delete leadObject.cashCollected;
    delete leadObject.refundAmount;
    delete leadObject.totalDealValue;
    delete leadObject.commissionPercentage;
    delete leadObject.commissionEarned;

    return leadObject;
};

// Create activity automatically
const logActivity = async (userId, leadId, action, description) => {
    await Activity.create({
        userId,
        leadId,
        action,
        description,
    });
};

const createLead = asyncHandler(async (req, res) => {

    const lead = await Lead.create(req.body);

    await logActivity(
        req.user._id,
        lead._id,
        "Lead Created",
        `Lead "${lead.leadName}" was created`
    );

    return res.status(201).json(
        new apiresponse(
            201,
            lead,
            "Lead created successfully"
        )
    );
});

const getAllLeads = asyncHandler(async (req, res) => {

    const {
        search,
        status,
        source,
        setter,
        closer,
        from,
        to,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "desc",
    } = req.query;

    const query = {
        isDeleted: false,
    };

    // Role based filtering
    if (req.user.role === "setter") {
        query.setter = req.user._id;
    }

    if (req.user.role === "closer") {
        query.closer = req.user._id;
    }

    // Search
    if (search) {
        query.$or = [
            {
                leadName: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                company: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                email: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                phone: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    // Filters
    if (status) {
        query.status = status;
    }

    if (source) {
        query.source = source;
    }

    // Admin/Manager can filter by setter and closer
    if (
        setter &&
        ["admin", "manager"].includes(req.user.role)
    ) {
        query.setter = setter;
    }

    if (
        closer &&
        ["admin", "manager"].includes(req.user.role)
    ) {
        query.closer = closer;
    }

    // Date Filter
    if (from || to) {

        query.createdAt = {};

        if (from) {
            query.createdAt.$gte =
                new Date(from);
        }

        if (to) {
            query.createdAt.$lte =
                new Date(to);
        }
    }

    // Pagination
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.min(Number(limit), 100);

    const skip =
        (pageNumber - 1) *
        limitNumber;

    // Sorting whitelist
    const allowedSortFields = [
        "createdAt",
        "leadName",
        "status",
        "source",
        "totalDealValue",
        "cashCollected",
    ];

    const finalSort =
        allowedSortFields.includes(sortBy)
            ? sortBy
            : "createdAt";


    const totalLeads =
        await Lead.countDocuments(query);


    let leads = await Lead.find(query)
        .populate(
            "setter",
            "name email role"
        )
        .populate(
            "closer",
            "name email role"
        )
        .sort({
            [finalSort]:
                order === "asc"
                    ? 1
                    : -1,
        })
        .skip(skip)
        .limit(limitNumber);

    // Hide financial data
    if (
        req.user.role === "setter" ||
        req.user.role === "closer"
    ) {
        leads = leads.map(removeFinancialFields);
    }

    return res.status(200).json(
        new apiresponse(
            200,
            {
                totalLeads,

                currentPage:
                    pageNumber,

                totalPages:
                    Math.ceil(
                        totalLeads /
                        limitNumber
                    ),

                limit:
                    limitNumber,

                leads,
            },
            "Leads fetched successfully"
        )
    );
});

// Get Lead Details//
const getLeadById = asyncHandler(async (req, res) => {

    const lead = await Lead.findById(req.params.id)
        .populate("setter", "name email role")
        .populate("closer", "name email role");

    if (!lead) {
        throw new apierror(404, "Lead not found");
    }

    // Role based access
    if (
        req.user.role === "setter" &&
        (!lead.setter ||
            lead.setter._id.toString() !== req.user._id.toString())
    ) {
        throw new apierror(
            403,
            "You are not allowed to view this lead"
        );
    }

    if (
        req.user.role === "closer" &&
        (!lead.closer ||
            lead.closer._id.toString() !== req.user._id.toString())
    ) {
        throw new apierror(
            403,
            "You are not allowed to view this lead"
        );
    }

    const conversations = await Conversation.find({
        leadId: lead._id,
    })
        .populate("userId", "name email role")
        .sort({
            createdAt: -1,
        });

    const meetings = await Meeting.find({
        leadId: lead._id,
    })
        .populate("setter", "name email role")
        .populate("closer", "name email role")
        .sort({
            meetingDate: -1,
        });

    const followUps = await FollowUp.find({
        leadId: lead._id,
    })
        .populate("userId", "name email role")
        .sort({
            followUpDate: -1,
        });

    const activities = await Activity.find({
        leadId: lead._id,
    })
        .populate("userId", "name email role")
        .sort({
            createdAt: -1,
        });

    let leadData = lead;

    // Hide financial information
    if (
        req.user.role === "setter" ||
        req.user.role === "closer"
    ) {
        leadData = removeFinancialFields(lead);
    }

    return res.status(200).json(
        new apiresponse(
            200,
            {
                lead: leadData,
                conversations,
                meetings,
                followUps,
                activities,
            },
            "Lead details fetched successfully"
        )
    );
});

// Update Lead//
const updateLead = asyncHandler(async (req, res) => {

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        throw new apierror(404, "Lead not found");
    }

    // Ownership Check
    if (
        req.user.role === "setter" &&
        (!lead.setter ||
            lead.setter.toString() !== req.user._id.toString())
    ) {
        throw new apierror(
            403,
            "You are not allowed to update this lead"
        );
    }

    if (
        req.user.role === "closer" &&
        (!lead.closer ||
            lead.closer.toString() !== req.user._id.toString())
    ) {
        throw new apierror(
            403,
            "You are not allowed to update this lead"
        );
    }

    let allowedFields = [];

    // Admin / Manager
    if (
        req.user.role === "admin" ||
        req.user.role === "manager"
    ) {

        const protectedFields = [
            "isDeleted",
            "createdAt",
            "updatedAt",
        ];

        allowedFields = Object.keys(req.body).filter(
            (field) => !protectedFields.includes(field)
        );
    }

    // Setter permissions
    else if (req.user.role === "setter") {

        allowedFields = [
            "leadName",
            "company",
            "email",
            "phone",
            "source",
            "notes",
            "firstContactAt",
            "meetingBookedAt",
            "meetingDate",
        ];
    }

    // Closer permissions
    else if (req.user.role === "closer") {
        allowedFields = [
            "status",
            "meetingStatus",
            "offerMade",
            "saleType",
            "lastTouchAt",
            "followUpStatus",
            "notes",
        ];
    }

 // Lead Status Workflow Validation
const statusFlow = {
    new: [
        "proposal",
        "lost"
    ],

    proposal: [
        "meeting_follow_up",
        "lost"
    ],

    meeting_follow_up: [
        "deposit",
        "follow_up_ongoing",
        "lost"
    ],

    follow_up_ongoing: [
        "deposit",
        "lost"
    ],

    deposit: [
        "won",
        "lost"
    ],

    won: [],
    lost: []
};


if (req.body.status) {

    const currentStatus = lead.status;
    const newStatus = req.body.status;

    if (
        currentStatus !== newStatus &&
        !statusFlow[currentStatus].includes(newStatus)
    ) {
        throw new apierror(
            400,
            `Cannot move lead from ${currentStatus} to ${newStatus}`
        );
    }
}


const updates = {};

Object.keys(req.body).forEach((key) => {

    if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
    }

});

    if (Object.keys(updates).length === 0) {
        throw new apierror(
            400,
            "No valid fields provided for update"
        );
    }

    const updatedLead = await Lead.findByIdAndUpdate(
        req.params.id,
        updates,
        {
            new: true,
            runValidators: true,
        }
    )
        .populate("setter", "name email role")
        .populate("closer", "name email role");

    await logActivity(
        req.user._id,
        updatedLead._id,
        "Lead Updated",
        `Lead "${updatedLead.leadName}" was updated`
    );

    let leadData = updatedLead;
    if (
        req.user.role === "setter" ||
        req.user.role === "closer"
    ) {
        leadData = removeFinancialFields(updatedLead);
    }

    return res.status(200).json(
        new apiresponse(
            200,
            leadData,
            "Lead updated successfully"
        )
    );

});

//Delete lead//
const deleteLead = asyncHandler(async (req, res) => {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        throw new apierror(404, "Lead not found");
    }

    await logActivity(
        req.user._id,
        lead._id,
        "Lead Deleted",
        `Lead "${lead.leadName}" was deleted`
    );

    lead.isDeleted = true;

    await lead.save();

    return res.status(200).json(
        new apiresponse(
            200,
            null,
            "Lead deleted successfully"
        )
    );
});

export {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    deleteLead,
};