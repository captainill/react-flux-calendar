module.exports = {
  id: 's_2',
  name: 'Afternoon',
  description: 'Afternoon recap! Perform this around dinner time.',
  questions: [

    {
      id: 'q_9',
      type: 'likert',
      required: true,
      body: 'How much energy do you have?',
      choices: [
        {
          id:'c_20',
          text: 'none'
        },
        {
          id:'c_21',
          text: 'alittle'
        },
        {
          id:'c_22',
          text: 'average'
        },   
        {
          id:'c_23',
          text: 'a bit'
        },
        {
          id:'c_24',
          text: 'a ton!'
        }          
      ]
    },      

    {
      id: 'q_10',
      type: 'likert',
      required: true,
      body: 'How motivated to you feel?',
      choices: [
        {
          id:'c_25',
          text: 'not at all'
        },
        {
          id:'c_26',
          text: 'below average'
        },
        {
          id:'c_27',
          text: 'average'
        },   
        {
          id:'c_28',
          text: 'somewhat'
        },
        {
          id:'c_29',
          text: 'very!'
        }          
      ]
    },

    {
      id: 'q_11',
      type: 'yes_no',
      required: true,
      body: 'Have you had an coffee?',
      choices: [
        {
          id:'c_30',
          text: 'yes'
        },
        {
          id:'c_31',
          text: 'no'
        }
      ] 
    },

    {
      id: 'q_12',
      type: 'open',
      required: true,
      body: 'What did you have for lunch?'
    }, 

    {
      id: 'q_13',
      type: 'open',
      required: false,
      body: 'Anything else to report this afternoon?'
    }            

  ]
}