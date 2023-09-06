export const queryLeaderboardHome = `SELECT
  t.team_name as 'name',
  CAST((SUM(IF(m.home_team_goals > m.away_team_goals, +3, 0)) 
  +SUM(IF(m.home_team_goals = m.away_team_goals, +1, 0))) AS UNSIGNED) as 'totalPoints',
  COUNT(t.team_name) as 'totalGames',
  CAST(SUM(IF(m.home_team_goals > m.away_team_goals, +1, 0)) AS UNSIGNED) as 'totalVictories',
  CAST(SUM(IF(m.home_team_goals = m.away_team_goals, +1, 0)) AS UNSIGNED) as 'totalDraws',
  CAST(SUM(IF(m.home_team_goals < m.away_team_goals, +1, 0)) AS UNSIGNED) as 'totalLosses',
  CAST(SUM(m.home_team_goals) AS UNSIGNED) as 'goalsFavor',
  CAST(SUM(m.away_team_goals) AS UNSIGNED) as 'goalsOwn',
  CAST(SUM(m.home_team_goals) - SUM(m.away_team_goals) AS SIGNED) as 'goalsBalance',
  ROUND(
    (
      (
        SUM(IF(m.home_team_goals > m.away_team_goals, +3, 0))
        +SUM(IF(m.home_team_goals = m.away_team_goals, +1, 0))
      )/(COUNT(t.team_name) * 3)
    ) * 100, 2
  ) as 'efficiency'
FROM teams as t
INNER JOIN matches as m
ON t.id = m.home_team_id
WHERE m.in_progress = 0
GROUP BY t.team_name
ORDER BY
  totalPoints DESC,
  efficiency DESC,
  goalsFavor DESC,
  goalsBalance DESC;`;

export const queryLeaderboardAway = `SELECT
  t.team_name as 'name',
  CAST((SUM(IF(m.home_team_goals < m.away_team_goals, +3, 0)) 
  +SUM(IF(m.home_team_goals = m.away_team_goals, +1, 0))) AS UNSIGNED) as 'totalPoints',
  COUNT(t.team_name) as 'totalGames',
  CAST(SUM(IF(m.home_team_goals < m.away_team_goals, +1, 0)) AS UNSIGNED) as 'totalVictories',
  CAST(SUM(IF(m.home_team_goals = m.away_team_goals, +1, 0)) AS UNSIGNED) as 'totalDraws',
  CAST(SUM(IF(m.home_team_goals > m.away_team_goals, +1, 0)) AS UNSIGNED) as 'totalLosses',
  CAST(SUM(m.away_team_goals) AS UNSIGNED) as 'goalsFavor',
  CAST(SUM(m.home_team_goals) AS UNSIGNED) as 'goalsOwn',
  CAST(SUM(m.away_team_goals) - SUM(m.home_team_goals) AS SIGNED) as 'goalsBalance',
  ROUND(
    (
    (
      SUM(IF(m.home_team_goals < m.away_team_goals, +3, 0))
      +SUM(IF(m.home_team_goals = m.away_team_goals, +1, 0))
    )/(COUNT(t.team_name) * 3)
    ) * 100, 2
  ) as 'efficiency'
FROM teams as t
INNER JOIN matches as m
ON t.id = m.away_team_id
WHERE m.in_progress = 0
GROUP BY t.team_name
ORDER BY
  totalPoints DESC,
  goalsBalance DESC,
  goalsFavor DESC;`;
