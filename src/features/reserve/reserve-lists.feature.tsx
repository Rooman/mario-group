import { useGetReserveList } from '@/features/reserve/api/useGetReserveList.api';

export const ReserveLists = () => {
    const { data, isFetching } = useGetReserveList();

    if (data) {
        console.log('aaaaa', data);
    }

    return (
        <>
            {isFetching ? (
                <div>Loading...</div>
            ) : (
                <div className="flex flex-col items-center gap-y-2 mt-3">
                    <div className="text-2xl font-medium">Reserve Lists</div>
                    <div className='flex flex-col items-center'>
                        {data &&
                            data.map((player, index) => {
                                return <div key={index} className='text-lg'>{player}</div>;
                            })}
                    </div>
                </div>
            )}
        </>
    );
};
