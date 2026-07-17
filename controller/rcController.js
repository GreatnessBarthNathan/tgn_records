import RC from '../models/RCModel.js';
import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import { UnAuthorizedError, BadRequestError } from '../errors/customErrors.js';

export const getAllRCs = async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new UnAuthorizedError('not authorized to access this route');
  }

  const rcs = await RC.find().sort({ name: 1 });
  res.status(StatusCodes.OK).json({ count: rcs.length, rcs });
};

export const createRC = async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new UnAuthorizedError('not authorized to access this route');
  }
  const { name } = req.body;
  const existingRC = await RC.findOne({ name });

  if (existingRC) {
    throw new BadRequestError('RC with this name already exists');
  }

  const rc = await RC.create(req.body);
  res.status(StatusCodes.CREATED).json({ rc });
};

export const getSingleRC = async (req, res) => {
  const rc = await RC.findById(req.params.id);
  res.status(StatusCodes.OK).json({ rc });
};

export const updateRC = async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new UnAuthorizedError('not authorized to access this route');
  }
  await RC.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ msg: 'RC updated successfully' });
};

export const deleteRC = async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new UnAuthorizedError('not authorized to access this route');
  }

  const rc = await RC.findById(req.params.id);
  if (!rc) {
    throw new BadRequestError('RC not found');
  }

  await RC.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ msg: 'RC deleted successfully' });
};
