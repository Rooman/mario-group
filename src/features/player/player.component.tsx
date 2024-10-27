import { useAddPlayerToReserveList } from '@/features/reserve/api/useAddPlayerToReserveList.api';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Player as PlayerType } from '@/model/player';

export const Player = ({ player }: { player: PlayerType }) => {
    const {mutate: addPlayerToReserveList} = useAddPlayerToReserveList();

    const handleAddToReserveList = () => {
        if (player.id !== undefined) {
            addPlayerToReserveList(player.id);
        } else {
            console.error("Player ID is undefined");
        }
    }
    return (
        <TableRow key={player.id} onClick={handleAddToReserveList}>
            <TableCell>{player.name}</TableCell>
            <TableCell>{player.card_type}</TableCell>
        </TableRow>
    );
};
