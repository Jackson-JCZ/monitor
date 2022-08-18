// stability表模型

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("mg_stability", {
        id: {
            type: Sequelize.UUID,
            notNull: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
        },
        errorType: {
            type: Sequelize.STRING,
        },
        filename: {
            type: Sequelize.STRING,
        },
        kind: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING,
        },
        position: {
            type: Sequelize.STRING,
        },
        selector: {
            type: Sequelize.STRING,
        },
        stack: {
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
        hostName: {
            type: Sequelize.STRING,
        },
        tagName: {
            type: Sequelize.STRING,
        },
        duration: {
            type: Sequelize.STRING,
        },
        eventType: {
            type: Sequelize.STRING,
        },
        params: {
            type: Sequelize.STRING,
        },
        pathname: {
            type: Sequelize.STRING,
        },
        response: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
        },
        eventPoints: {
            type: Sequelize.STRING,
        },
        screen: {
            type: Sequelize.STRING,
        },
        viewPoint: {
            type: Sequelize.STRING,
        },
        componentName: {
            type: Sequelize.STRING,
        },
        hook: {
            type: Sequelize.STRING,
        },
        value: {
            type: Sequelize.STRING,
        }
    }, {
        tableName: 'stability'
    });
};