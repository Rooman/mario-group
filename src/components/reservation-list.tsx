'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, PlusCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AddReservationSheet } from '@/components/add-reservation-sheet'
import { cn } from '@/lib/utils'
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
import { reservationOperations, type ReservationList } from '@/lib/db'
import { Badge } from './ui/badge'
import { PlayerCard } from './player-card'

export interface SaveReservationData {
  name: string
  players: string[]
}

export interface ReservationListProps {
  refreshTrigger?: number
}

export function ReservationList({ refreshTrigger = 0 }: ReservationListProps) {
  const [reservations, setReservations] = useState<ReservationList[]>([])
  const [activeTab, setActiveTab] = useState<string>('')

  const refreshReservations = async () => {
    try {
      const dbReservations = await reservationOperations.getAllReservationLists()
      setReservations(dbReservations)
      if (!activeTab && dbReservations.length > 0) {
        setActiveTab(dbReservations[0].id)
      }
    } catch (error) {
      console.error('Failed to fetch reservations:', error)
    }
  }

  useEffect(() => {
    refreshReservations()
  }, [refreshTrigger])

  const handleSave = async (data: SaveReservationData) => {
    try {
      console.log('Handling save in ReservationList:', data)
      const newReservation = await reservationOperations.addReservationList(data.name, data.players)
      setActiveTab(newReservation.id)
      await refreshReservations()
    } catch (error) {
      console.error('Failed to save reservation:', error)
    }
  }

  const handleEdit = async (data: SaveReservationData) => {
    try {
      await reservationOperations.updateReservationPlayers(activeTab, data.players)
      await refreshReservations()
    } catch (error) {
      console.error('Failed to update reservation:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!id) return
    try {
      await reservationOperations.removeReservationList(id)
      await refreshReservations()
      if (activeTab === id) {
        const remainingReservation = reservations.find(r => r.id !== id)
        setActiveTab(remainingReservation?.id || '')
      }
    } catch (error) {
      console.error('Failed to delete reservation:', error)
    }
  }

  const handleRemovePlayer = async (reservationId: string, playerId: string) => {
    try {
      const reservation = reservations.find(r => r.id === reservationId)
      if (!reservation) return

      const updatedPlayers = reservation.players.filter(p => p.id !== playerId)
      await reservationOperations.updateReservationPlayers(
        reservationId,
        updatedPlayers.map(p => p.id)
      )
      await refreshReservations()
    } catch (error) {
      console.error('Failed to remove player:', error)
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <TabsList className="h-auto p-1 bg-muted/20">
          {reservations.map((reservation) => (
            <TabsTrigger
              key={reservation.id}
              value={reservation.id}
              className={cn(
                "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                "data-[state=inactive]:bg-muted/50 data-[state=inactive]:text-muted-foreground",
                "px-3 py-2 text-sm font-medium transition-all"
              )}
            >
              {reservation.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex gap-2">
          <AddReservationSheet
            onSave={handleSave}
            trigger={
              <Button size="sm" variant="outline">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New
              </Button>
            }
          />
          {activeTab && (
            <AddReservationSheet
              reservation={reservations.find(r => r.id === activeTab)}
              onSave={handleEdit}
              trigger={
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              }
            />
          )}
          {activeTab && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this reservation.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(activeTab)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
      {reservations.map((reservation) => (
        <TabsContent key={reservation.id} value={reservation.id} className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reservation.players.map((player) => (
              <Card key={player.id}>
                <CardContent className="flex items-center justify-between p-4">
                <PlayerCard player={player}>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove player</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will remove the player from this reservation.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleRemovePlayer(reservation.id, player.id)}>
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  
                  </AlertDialog>
                  </PlayerCard>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}