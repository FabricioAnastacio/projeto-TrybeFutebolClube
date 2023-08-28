import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';

class MatcheModel extends Model<InferAttributes<MatcheModel>,
InferCreationAttributes<MatcheModel>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

MatcheModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'idTeam',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'trybe_teams',
      key: 'idTeam',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'trybe_matches',
  timestamps: false,
  underscored: true,
});

export default MatcheModel;
