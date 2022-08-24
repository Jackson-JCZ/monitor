// experience表模型

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("mg_experience", {
        id: {
            type: Sequelize.UUID,
            notNull: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
        },
        connectionTime: {
            type: Sequelize.STRING,
        },
        dnsTime: {
            type: Sequelize.STRING,
        },
        domContentLoaderTime: {
            type: Sequelize.STRING,
        },
        domReadyTime: {
            type: Sequelize.STRING,
        },
        kind: {
            type: Sequelize.STRING,
        },
        loadTime: {
            type: Sequelize.STRING,
        },
        parseDOMTime: {
            type: Sequelize.STRING,
        },
        responseTime: {
            type: Sequelize.STRING,
        },
        timeToInteractive: {
            type: Sequelize.STRING,
        },
        timestamp: {
            type: Sequelize.DATE,
        },
        title: {
            type: Sequelize.STRING,
        },
        ttfbTime: {
            type: Sequelize.STRING,
        },
        type: {
            type: Sequelize.STRING,
        },
        url: {
            type: Sequelize.STRING,
        },
        userAgent: {
            type: Sequelize.STRING,
        },
        firstContentfulPaint: {
            type: Sequelize.STRING,
        },
        firstPaint: {
            type: Sequelize.STRING,
        },
        largestContentfulPaint: {
            type: Sequelize.STRING,
        },
        duration: {
            type: Sequelize.STRING,
        },
        inputDelay: {
            type: Sequelize.STRING,
        },
        selector: {
            type: Sequelize.STRING,
        },
        startTime: {
            type: Sequelize.STRING,
        },
        ip:{
            type: Sequelize.STRING,
        }
    }, {
        tableName: 'experience',
        timestamps: false
    });
};