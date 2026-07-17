/* eslint-disable react/prop-types */
import FormRow from '../FormRow';
import { useNavigation } from 'react-router-dom';
import { useRCsContext } from '../../pages/RCs';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

const CreateRCModal = () => {
  const { setShowCreateRCModal } = useRCsContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post('/rc', data);
      toast.success('new royal chapter created successfully');
      setShowCreateRCModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <main className='blured fixed top-0 left-0 w-full h-full p-5 md:p-10 flex items-center justify-center'>
      <div className='relative bg-white w-[90%] m-auto mt-[50px] rounded p-5 shadow-md shadow-slate-300'>
        <h1 className='mb-5 text-xl text-center'>Create Royal Chapter</h1>
        <form onSubmit={submitForm}>
          <FormRow type='text' labelText='name' name='name' />
          <FormRow type='text' labelText='address' name='address' />
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
          onClick={() => setShowCreateRCModal(false)}
        >
          <FaTimes />
        </button>
      </div>
    </main>
  );
};

export default CreateRCModal;
