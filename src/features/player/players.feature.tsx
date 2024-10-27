import { AddPlayer } from '@/features/player/add-player.component';
import { PlayersList } from '@/features/player/players-list.component';

export const Players = () => {
    return (
        <div className={'mt-4'}>
            <AddPlayer />
            <PlayersList />
        </div>
    );
};
