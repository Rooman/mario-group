'use client'

import { ReservationList } from '@/components/reservation-list'
import { AddReservationSheet } from '@/components/add-reservation-sheet'
import { withAdminLayout } from '@/components/with-admin-layout'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import type { SaveReservationData } from '@/components/reservation-list'
import { reservationOperations } from '@/lib/db'

function ReservationsPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleAddReservation = async (data: SaveReservationData) => {
    await reservationOperations.addReservationList(data.name, data.players)
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold">Reservations</h2>
      </div>
      <ReservationList refreshTrigger={refreshTrigger} />
    </div>
  )
}

export default withAdminLayout(ReservationsPage) 