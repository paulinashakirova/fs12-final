"use strict";
const { Model } = require("sequelize");
// const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// User.hasOne(models.Contact);
			// define association here
		}
	}
	User.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			trusted_contact: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			trusted_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			profile_photo: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			latitude: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			longitude: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			location_token: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},

		// {
		//   hooks: {
		//     beforeCreate: async (user) => {
		//       if (user.password) {
		//       const saltRounds = await bcrypt.genSaltSync(10);
		//       user.password = bcrypt.hashSync(user.password, saltRounds);
		//     }
		//   },
		//     beforeUpdate: async (user) => {
		//       if (user.password) {
		//       const saltRounds = await bcrypt.genSaltSync(10);
		//       user.password = bcrypt.hashSync(user.password, saltRounds);
		//     }
		//   }
		// },
		//   instanceMethods: {
		//     validPassword: function (password) {
		//       return bcrypt.compareSync(password, this.password);
		//     }
		//   }
		// }),

		// user.prototype.validPassword = async (password, hash) => {
		//   return await bcrypt.compareSync(password, hash)
		// },

		{
			sequelize,
			modelName: "User",
		}
	);

	// {
	//   hooks: {
	//     beforeCreate: async (user) => {
	//       if (user.password) {
	//       const saltRounds = await bcrypt.genSaltSync(10);
	//       user.password = bcrypt.hashSync(user.password, saltRounds);
	//     }
	//   },
	//     beforeUpdate: async (user) => {
	//       if (user.password) {
	//       const saltRounds = await bcrypt.genSaltSync(10);
	//       user.password = bcrypt.hashSync(user.password, saltRounds);
	//     }
	//   }
	// },
	//   instanceMethods: {
	//     validPassword: function (password) {
	//       return bcrypt.compareSync(password, this.password);
	//     }
	//   }
	// }),

	// user.prototype.validPassword = async (password, hash) => {
	//   return await bcrypt.compareSync(password, hash)
	// },

	return User;
};
