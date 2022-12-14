# React-Dynamic-Form

We all know forms are a nightmare in React. This repo helps to solve this by implementing a form that gets dynamically generated using an array. 

You simply add your questions to the array and they get dynamically populated into a form. What's more, you can set questions that only show based on the answers of their parents. If a user selects one answer for a parent question and then later decides to change it, all child questions that depended on the now inactive parent will disappear. Likewise, the variables that held their answers will be automatically cleared from state.
