import { api } from "~/utils/api";
import { AiOutlinePlus } from 'react-icons/ai';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useAppStore } from '~/store/App_state';
import { getSession } from 'next-auth/react';
import ExerciseModal from '~/components/ExerciseModal';
import { Exercise } from "@prisma/client";

const Home: NextPage = () => {
    const [modalOpen, setmodalOpen] = useAppStore((state) => [state.modal, state.toggleModal])
    const { data, isError, isLoading, error } = api.routine.getAll.useQuery()

    return (
        <>{modalOpen && <ExerciseModal setmodalOpen={setmodalOpen} />}
            <div className='flex flex-col items-center bg-dark-blue w-full min-h-screen'>
                <div className="py-5 flex flex-col items-center w-4/5">
                    {error && <p>Error</p>}
                    {isLoading && <p className='text-slate-50 text-xl py-2 font-semibold'>...Loading</p>}
                    {(data || []).map((item: Exercise) => (
                        <div key={item.id} className='grid grid-cols-1 gap-2 mx-auto h-24 w-full lg:grid-cols-2' >
                            <div className='grid bg-green-600 h-24 w-full rounded-2xl py-4 p-2 items-center'>
                                <p className='text-center text-white font-semibold text-2xl' >{item.}</p>
                            </div>
                        </div>
                   ))}
                            <div className='flex w-full justify-end  py-3 h-20 lg:w-4/5'>
                                <button onClick={() => setmodalOpen()} className="flex items-center justify-center my-4 rounded-full bg-blue-500 h-10 w-10 font-bold text-lg text-white no-underline transition hover:bg-white/20" title='add new exercise'><AiOutlinePlus /></button>
                            </div>
                        </div>
                {/* {!modalOpen && <Exercices />} */ }
            </div>
            </>
            )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context)
            if (!session) {
        return {
                redirect: {
                destination: '/',
            permanent: false,
            }
        }
    }
            return {
                props: {session}
    }
}

            export default Home



