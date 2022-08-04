const users = [
    {
        id: "1",
        fullName: "Emirhan Sevinç",
        age: 18
    },
    {
        id: "2",
        fullName: "Ethem Özdemir",
        age: 19
    },
]

const posts = [
    {
        id: "1",
        title: "Emirhan'ın gönderisi 1",
        user_id: "1"
    },
    {
        id: "2",
        title: "Emirhan'ın gönderisi 2",
        user_id: "1"
    },
    {
        id: "3",
        title: "Ethem'in gönderisi",
        user_id: "2"
    },
]

const comments = [
    {
        id: "1",
        text: "Text 1",
        post_id: "1",
        user_id: "2"
    },
    {
        id: "2",
        text: "Text 2",
        post_id: "1",
        user_id: "1"
    },
    {
        id: "3",
        text: "Text 3",
        post_id: "2",
        user_id: "2"
    },
    {
        id: "4",
        text: "Text 4",
        post_id: "3",
        user_id: "1"
    },
]

module.exports = {
    users,
    posts,
    comments
}