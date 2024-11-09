import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { MultiSelect } from '@/components/multi-select'
import { Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { playerOperations, reservationOperations, type Player, type ReservationList, type Event } from '@/lib/db'
import { Badge } from './ui/badge'
import { PlayerCard } from './player-card'

type EventFormProps = {
  initialEvent?: Event
  onSave: (event: { name: string, players: string[] }) => void
}

export function EventForm({ initialEvent, onSave }: EventFormProps) {
  const [eventName, setEventName] = useState(initialEvent?.name || '')
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>(initialEvent?.players.map(p => p.id) || [])
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([])
  const [reservations, setReservations] = useState<ReservationList[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load players and reservations
  useEffect(() => {
    const loadData = async () => {
      try {
        const [players, reservationLists] = await Promise.all([
          playerOperations.getAllPlayers(),
          reservationOperations.getAllReservationLists()
        ])
        setAvailablePlayers(players)
        setReservations(reservationLists)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
   await onSave({ name: eventName, players: selectedPlayers })
   toast.success('Event saved successfully')
  }

  const handleRemoveAllPlayers = () => {
    setSelectedPlayers([])
  }

  const handleRemovePlayer = (playerId: string) => {
    setSelectedPlayers(prevPlayers => prevPlayers.filter(id => id !== playerId))
  }

  const reservationOptions = reservations.map(reservation => ({
    value: reservation.id,
    label: reservation.name
  }))

  const playerOptions = availablePlayers.map(player => ({
    value: player.id,
    label: player.name
  }))

  if (isLoading) {
    return <div>Loading form data...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="eventName">Event Name</Label>
        <Input
          id="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Add Players from Reservations</Label>
        <MultiSelect
          options={reservationOptions}
          selected={[]}
          onChange={(selectedReservations) => {
            const newPlayers = reservations
              .filter(r => selectedReservations.includes(r.id))
              .flatMap(r => r.players.map(p => p.id))
            setSelectedPlayers(prevPlayers => [...new Set([...prevPlayers, ...newPlayers])])
          }}
          placeholder="Select reservations"
        />
      </div>
      <div className="space-y-2">
        <Label>Add Individual Players</Label>
        <MultiSelect
          options={playerOptions.filter(option => !selectedPlayers.includes(option.value))}
          selected={[]}
          onChange={(newPlayers) => {
            setSelectedPlayers(prevPlayers => [...prevPlayers, ...newPlayers])
          }}
          placeholder="Select players"
        />
      </div>
      <div className="space-y-2">
        <Label>Current Players</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedPlayers.map(playerId => {
            const player = availablePlayers.find(p => p.id === playerId)
            return player ? (
              <Card key={player.id}>
                <CardContent className="flex items-center justify-between p-4">
                <PlayerCard player={player}>
                
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemovePlayer(player.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove {player.name}</span>
                  </Button>
                  </PlayerCard>
                </CardContent>
              </Card>
            ) : null
          })}
        </div>
      </div>
      <div className="flex justify-between">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="outline">Remove All Players</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will remove all players from the event. You can add them back individually or from reservations.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemoveAllPlayers}>Remove All</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button type="submit">Save Event</Button>
      </div>
    </form>
  )
}