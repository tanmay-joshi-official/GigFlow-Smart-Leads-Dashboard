import { Response } from 'express';
import Lead from '../models/Lead';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all leads with filtering, search, and pagination
// @route   GET /api/leads
// @access  Private
export const getLeads = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const { status, source, search, sort } = req.query;

    let query: any = {};

    // Filtering by status
    if (status) {
      query.status = status;
    }

    // Filtering by source
    if (source) {
      query.source = source;
    }

    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Sorting
    let sortOptions: any = { createdAt: -1 }; // default: latest
    if (sort === 'oldest') {
      sortOptions = { createdAt: 1 };
    }

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name');

    const totalPages = Math.ceil(total / limit);

    res.json({
      leads,
      pagination: {
        page,
        totalPages,
        total,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
export const getLeadById = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('createdBy', 'name');

    if (lead) {
      res.json(lead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create lead
// @route   POST /api/leads
// @access  Private
export const createLead = async (req: AuthRequest, res: Response) => {
  const { name, email, status, source, website, instagram, referral } = req.body;

  try {
    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      website,
      instagram,
      referral,
      createdBy: req.user._id,
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: 'Invalid lead data' });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
export const updateLead = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      lead.name = req.body.name || lead.name;
      lead.email = req.body.email || lead.email;
      lead.status = req.body.status || lead.status;
      lead.source = req.body.source || lead.source;
      lead.website = req.body.website || lead.website;
      lead.instagram = req.body.instagram || lead.instagram;
      lead.referral = req.body.referral || lead.referral;

      const updatedLead = await lead.save();
      res.json(updatedLead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private/Admin
export const deleteLead = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      await lead.deleteOne();
      res.json({ message: 'Lead removed' });
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
