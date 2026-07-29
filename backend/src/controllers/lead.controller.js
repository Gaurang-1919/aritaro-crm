import asyncHandler from "../utils/asyncHandler.js";
import apierror from "../utils/apierror.js";
import apiresponse from "../utils/apiresponse.js";
import Lead from "../models/Lead.models.js";

const createLead = asyncHandler(async (req, res) => {
    const lead = await Lead.create(req.body);

    return res.status(201).json(
        new apiresponse(
            201,
            "Lead created successfully",
            lead
        )
    );
});

const getAllLeads = asyncHandler(async (req, res) => {
    const leads = await Lead.find()
        .populate("setter", "name email role")
        .populate("closer", "name email role")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new apiresponse(
            200,
            "Leads fetched successfully",
            leads
        )
    );
});

const getLeadById = asyncHandler(async (req, res) => {
    const lead = await Lead.findById(req.params.id)
        .populate("setter", "name email role")
        .populate("closer", "name email role");

    if (!lead) {
        throw new apierror(404, "Lead not found");
    }

    return res.status(200).json(
        new apiresponse(
            200,
            "Lead fetched successfully",
            lead
        )
    );
});

const updateLead = asyncHandler(async (req, res) => {
    const lead = await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!lead) {
        throw new apierror(404, "Lead not found");
    }

    return res.status(200).json(
        new apiresponse(
            200,
            "Lead updated successfully",
            lead
        )
    );
});

const deleteLead = asyncHandler(async (req, res) => {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        throw new apierror(404, "Lead not found");
    }

    await lead.deleteOne();

    return res.status(200).json(
        new apiresponse(
            200,
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