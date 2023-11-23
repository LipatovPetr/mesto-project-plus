import NotFoundError from '../errors/not-found';

const pageNotFound = async () => {
  throw new NotFoundError('Ops! This page does not exist');
};

export default pageNotFound;
