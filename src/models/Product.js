const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const Category = require('./Category');

const Product = sequelize.define('Product', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    ImageUrl: {
        type: DataTypes.TEXT,
        allowNull: true
    }

}, {
    tableName: 'products',
    timestamps: true
});


// Relaciones
Category.hasMany(Product, {
    foreignKey: 'CategoryId'
});

Product.belongsTo(Category, {
    foreignKey: 'CategoryId'
});

module.exports = Product;