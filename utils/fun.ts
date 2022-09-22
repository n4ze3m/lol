export const questionsList = [
    'tell me something about yourself',
    'tell me your crush',
    'tell me your biggest fear',
    'tell me your biggest regret',
    'tell me your biggest secret, no one will know',
    'what is your biggest insecurity',
    'what is your biggest pet peeve',
    'what is your biggest turn on',
    'fantasy about me',
    'favorite thing about me',
    'Send me anonymous message!'
]

export const answerList = [
    "I don't know",
    "I don't care",
    "I don't want to talk about it",
    'Maybe',
    'Yes',
    'No',
    'I am not sure',
    'Lmao',
    'Lol',
    'Haha',
    'Hahaha',
    'Hahahaha',
    'Ok then',
    'So you are saying',
    'I am not sure what you are saying',
    'I am not sure what you are talking about',
    'I love pasta',
    'I love pizza',
    'I love burgers',
    'I love ice cream',
    'I hate pasta',
    'I hate pizza',
]

export const emailSubjectList = [
    'Knock Knock',
    'Someone sent you a message',
    'Someone sent you a secret',
    'Hey, I have a secret for you',
    'Hey, I have a message for you',
]

export const randomQuestion = () => {
    return questionsList[Math.floor(Math.random() * questionsList.length)]
}

export const randomAnswer = () => {
    return answerList[Math.floor(Math.random() * answerList.length)]
}

export const randomEmailSubject = () => {
    return emailSubjectList[Math.floor(Math.random() * emailSubjectList.length)]
}