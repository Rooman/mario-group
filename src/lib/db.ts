import { createClient } from '@supabase/supabase-js'


const supabaseUrl = ''
const supabaseKey = '';

const options = {
    auth: {
        localStorage: true,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
};

const supabase = createClient(supabaseUrl,
    supabaseKey, options);


export type CardType = 'Medicover' | 'Multisport' | 'Classic' | 'No card'

export const cardTypes: CardType[] = ['Medicover', 'Multisport', 'Classic', 'No card']
// Types
export type Player = {
  id: string
  name: string
  cardType: CardType
  created_at?: string
}

export type ReservationList = {
  id: string
  name: string
  created_at?: string
  players: Player[]
}

export type Event = {
  id: string
  name: string
  created_at?: string
  players: Player[]
}

// Player operations
export const playerOperations = {
  async getAllPlayers(): Promise<Player[]> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  async addPlayer(name: string, cardType: CardType): Promise<Player> {
    const { data, error } = await supabase
      .from('players')
      .insert([{ name, cardType }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async editPlayer(id: string, name: string, cardType: CardType): Promise<Player> {
    const { data, error } = await supabase
      .from('players')
      .update({ name, cardType })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async removePlayer(id: string): Promise<void> {
    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Reservation List operations
export const reservationOperations = {
  async getAllReservationLists(): Promise<ReservationList[]> {
    const { data, error } = await supabase
      .from('reservation_lists')
      .select(`
        id,
        name,
        created_at,
        players:player_reservations(
          players(id, name, created_at, cardType)
        )
      `)
      .order('created_at', { ascending: true })
    
    if (error) throw error

    // Transform the nested data structure
    return data.map(reservation => ({
      id: reservation.id,
      name: reservation.name,
      created_at: reservation.created_at,
      players: reservation.players.map((pr: any) => pr.players)
    }))
  },

  async addReservationList(name: string, playerIds: string[]): Promise<ReservationList> {
    console.log('Adding reservation list:', name, playerIds)
    // Start a transaction
    const { data: reservation, error: reservationError } = await supabase
      .from('reservation_lists')
      .insert([{ name }])
      .select()
      .single()
    
    if (reservationError) throw reservationError

    // Add players to the reservation
    if (playerIds.length > 0) {
      const playerReservations = playerIds.map(playerId => ({
        reservation_id: reservation.id,
        player_id: playerId
      }))

      const { error: playerError } = await supabase
        .from('player_reservations')
        .insert(playerReservations)

      if (playerError) throw playerError
    }

    // Fetch the complete reservation with players
    const { data: completeReservation, error: fetchError } = await supabase
      .from('reservation_lists')
      .select(`
        id,
        name,
        created_at,
        players:player_reservations(
          players(id, name, created_at, cardType)
        )
      `)
      .eq('id', reservation.id)
      .single()

    if (fetchError) throw fetchError

    return {
      id: completeReservation.id,
      name: completeReservation.name,
      created_at: completeReservation.created_at,
      players: completeReservation.players.map((pr: any) => pr.players)
    }
  },

  async removeReservationList(id: string): Promise<void> {
    const { error } = await supabase
      .from('reservation_lists')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async updateReservationPlayers(reservationId: string, playerIds: string[]): Promise<void> {
    // First, remove all existing players
    const { error: deleteError } = await supabase
      .from('player_reservations')
      .delete()
      .eq('reservation_id', reservationId)

    if (deleteError) throw deleteError

    // Then add the new players
    if (playerIds.length > 0) {
      const playerReservations = playerIds.map(playerId => ({
        reservation_id: reservationId,
        player_id: playerId
      }))

      const { error: insertError } = await supabase
        .from('player_reservations')
        .insert(playerReservations)

      if (insertError) throw insertError
    }
  }
}

// Event operations
export const eventOperations = {
  async addEvent(name: string, playerIds: string[]): Promise<Event> {
    // Create event
    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert([{ name }])
      .select()
      .single()
    
    if (eventError) throw eventError

    // Add players to the event
    if (playerIds.length > 0) {
      const playerEvents = playerIds.map(playerId => ({
        event_id: event.id,
        player_id: playerId
      }))

      const { error: playerError } = await supabase
        .from('player_events')
        .insert(playerEvents)

      if (playerError) throw playerError
    }

    // Fetch complete event with players
    const { data: completeEvent, error: fetchError } = await supabase
      .from('events')
      .select(`
        id,
        name,
        created_at,
        players:player_events(
          players(id, name, created_at, cardType)
        )
      `)
      .eq('id', event.id)
      .single()

    if (fetchError) throw fetchError

    return {
      id: completeEvent.id,
      name: completeEvent.name,
      created_at: completeEvent.created_at,
      players: completeEvent.players.map((pe: any) => pe.players)
    }
  },

  async getLastEvent(): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select(`
        id,
        name,
        created_at,
        players:player_events(
          players(id, name, created_at, cardType)
        )
      `)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    if (error) throw error

    return data ? {
      id: data.id,
      name: data.name,
      created_at: data.created_at,
      players: data.players.map((pe: any) => pe.players)
    } : null
  },

  async updateEvent(eventId: string, name: string, playerIds: string[]): Promise<void> {
    // Update event name
    const { error: updateError } = await supabase
      .from('events')
      .update({ name })
      .eq('id', eventId)

    if (updateError) throw updateError

    // Remove existing players
    const { error: deleteError } = await supabase
      .from('player_events')
      .delete()
      .eq('event_id', eventId)

    if (deleteError) throw deleteError

    // Add new players
    if (playerIds.length > 0) {
      const playerEvents = playerIds.map(playerId => ({
        event_id: eventId,
        player_id: playerId
      }))

      const { error: insertError } = await supabase
        .from('player_events')
        .insert(playerEvents)

      if (insertError) throw insertError
    }
  }
} 