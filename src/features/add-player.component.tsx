import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {Button} from "@/components/ui/button.tsx";

export const AddPlayer = () => {
    return (<Card className="max-w-xl ">
        <CardHeader>
            <CardTitle>Add player</CardTitle>
        </CardHeader>
        <CardContent>
            <form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Input id="name" placeholder="Name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <ToggleGroup type="single" defaultValue={'ms'}>
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
            <Button>Save</Button>
        </CardFooter>
    </Card>)
}