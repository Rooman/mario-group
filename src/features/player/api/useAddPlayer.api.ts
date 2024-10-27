import { Player } from '@/model/player';
import { PLAYERS, supabase } from '@/api/supabaseClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddPlayer = () => {
    const queryClient = useQueryClient();
    const addPlayer = async (player: Player) => {
        const { error } = await supabase.from(PLAYERS).insert(player);
        if (error) {
            console.error('Error adding player:', error);
            throw new Error('Could not add player');
        }
    };

    return useMutation({
        mutationFn: addPlayer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
        },
    });
};
