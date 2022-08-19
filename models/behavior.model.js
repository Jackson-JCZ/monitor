// stability表模型

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("mg_behavior", {
        id: {
            type: Sequelize.UUID,
            notNull: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
        },
        effectiveType: {
            type: Sequelize.STRING,
        },
        entryType: {
            type: Sequelize.STRING,
        },
        hostName: {
            type: Sequelize.STRING,
        },
        kind: {
            type: Sequelize.STRING,
            allowNull: false
        },
        markUv: {
            type: Sequelize.STRING,
        },
        pathname: {
            type: Sequelize.STRING,
        },
        referrer: {
            type: Sequelize.STRING,
        },
        rtt: {
            type: Sequelize.STRING,
        },
        screen: {
            type: Sequelize.STRING,
        },
        timestamp: {
            type: Sequelize.DATE,
        },
        title: {
            type: Sequelize.STRING,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        url: {
            type: Sequelize.STRING,
        },
        userAgent: {
            type: Sequelize.STRING,
        },
        duration: {
            type: Sequelize.STRING,
        },
        ip:{
            type: Sequelize.STRING,
        }
    }, {
        tableName: 'behavior',
        timestamps: false
    });
};