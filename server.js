const express = require('express')
const fs = require('fs')
const { graphqlHTTP } = require('express-graphql')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} = require('graphql')
const app = express()

const getData = () => {
    const file = fs.readFileSync('./data/data.json', 'utf8')
    return JSON.parse(file)
}

const data = getData()
const apps = data.apps
const stages = data.stages
const events = data.events

const StageType = new GraphQLObjectType({
    name: 'Stage',
    description: 'This represents a stage',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        events: {
            type: new GraphQLList(EventType),
            resolve: (parent, args) => {
                return events.filter(event => event.stageId === parent.id)
            }
        },
    })
})

const EventType = new GraphQLObjectType({
    name: 'Event',
    description: 'This represents an event',
    fields: () => ({
        id: { type: GraphQLString },
        appId: { type: GraphQLString },
        stageId: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        startsAt: { type: GraphQLInt },
        endsAt: { type: GraphQLInt },
        stage: {
            type: StageType,
            resolve: (parent, args) => {
                return stages.find(stage => stage.id === parent.stageId)
            }
        }
    })
})

const AppType = new GraphQLObjectType({
    name: 'App',
    description: 'This represents an app',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        events: {
            type: new GraphQLList(EventType),
            resolve: (parent, args) => {
                return events.filter(event => event.appId === parent.id)
            }
        },
        stages: {
            type: new GraphQLList(StageType),
            resolve: (parent, args) => {
                let filtered = []
                events.forEach(event => {
                    if(event.appId === parent.id) {
                        stages.forEach(stage => {
                            if(stage.id === event.stageId & filtered.includes(stage) === false) {
                                filtered.push(stage)
                            }
                        })
                    }
                })
                return filtered
            }
        }
    })
})

const root = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        apps: {
            type: new GraphQLList(AppType),
            description: 'List of all apps',
            resolve: () => apps
        },
        app: {
            type: AppType,
            description: 'A single app',
            args: {
                id: { type: GraphQLString }
            },
            resolve: (parent, args) => apps.find(app => app.id === args.id)
        },
        stages: {
            type: new GraphQLList(StageType),
            description: 'List of all stages',
            resolve: () => stages
        },
        stage: {
            type: StageType,
            description: 'A single stage',
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                if(args.id) {
                    return stages.find(stage => stage.id === args.id)
                }
                if(args.name) {
                    return stages.find(stage => stage.name === args.name)
                }
            }
        },
        events: {
            type: new GraphQLList(EventType),
            description: 'List of all events',
            args: {
                startsAt: { type: GraphQLInt },
                endsAt: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                if(args.startsAt & args.endsAt) {
                    return events.filter(event => event.startsAt >= args.startsAt & event.endsAt <= args.endsAt)
                } else {
                    return events
                }
            }
        },
        event: {
            type: EventType,
            description: 'A single event',
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                if(args.id) {
                    return events.find(event => event.id === args.id)
                }
                if(args.name) {
                    return events.find(event => event.name === args.name)
                }
            }
        },
    })
})

const schema = new GraphQLSchema({
    query: root,
})

app.use('/graphql', graphqlHTTP({
    rootValue: root,
    schema: schema,
    graphiql: true
}))
app.listen(5000, () => console.log('Server Running'))