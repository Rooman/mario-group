import { useQuery } from '@tanstack/react-query';
import { PLAYERS, supabase } from '@/api/supabaseClient';
import { Player } from '@/model/player';

const getPlayers = async (): Promise<Player[]> => {
    const { data, error } = await supabase.from(PLAYERS).select();
    if (error) {
        console.error('Error fetching players:', error);
        throw new Error('Could not fetch players');
    }
    return data || [];
};

export const useGetPlayers = () => {
    const queryKey = ['players'];

    const { data, isFetching } = useQuery({
        queryKey: queryKey,
        queryFn: getPlayers,
    });

    return { data, isFetching };
};
