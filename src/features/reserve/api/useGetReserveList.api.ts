import { useQuery } from '@tanstack/react-query';
import { RESERVE_LIST, supabase } from '@/api/supabaseClient';

type PlayerName = {
    players: {
        name: string;
    };
};

const getReserveList = async (): Promise<string[]> => {
    const { data, error } = await supabase.from(RESERVE_LIST).select(`players(name)`);
    if (error) {
        console.error('Error fetching reserve list:', error);
        throw new Error('Could not fetch reserve list');
    }

    return (data as PlayerName[]).map(item => item.players.name);
};

export const useGetReserveList = () => {
    const queryKey = ['reserve-list'];

    const { data, isFetching } = useQuery({
        queryKey: queryKey,
        queryFn: getReserveList,
    });

    return { data, isFetching };
};
