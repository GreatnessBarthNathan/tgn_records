import { useState, useContext, createContext, useEffect } from 'react';
import CreateRCModal from '../components/rc/CreateRCModal';
import EditRCModal from '../components/rc/EditRCModal';
import RoyalChapters from '../components/rc/RoyalChapters';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const RCsContext = createContext();

const RCs = () => {
  const [showCreateRCModal, setShowCreateRCModal] = useState(false);
  const [showEditRCModal, setShowEditRCModal] = useState(false);
  const [rcs, setRCs] = useState([]);
  const [rc, setRC] = useState(null);
  const [rcId, setRCId] = useState(null);

  // fetch all royal chapters
  const fetchRCs = async () => {
    try {
      const {
        data: { rcs },
      } = await customFetch.get('/rc');
      setRCs(rcs);
    } catch (error) {
      console.error('Error fetching royal chapters:', error);
    }
  };

  // fetch single royal chapter by id
  const fetchRCById = async (id) => {
    try {
      const {
        data: { rc },
      } = await customFetch.get(`/rc/${id}`);

      setRC(rc);
    } catch (error) {
      toast.error('Error fetching royal chapter by ID:', error);
      throw error;
    }
  };

  const value = {
    showCreateRCModal,
    setShowCreateRCModal,
    setShowEditRCModal,
    rcs,
    fetchRCById,
    rc,
    setRC,
    rcId,
    setRCId,
  };

  useEffect(() => {
    fetchRCs();
  }, [showCreateRCModal]); // Refetch RCs when the modal is closed to get the updated list

  return (
    <RCsContext.Provider value={value}>
      <RoyalChapters />

      <div className='p-4 md:p-10'>
        {showCreateRCModal && <CreateRCModal />}
        {showEditRCModal && <EditRCModal />}
      </div>
    </RCsContext.Provider>
  );
};

export const useRCsContext = () => {
  return useContext(RCsContext);
};

export default RCs;
