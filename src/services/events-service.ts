import { apiClient } from './api-client';
import { 
  Event, 
  EventStatus, 
  EventTier,
  Match,
  UpcomingMatch,
  EventGroup,
  GroupStandings,
  PaginatedResponse,
  ApiResponse 
} from '@/types/schema';

/**
 * Service for event-related API calls
 */
export const eventsService = {
  /**
   * List all events with optional filtering
   */
  listEvents: (status?: EventStatus, tier?: EventTier) => {
    let endpoint = '/v1/events';
    const params = [];
    
    if (status) {
      params.push(`status=${status}`);
    }
    
    if (tier) {
      params.push(`tier=${tier}`);
    }
    
    if (params.length > 0) {
      endpoint += `?${params.join('&')}`;
    }
    
    return apiClient.publicGet<PaginatedResponse<Event>>(endpoint);
  },

  /**
   * List open events (upcoming and in-progress)
   */
  listOpenEvents: () => {
    return apiClient.publicGet<Event[]>('/v1/events/open');
  },

  /**
   * Get event details
   */
  getEvent: (eventId: string) => {
    return apiClient.publicGet<Event>(`/v1/events/${eventId}`);
  },

  /**
   * Get event groups
   */
  getEventGroups: (eventId: string) => {
    return apiClient.publicGet<EventGroup[]>(`/v1/events/${eventId}/groups`);
  },

  /**
   * Get group standings
   */
  getGroupStandings: (groupId: string) => {
    return apiClient.publicGet<GroupStandings[]>(`/v1/event-groups/${groupId}/standings`);
  },

  /**
   * Get event matches
   */
  getEventMatches: (eventId: string) => {
    return apiClient.publicGet<Match[]>(`/v1/events/${eventId}/matches`);
  },

  /**
   * Get upcoming matches for an event
   */
  getUpcomingMatches: (eventId: string) => {
    return apiClient.publicGet<UpcomingMatch[]>(`/v1/events/${eventId}/upcoming-matches`);
  },

  /**
   * Get event results
   */
  getEventResults: (eventId: string) => {
    return apiClient.publicGet<any[]>(`/v1/events/${eventId}/results`);
  },

  /**
   * Create a new event (admin only)
   */
  createEvent: (eventData: Partial<Event>) => {
    return apiClient.adminPost<Event>('/v1/admin/events', eventData);
  },

  /**
   * Update an event (admin only)
   */
  updateEvent: (eventId: string, eventData: Partial<Event>) => {
    return apiClient.adminPut<Event>(`/v1/admin/events/${eventId}`, eventData);
  },

  /**
   * Delete an event (admin only)
   */
  deleteEvent: (eventId: string) => {
    return apiClient.adminDelete<void>(`/v1/admin/events/${eventId}`);
  }
};
