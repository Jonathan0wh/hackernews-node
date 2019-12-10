var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var GraphQLServer = require('graphql-yoga').GraphQLServer;
var links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
    }
];
var idCount = links.length;
var resolvers = {
    Query: {
        info: function () { return "This is the API of a Hackernews Clone"; },
        feed: function () { return links; },
        link: function (parent, args) {
            return links.find(function (element) { return element.id === args.id; });
        }
    },
    Mutation: {
        post: function (parent, args) {
            var link = {
                id: "link-" + idCount++,
                description: args.description,
                url: args.url
            };
            links.push(link);
            return link;
        },
        updateLink: function (parent, args) {
            var linkIndex = links.findIndex(function (element) { return element.id === args.id; });
            links[linkIndex] = __assign(__assign({}, links[linkIndex]), { url: args.url, description: args.description });
            return links[linkIndex];
        },
        deleteLink: function (parent, args) {
            var linkIndex = links.findIndex(function (element) { return element.id === args.id; });
            var removedLink = links.splice(linkIndex, 1)[0];
            return removedLink;
        }
    }
};
var server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: resolvers
});
server.start(function () {
    return console.log("Server is running on http://localhost:4000");
});
