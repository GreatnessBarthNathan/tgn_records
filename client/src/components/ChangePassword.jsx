/* eslint-disable react/prop-types */
import FormRow from './FormRow';
import { useNavigation } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch('/user/change-password', data);
      toast.success('password changed successfully');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <div className='bg-white w-[90%] m-auto mt-[50px] rounded p-5 shadow-md shadow-slate-300'>
      <h1 className='mb-5 text-xl'>Change Password</h1>
      <form onSubmit={submitForm}>
        <FormRow type='password' labelText='old password' name='oldPassword' />
        <FormRow type='password' labelText='new password' name='newPassword' />
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
    </div>
  );
};

export default ChangePassword;
