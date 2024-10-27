import { RESERVE_LIST, supabase } from '@/api/supabaseClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddPlayerToReserveList = () => {
    const queryClient = useQueryClient();
    const addPlayerToReserveList = async (playerId: number) => {
        const { error } = await supabase.from(RESERVE_LIST).insert([{ player_id: playerId }]);
        if (error) {
            console.error('Error adding player to reserver list:', error);
            throw new Error('Could not add player to reserver list');
        }
    };

    return useMutation({
        mutationFn: addPlayerToReserveList,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reserve-list'] });
        },
    });
};
