import { Inter } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { ReactNode, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch"

import { ReservationList } from '@/components/reservation-list';
import { Toaster } from '@/components/ui/sonner';
import { Card, CardContent } from '@/components/ui/card';
import { CardType, eventOperations, type Event } from '@/lib/db';
import { Calculator, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { withFameAuth } from '@/components/with-fame-auth'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Player Payment Status',
    description: 'Track player payments',
}

const cardTypeOrder: CardType[] = ['Medicover', 'Multisport', 'Classic', 'No card']

function FamePage({
    children,
}: {
    children: ReactNode
}) {
    const [isLoading, setIsLoading] = useState(true)
    const [event, setEvent] = useState<Event | null>(null)
    const [paymentStatus, setPaymentStatus] = useState<Record<string, boolean>>({})

    useEffect(() => {
        const loadInitialEvent = async () => {
            try {
                const lastEvent = await eventOperations.getLastEvent()
                setEvent(lastEvent)
                
                if (lastEvent) {
                    // Load payment status from database
                    const payments = await eventOperations.getEventPayments(lastEvent.id)
                    setPaymentStatus(payments)
                }
            } catch (error) {
                console.error('Failed to load event:', error)
            } finally {
                setIsLoading(false)
            }
        }
        loadInitialEvent()
    }, [])

    const handlePaymentChange = async (playerId: string, paid: boolean) => {
        if (!event) return

        try {
            await eventOperations.updatePlayerPayment(event.id, playerId, paid)
            setPaymentStatus(prev => ({
                ...prev,
                [playerId]: paid
            }))
        } catch (error) {
            console.error('Failed to update payment status:', error)
            // Optionally add error handling UI here
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!event) {
        return <div>No event found</div>
    }

    function getInitials(name: string) {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
    }

    function getCardTypeColor(cardType: CardType) {
        switch (cardType) {
            case 'Medicover':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900'
            case 'Multisport':
                return 'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900'
            case 'Classic':
                return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900'
            case 'No card':
                return 'bg-orange-100 text-slate-800 hover:bg-orange-200 hover:text-orange-900'
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900'
        }
    }

    const cardTypeCounts = event.players.reduce((acc, player) => {
        acc[player.cardType] = (acc[player.cardType] || 0) + 1
        return acc
    }, {} as Record<CardType, number>)

    const sortedCardTypeCounts = cardTypeOrder.map(type => ({
        type,
        count: cardTypeCounts[type] || 0
    }))

    const sortedPlayers = [...event.players].sort((a, b) =>
        cardTypeOrder.indexOf(a.cardType) - cardTypeOrder.indexOf(b.cardType)
    )

    const mc = cardTypeCounts["Medicover"] || 0
    const ms = cardTypeCounts["Multisport"] || 0
    const msc = cardTypeCounts["Classic"] || 0
    const nc = cardTypeCounts["No card"] || 0

    return (
        <div className="space-y-8 container mx-auto p-4">
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#2E2A5D] to-[#7B3C7D] text-white rounded-lg p-6 shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-0">{event.name} - Payment Status</h1>
                        <Button
                            asChild
                            className="bg-white hidden w-full text-[#2E2A5D] hover:bg-gray-100 transition-colors duration-200 sm:w-fit sm:flex"
                        >
                            <a 
                            target='_blank'
                            href={`https://rooman.github.io/ffp-2?mc=${mc}&ms=${ms}&msc=${msc}&nc=${nc}`}>
                                <Calculator className="w-4 h-4 mr-2" />
                                Calculate
                            </a>
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <div className="flex items-center ">
                            <Users className="w-5 h-5 mr-2" />
                            <span>{event.players.length} Players</span>
                        </div>
                        {sortedCardTypeCounts.map(({ type, count }) => (
                            <Badge key={type} className={`${getCardTypeColor(type)} text-xs`}>
                                {type}: {count}
                            </Badge>
                        ))}
                    </div>

                    <Button
                        asChild
                        className="mt-4 bg-white w-full text-[#2E2A5D] hover:bg-gray-100 transition-colors duration-200 sm:hidden"
                    >
                        <a 
                        target='_blank'
                        href={`https://rooman.github.io/ffp-2?mc=${mc}&ms=${ms}&msc=${msc}&nc=${nc}`}>
                            <Calculator className="w-4 h-4 mr-2" />
                            Calculate
                        </a>
                    </Button>
                </div>
            </div>
            <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(sortedPlayers || []).map(player => {
                        return player ? (
                            <Card
                                key={player.id}
                                className="transition-colors duration-200"
                            >
                                <CardContent className="flex items-center p-4">
                                    <Avatar className="h-10 w-10 mr-4">
                                        <AvatarFallback className="bg-[#7B3C7D] text-white">
                                            {getInitials(player.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col flex-grow">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#2E2A5D] font-medium">{player.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className={`font-medium ${paymentStatus[player.id] ? 'text-green-600' : 'text-orange-400'}`}>
                                                    {paymentStatus[player.id] ? 'Paid' : 'Unpaid'}
                                                </span>
                                                <Switch
                                                    checked={paymentStatus[player.id]}
                                                    onCheckedChange={(checked) => handlePaymentChange(player.id, checked)}
                                                />
                                            </div>
                                        </div>
                                        <Badge className={`mt-1 ${getCardTypeColor(player.cardType)} `}>
                                            {player.cardType}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : null
                    })}
                </div>
            </div>
        </div>
    )
}

// Export with auth wrapper
export default withFameAuth(FamePage) 