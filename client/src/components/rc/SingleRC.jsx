/* eslint-disable react/prop-types */
import { useRCsContext } from '../../pages/RCs';

const SingleRC = ({ _id, name, address }) => {
  const { setRCId, setShowEditRCModal } = useRCsContext();
  return (
    <div>
      <span>{name}</span> - <span>{address}</span>{' '}
      <button
        className='text-green-500'
        onClick={() => {
          setRCId(_id);
          setShowEditRCModal(true);
        }}
      >
        edit
      </button>
    </div>
  );
};

export default SingleRC;
