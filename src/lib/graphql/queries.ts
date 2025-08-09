import { gql } from '@apollo/client'

// Query to get all players with filtering and pagination
export const GET_PLAYERS = gql`
  query GetPlayers($first: Int, $offset: Int, $filter: playersFilter, $orderBy: [String!]) {
    playersCollection(first: $first, offset: $offset, filter: $filter, orderBy: $orderBy) {
      edges {
        node {
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
          teams {
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
          regions {
            id
            name
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

// Query to get a single player by ID
export const GET_PLAYER = gql`
  query GetPlayer($nodeId: ID!) {
    node(nodeId: $nodeId) {
      ... on players {
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
        teams {
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
        regions {
          id
          name
        }
      }
    }
  }
`

// Query to get all teams with pagination
export const GET_TEAMS = gql`
  query GetTeams($first: Int, $offset: Int, $filter: teamsFilter, $orderBy: [String!]) {
    teamsCollection(first: $first, offset: $offset, filter: $filter, orderBy: $orderBy) {
      edges {
        node {
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
          regions {
            id
            name
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

// Query to get a single team by ID
export const GET_TEAM = gql`
  query GetTeam($nodeId: ID!) {
    node(nodeId: $nodeId) {
      ... on teams {
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
        regions {
          id
          name
        }
      }
    }
  }
`

// Query to get matches with filtering and pagination
export const GET_MATCHES = gql`
  query GetMatches($first: Int, $offset: Int, $filter: matchesFilter, $orderBy: [String!]) {
    matchesCollection(first: $first, offset: $offset, filter: $filter, orderBy: $orderBy) {
      edges {
        node {
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
          events {
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
          teams {
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
          player_statsCollection {
            edges {
              node {
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
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

// Query to get a specific match by ID
export const GET_MATCH = gql`
  query GetMatch($nodeId: ID!) {
    node(nodeId: $nodeId) {
      ... on matches {
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
        events {
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
        teams {
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
        player_statsCollection {
          edges {
            node {
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
      }
    }
  }
`

// Query to get events with filtering and pagination
export const GET_EVENTS = gql`
  query GetEvents($first: Int, $offset: Int, $filter: eventsFilter, $orderBy: [String!]) {
    eventsCollection(first: $first, offset: $offset, filter: $filter, orderBy: $orderBy) {
      edges {
        node {
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
          regions {
            id
            name
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

// Query to get a specific event by ID
export const GET_EVENT = gql`
  query GetEvent($nodeId: ID!) {
    node(nodeId: $nodeId) {
      ... on events {
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
        regions {
          id
          name
        }
      }
    }
  }
`

// Query to get users (profiles) with pagination
export const GET_USERS = gql`
  query GetUsers($first: Int, $offset: Int, $filter: profilesFilter, $orderBy: [String!]) {
    profilesCollection(first: $first, offset: $offset, filter: $filter, orderBy: $orderBy) {
      edges {
        node {
          id
          email
          role
          created_at
          updated_at
          app_role
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

// Query to get a specific user by ID
export const GET_USER = gql`
  query GetUser($nodeId: ID!) {
    node(nodeId: $nodeId) {
      ... on profiles {
        id
        email
        role
        created_at
        updated_at
        app_role
      }
    }
  }
`
