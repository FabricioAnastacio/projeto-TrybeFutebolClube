const matcheMockUpdateStatus = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
}

const matcheMockCreate = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: true,
}

const matcheMockUpdateGoals = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 10,
  awayTeamId: 8,
  awayTeamGoals: 5,
  inProgress: false,
  homeTeam: {
    teamName: 'São Paulo'
  },
  awayTeam: {
    teamName: 'Grêmio'
  }
}

const matchesMockFindAll = [
  {
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Grêmio'
    }
  },
  {
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      teamName: 'Internacional'
    },
    awayTeam: {
      teamName: 'Santos'
    }
  },
  {
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Corinthians'
    },
    awayTeam: {
      teamName: 'Napoli-SC'
    }
  },
  {
    homeTeamId: 3,
    homeTeamGoals: 3,
    awayTeamId: 15,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'Barcelona'
    },
    awayTeam: {
      teamName: 'RealMadri'
    }
  },
]

const matchesMockFindAllFalses = [
  {
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Grêmio'
    }
  },
  {
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Corinthians'
    },
    awayTeam: {
      teamName: 'Napoli-SC'
    }
  },
]

const matchesMockFindAllTrues = [
  {
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      teamName: 'Internacional'
    },
    awayTeam: {
      teamName: 'Santos'
    }
  },
  {
    homeTeamId: 3,
    homeTeamGoals: 3,
    awayTeamId: 15,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'Barcelona'
    },
    awayTeam: {
      teamName: 'RealMadri'
    }
  },
]

export default {
  matchesMockFindAll,
  matchesMockFindAllFalses,
  matchesMockFindAllTrues,
  matcheMockUpdateStatus,
  matcheMockUpdateGoals,
  matcheMockCreate,
}