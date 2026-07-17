import { useEffect } from 'react';
import FormRow from '../FormRow';
import { useNavigation } from 'react-router-dom';
import { useRCsContext } from '../../pages/RCs';
import customFetch from '../../utils/customFetch';
import Loading from '../Loading';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

const EditRCModal = () => {
  const { showEditRCModal, setShowEditRCModal, rc, rcId, fetchRCById } =
    useRCsContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await customFetch.patch(`/rc/${rc._id}`, data);
      toast.success('royal chapter updated successfully');
      setShowEditRCModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    window.location.reload(); // Reload the page to reset the state
  };

  useEffect(() => {
    fetchRCById(rcId);
  }, [rcId, showEditRCModal]); // Refetch RC by ID when the modal is opened or rcId changes

  return (
    <main className='blured fixed top-0 left-0 w-full h-full p-5 md:p-10 flex items-center justify-center'>
      {rc === null ? (
        <Loading />
      ) : (
        <div className='relative bg-white w-[90%] m-auto mt-[50px] rounded p-5 shadow-md shadow-slate-300'>
          <h1 className='mb-5 text-xl text-center'>Edit Royal Chapter</h1>
          <form onSubmit={submitForm}>
            <FormRow
              type='text'
              labelText='name'
              name='name'
              defaultValue={rc?.name}
            />
            <FormRow
              type='text'
              labelText='address'
              name='address'
              defaultValue={rc?.address}
            />
            <button
              type='submit'
              className={`bg-indigo-500 text-white w-full p-2 rounded mt-2 capitalize hover:bg-indigo-200 ${
                isSubmitting && 'bg-indigo-200 cursor-wait'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          <button
            className='absolute top-0 right-0 p-1'
            onClick={() => {
              setShowEditRCModal(false);
              window.location.reload(); // Reload the page to reset the state
            }}
          >
            <FaTimes />
          </button>
        </div>
      )}
    </main>
  );
};

export default EditRCModal;
