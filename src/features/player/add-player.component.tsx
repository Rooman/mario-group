import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import { Player } from '@/model/player';
import { useAddPlayer } from '@/features/player/api/useAddPlayer.api';

export const AddPlayer = () => {
    const [name, setName] = useState('');
    const [cardType, setCardType] = useState('No');
    const { mutate: addPlayer } = useAddPlayer();

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const newPlayer: Player = {
            created_at: new Date().toISOString(),
            name,
            card_type: cardType,
        };
        addPlayer(newPlayer);
    };

    return (
        <Card className="max-w-xl ">
            <CardHeader>
                <CardTitle>Add player</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Input id="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <ToggleGroup type="single" defaultValue={'ms'} onValueChange={value => setCardType(value)}>
                                <ToggleGroupItem value="medicover">MC</ToggleGroupItem>
                                <ToggleGroupItem value="multisport">MS</ToggleGroupItem>
                                <ToggleGroupItem value="classic">CL</ToggleGroupItem>
                                <ToggleGroupItem value="no">No</ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>Save</Button>
            </CardFooter>
        </Card>
    );
};
