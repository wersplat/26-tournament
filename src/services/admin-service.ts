import { createSupabaseClient } from '@/lib/supabase'

/**
 * Admin Service using Supabase directly
 * Handles all write operations and admin-specific functionality
 */
export class AdminService {
  
  /**
   * Create a new match
   */
  async createMatch(matchData: any, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('matches')
      .insert(matchData)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }

  /**
   * Update an existing match
   */
  async updateMatch(id: string, matchData: any, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('matches')
      .update(matchData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Delete a match
   */
  async deleteMatch(id: string, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('matches')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Create player stats
   */
  async createPlayerStats(statsData: any, token?: string | null) {
    // Determine which table to insert into based on context, or use generic stats table
    // Assuming 'player_stats' table exists
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('player_stats')
      .insert(statsData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Update player stats
   */
  async updatePlayerStats(id: string, statsData: any, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('player_stats')
      .update(statsData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Delete player stats
   */
  async deletePlayerStats(id: string, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('player_stats')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Create a new player
   */
  async createPlayer(playerData: any, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('players')
      .insert(playerData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Update an existing player
   */
  async updatePlayer(id: string, playerData: any, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('players')
      .update(playerData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Delete a player
   */
  async deletePlayer(id: string, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('players')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Create a new team
   */
  async createTeam(teamData: any, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('teams')
      .insert(teamData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Update an existing team
   */
  async updateTeam(id: string, teamData: any, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('teams')
      .update(teamData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Delete a team
   */
  async deleteTeam(id: string, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Create a new event
   */
  async createEvent(eventData: any, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Update an existing event
   */
  async updateEvent(id: string, eventData: any, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Delete an event
   */
  async deleteEvent(id: string, token?: string | null) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const adminService = new AdminService()

