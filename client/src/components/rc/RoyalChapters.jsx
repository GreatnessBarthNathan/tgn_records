import { useRCsContext } from '../../pages/RCs';
import SingleRC from './SingleRC';

const RoyalChapters = () => {
  const { rcs, setShowCreateRCModal } = useRCsContext();
  console.log(rcs);
  return (
    <main>
      <button
        className='bg-indigo-500 text-white p-2 rounded mt-2 capitalize hover:bg-indigo-200'
        onClick={() => setShowCreateRCModal(true)}
      >
        create royal chapter
      </button>
      <h1 className='text-center text-xl my-5'>Royal Chapters</h1>
      <>
        {rcs.map(({ _id, name, address }) => {
          return <SingleRC key={_id} _id={_id} name={name} address={address} />;
        })}
      </>
    </main>
  );
};

export default RoyalChapters;
