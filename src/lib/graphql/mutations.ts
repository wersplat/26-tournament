import { gql } from 'graphql-request'

// Mutation to insert a new match
export const CREATE_MATCH = gql`
  mutation CreateMatch($input: [matches_insert_input!]!) {
    insert_matches(objects: $input) {
      returning {
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
  mutation UpdateMatch($id: uuid!, $set: matches_set_input!) {
    update_matches_by_pk(pk_columns: {id: $id}, _set: $set) {
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
`

// Mutation to delete a match
export const DELETE_MATCH = gql`
  mutation DeleteMatch($id: uuid!) {
    delete_matches_by_pk(id: $id) {
      id
    }
  }
`

// Mutation to insert player match statistics
export const CREATE_PLAYER_STATS = gql`
  mutation CreatePlayerStats($input: [player_stats_insert_input!]!) {
    insert_player_stats(objects: $input) {
      returning {
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
  mutation UpdatePlayerStats($id: uuid!, $set: player_stats_set_input!) {
    update_player_stats_by_pk(pk_columns: {id: $id}, _set: $set) {
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
`

// Mutation to delete player match statistics
export const DELETE_PLAYER_STATS = gql`
  mutation DeletePlayerStats($id: uuid!) {
    delete_player_stats_by_pk(id: $id) {
      id
    }
  }
`

// Mutation to insert a new player
export const CREATE_PLAYER = gql`
  mutation CreatePlayer($input: [players_insert_input!]!) {
    insert_players(objects: $input) {
      returning {
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
  mutation UpdatePlayer($id: uuid!, $set: players_set_input!) {
    update_players_by_pk(pk_columns: {id: $id}, _set: $set) {
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
`

// Mutation to delete a player
export const DELETE_PLAYER = gql`
  mutation DeletePlayer($id: uuid!) {
    delete_players_by_pk(id: $id) {
      id
    }
  }
`

// Mutation to insert a new team
export const CREATE_TEAM = gql`
  mutation CreateTeam($input: [teams_insert_input!]!) {
    insert_teams(objects: $input) {
      returning {
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
  mutation UpdateTeam($id: uuid!, $set: teams_set_input!) {
    update_teams_by_pk(pk_columns: {id: $id}, _set: $set) {
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
`

// Mutation to delete a team
export const DELETE_TEAM = gql`
  mutation DeleteTeam($id: uuid!) {
    delete_teams_by_pk(id: $id) {
      id
    }
  }
`

// Mutation to insert a new event
export const CREATE_EVENT = gql`
  mutation CreateEvent($input: [events_insert_input!]!) {
    insert_events(objects: $input) {
      returning {
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
  mutation UpdateEvent($id: uuid!, $set: events_set_input!) {
    update_events_by_pk(pk_columns: {id: $id}, _set: $set) {
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
`

// Mutation to delete an event
export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: uuid!) {
    delete_events_by_pk(id: $id) {
      id
    }
  }
`
