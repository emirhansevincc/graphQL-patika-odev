const { ApolloServer, gql } = require('apollo-server');

const {
    ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core');


const { users, posts, comments } = require("./data")


const typeDefs = gql`

  type DeleteAll {
    deletedItems: Int
  }


  type User {
    id: ID!
    fullName: String!
    age: Int!
    posts: [Post!]!
    comments: [Comment!]!
  }
  input createUserInput {
    fullName: String!
    age: Int
  }
  input updateUserInput {
    fullName: String
    age: Int
  }


  type Post {
    id: ID!
    title: String!
    user_id: ID!
    user: User!
    comments: [Comment!]!
  }
  input createPostInput {
    title: String!
    user_id: ID!
  }
  input updatePostInput {
    title: String
    user_id: ID!
  }


  type Comment {
    id: ID!
    text: String!
    post_id: ID!
    user: User!
    post: [Post!]!
  }
  input createCommentInput {
    text: String!
    post_id: ID!
    user_id: ID!
  }
  input updateCommentInput {
    text: String!
    post_id: ID!
  }


  type Query {

    users: [User!]! 
    user(id: ID!): User!

    posts: [Post!]! 
    post(id: ID!): Post!

    comments: [Comment!]! 
    comment(id: ID!): Comment
  }

  ########## Mutation ##########

  type Mutation {

    createUser( data: createUserInput ): User!
    updateUser(id: ID!, data: updateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: DeleteAll

    createPost( data: createPostInput ): Post!
    updatePost(id: ID!, data: updatePostInput!): Post!
    deletePost(id: ID!): Post
    deleteAllPosts: DeleteAll

    createComment( data: createCommentInput ): Comment!
    updateComment( id: ID!, data: updateCommentInput ): Comment!
    deleteComment(id: ID!): Comment
    deleteAllComments: DeleteAll

  }

`;

const resolvers = {

    Mutation: {
        createUser: (parent, { data }) => {
            const user = {
                id: 3,
                ...data
            }
            users.push(user)
            return user
        },
        updateUser: (parent, { id, data }) => {
            const findUserIndex = users.findIndex((user) => user.id === id)

            if( findUserIndex < 0 ){
                throw new Error("User not found")
            }

            users[findUserIndex] = {
                ...users[findUserIndex],
                ...data
            }
            return users[findUserIndex]
        },
        deleteUser: (parent, { id }) => {
            const userIndex = users.findIndex((user) => user.id === id)

            if( userIndex < 0 ){
                throw new Error("User not found")
            }

            users.splice(userIndex, 1)
            return users[userIndex]
        },
        deleteAllUsers: () => {
            const userListLenght = users.length
            users.splice(0, userListLenght)
            return { deletedItems: userListLenght }
        },

        createPost: (parent, { data }) => {
            const post = {
                id: "9",
                ...data
            }
            posts.push(post)
            return post
        },
        updatePost: (parent, { id, data }) => {
            const findPostIndex = posts.findIndex((post) => post.id === id)

            if( findPostIndex < 0 ){
                throw new Error("Post not found")
            }

            posts[findPostIndex] = {
                ...posts[findPostIndex],
                ...data
            }
            return posts[findPostIndex]
        },
        deletePost: (parent, { id }) => {
            const postIndex = posts.findIndex((post) => post.id === id)

            if( postIndex < 0 ){
                throw new Error("Post not found")
            }

            posts.splice(postIndex, 1)
            return posts[postIndex]
        },
        deleteAllPosts: () => {
            const postListLenght = posts.length
            posts.splice(0, postListLenght)
            return { deletedItems: postListLenght }
        },

        createComment: (parent, { data }) => {
            const comment = {
                id: 8,
                ...data
            }
            comments.push(comment)
            return comment
        },
        updateComment: (parent, { id, data }) => {
            const findComIndex = comments.findIndex((com) => com.id === id)

            if( findComIndex < 0 ){
                throw new Error("Comment not found")
            }

            comments[findComIndex] = {
                ...comments[findComIndex],
                ...data
            }
            return comments[findComIndex]
        },
        deleteComment: (parent, { id }) => {
            const comIndex = comments.findIndex((com) => com.id === id)

            if( comIndex < 0 ){
                throw new Error("Comment not found")
            }

            comments.splice(comIndex, 1)
            return comments[comIndex]
        },
        deleteAllComments: () => {
            const commentListLenght = comments.length
            comments.splice(0, commentListLenght)
            return { deletedItems: commentListLenght }
        },
    },

    Query: {

        users: () => users,
        user: (parent, args) => users.find(user => user.id === args.id),

        posts: () => posts,
        post: (parent, args) => posts.find((post) => post.id === args.id),

        comments: () => comments,
        comment: (parent, args) => comments.find((comment) => comment.id === args.id),
    },

    User: {
        posts: (parent, args) => {
            const getPosts = posts.filter((post) => post.user_id === parent.id)
            return getPosts
        },
        comments: (parent, args) => {
            const getComment = comments.filter((comment) => comment.user_id === parent.id)
            return getComment
        },
    },

    Post: {
        user: (parent, args) => {
            const getUser = users.find((user) => user.id === parent.user_id)
            return getUser
        },
        comments: (parent, args) => {
            const getComments = comments.filter((comment) => comment.post_id === parent.id)
            return getComments
        }
    },

    Comment: {
        user: (parent, args) => {
            const getUser = users.find((user) => user.id === parent.user_id)
            return getUser
        },
        post: (parent, args) => {
            const getPost = posts.filter((post) => post.id === parent.post_id)
            return getPost
        },
    },

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({}),
    ],
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});