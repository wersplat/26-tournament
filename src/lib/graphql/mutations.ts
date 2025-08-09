import { gql } from '@apollo/client'

// Mutation to insert a new match
export const CREATE_MATCH = gql`
  mutation CreateMatch($input: matchesInsertInput!) {
    insertIntomatchesCollection(objects: [$input]) {
      records {
        id
        event_id
        team_a_id
        team_b_id
        winner_id
        score_a
        score_b
        played_at
        boxscore_url
        team_a_name
        stage
        game_number
        team_b_name
        winner_name
      }
    }
  }
`

// Mutation to update an existing match
export const UPDATE_MATCH = gql`
  mutation UpdateMatch($filter: matchesFilter!, $set: matchesUpdateInput!) {
    updatematchesCollection(filter: $filter, set: $set) {
      records {
        id
        event_id
        team_a_id
        team_b_id
        winner_id
        score_a
        score_b
        played_at
        boxscore_url
        team_a_name
        stage
        game_number
        team_b_name
        winner_name
      }
    }
  }
`

// Mutation to delete a match
export const DELETE_MATCH = gql`
  mutation DeleteMatch($filter: matchesFilter!, $atMost: Int!) {
    deleteFrommatchesCollection(filter: $filter, atMost: $atMost) {
      affectedCount
    }
  }
`

// Mutation to insert player match statistics
export const CREATE_PLAYER_STATS = gql`
  mutation CreatePlayerStats($input: player_statsInsertInput!) {
    insertIntoplayer_statsCollection(objects: [$input]) {
      records {
        id
        player_id
        match_id
        team_id
        points
        assists
        rebounds
        steals
        blocks
        turnovers
        fouls
        ps
        created_at
        fgm
        fga
        three_points_made
        three_points_attempted
        ftm
        fta
        plus_minus
        player_name
        updated_at
      }
    }
  }
`

// Mutation to update player match statistics
export const UPDATE_PLAYER_STATS = gql`
  mutation UpdatePlayerStats($filter: player_statsFilter!, $set: player_statsUpdateInput!) {
    updateplayer_statsCollection(filter: $filter, set: $set) {
      records {
        id
        player_id
        match_id
        team_id
        points
        assists
        rebounds
        steals
        blocks
        turnovers
        fouls
        ps
        created_at
        fgm
        fga
        three_points_made
        three_points_attempted
        ftm
        fta
        plus_minus
        player_name
        updated_at
      }
    }
  }
`

// Mutation to delete player match statistics
export const DELETE_PLAYER_STATS = gql`
  mutation DeletePlayerStats($filter: player_statsFilter!, $atMost: Int!) {
    deleteFromplayer_statsCollection(filter: $filter, atMost: $atMost) {
      affectedCount
    }
  }
`

// Mutation to insert a new player
export const CREATE_PLAYER = gql`
  mutation CreatePlayer($input: playersInsertInput!) {
    insertIntoplayersCollection(objects: [$input]) {
      records {
        id
        gamertag
        position
        region_id
        current_team_id
        performance_score
        player_rp
        player_rank_score
        salary_tier
        monthly_value
        created_at
        is_rookie
        discord_id
        twitter_id
        alternate_gamertag
      }
    }
  }
`

// Mutation to update an existing player
export const UPDATE_PLAYER = gql`
  mutation UpdatePlayer($filter: playersFilter!, $set: playersUpdateInput!) {
    updateplayersCollection(filter: $filter, set: $set) {
      records {
        id
        gamertag
        position
        region_id
        current_team_id
        performance_score
        player_rp
        player_rank_score
        salary_tier
        monthly_value
        created_at
        is_rookie
        discord_id
        twitter_id
        alternate_gamertag
      }
    }
  }
`

// Mutation to delete a player
export const DELETE_PLAYER = gql`
  mutation DeletePlayer($filter: playersFilter!, $atMost: Int!) {
    deleteFromplayersCollection(filter: $filter, atMost: $atMost) {
      affectedCount
    }
  }
`

// Mutation to insert a new team
export const CREATE_TEAM = gql`
  mutation CreateTeam($input: teamsInsertInput!) {
    insertIntoteamsCollection(objects: [$input]) {
      records {
        id
        name
        logo_url
        region_id
        current_rp
        elo_rating
        global_rank
        leaderboard_tier
        created_at
        player_rank_score
        money_won
      }
    }
  }
`

// Mutation to update an existing team
export const UPDATE_TEAM = gql`
  mutation UpdateTeam($filter: teamsFilter!, $set: teamsUpdateInput!) {
    updateteamsCollection(filter: $filter, set: $set) {
      records {
        id
        name
        logo_url
        region_id
        current_rp
        elo_rating
        global_rank
        leaderboard_tier
        created_at
        player_rank_score
        money_won
      }
    }
  }
`

// Mutation to delete a team
export const DELETE_TEAM = gql`
  mutation DeleteTeam($filter: teamsFilter!, $atMost: Int!) {
    deleteFromteamsCollection(filter: $filter, atMost: $atMost) {
      affectedCount
    }
  }
`

// Mutation to insert a new event
export const CREATE_EVENT = gql`
  mutation CreateEvent($input: eventsInsertInput!) {
    insertIntoeventsCollection(objects: [$input]) {
      records {
        id
        name
        type
        is_global
        region_id
        start_date
        end_date
        max_rp
        decay_days
        processed
        description
        banner_url
        rules_url
        processed_at
        status
        tier
        season_number
        prize_pool
      }
    }
  }
`

// Mutation to update an existing event
export const UPDATE_EVENT = gql`
  mutation UpdateEvent($filter: eventsFilter!, $set: eventsUpdateInput!) {
    updateeventsCollection(filter: $filter, set: $set) {
      records {
        id
        name
        type
        is_global
        region_id
        start_date
        end_date
        max_rp
        decay_days
        processed
        description
        banner_url
        rules_url
        processed_at
        status
        tier
        season_number
        prize_pool
      }
    }
  }
`

// Mutation to delete an event
export const DELETE_EVENT = gql`
  mutation DeleteEvent($filter: eventsFilter!, $atMost: Int!) {
    deleteFromeventsCollection(filter: $filter, atMost: $atMost) {
      affectedCount
    }
  }
`
