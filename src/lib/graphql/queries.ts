import { gql } from 'graphql-request'

// Query to get all players with filtering and pagination
export const GET_PLAYERS = gql`
  query GetPlayers($limit: Int, $offset: Int, $where: players_bool_exp, $order_by: [players_order_by!]) {
    players(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
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
      team {
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
      region {
            id
            name
          }
        }
    players_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

// Query to get a single player by ID
export const GET_PLAYER = gql`
  query GetPlayer($id: uuid!) {
    players_by_pk(id: $id) {
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
      team {
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
      region {
          id
          name
      }
    }
  }
`

// Query to get all teams with pagination
export const GET_TEAMS = gql`
  query GetTeams($limit: Int, $offset: Int, $where: teams_bool_exp, $order_by: [teams_order_by!]) {
    teams(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
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
      region {
            id
            name
          }
        }
    teams_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

// Query to get a single team by ID
export const GET_TEAM = gql`
  query GetTeam($id: uuid!) {
    teams_by_pk(id: $id) {
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
      region {
          id
          name
      }
    }
  }
`

// Query to get matches with filtering and pagination
export const GET_MATCHES = gql`
  query GetMatches($limit: Int, $offset: Int, $where: matches_bool_exp, $order_by: [matches_order_by!]) {
    matches(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
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
      event {
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
      team_a {
        id
        name
        logo_url
      }
      team_b {
            id
            name
            logo_url
          }
      player_stats {
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
    matches_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

// Query to get a specific match by ID
export const GET_MATCH = gql`
  query GetMatch($id: uuid!) {
    matches_by_pk(id: $id) {
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
      event {
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
      team_a {
        id
        name
        logo_url
      }
      team_b {
          id
          name
          logo_url
        }
      player_stats {
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

// Query to get events with filtering and pagination
export const GET_EVENTS = gql`
  query GetEvents($limit: Int, $offset: Int, $where: events_bool_exp, $order_by: [events_order_by!]) {
    events(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
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
      region {
            id
            name
          }
        }
    events_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

// Query to get a specific event by ID
export const GET_EVENT = gql`
  query GetEvent($id: uuid!) {
    events_by_pk(id: $id) {
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
      region {
          id
          name
      }
    }
  }
`

// Query to get users (profiles) with pagination
export const GET_USERS = gql`
  query GetUsers($limit: Int, $offset: Int, $where: profiles_bool_exp, $order_by: [profiles_order_by!]) {
    profiles(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
          id
          email
          role
          created_at
          updated_at
          app_role
        }
    profiles_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

// Query to get a specific user by ID
export const GET_USER = gql`
  query GetUser($id: uuid!) {
    profiles_by_pk(id: $id) {
        id
        email
        role
        created_at
        updated_at
        app_role
    }
  }
`
