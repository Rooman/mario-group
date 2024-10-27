import { useGetPlayers } from '@/features/player/api/useGetPlayers.api';
import { Player } from '@/features/player/player.component';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const PlayersList = () => {
    const { data: players, isFetching } = useGetPlayers();

    return (
        <>
            {isFetching ? (
                <Loading />
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Card Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {players && players.map(player => <Player key={player.id} player={player} />)}
                    </TableBody>
                </Table>
            )}
        </>
    );
};

const Loading = () => {
    return <div>Loading...</div>;
};
