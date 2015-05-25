module.exports = {
  id: 's_1',
  name: 'Morning',
  description: 'Morning recap? Perform right as you start work for the day.',
  questions: [
    {
      id: 'q_1',
      type: 'multiple',
      required: true,
      body: 'What time did you go to sleep last night?',
      choices: [
        {
          id:'c_1',
          text: 'Before 11pm'
        },
        {
          id:'c_2',
          text: '11pm'
        },
        {
          id:'c_3',
          text: '12pm'
        },   
        {
          id:'c_4',
          text: '1am'
        },
        {
          id:'c_5',
          text: 'after 1am'
        }          
      ]
    },

    {
      id: 'q_2',
      type: 'likert',
      required: true,
      body: 'How well did you sleep last night?',
      choices: [
        {
          id:'c_6',
          text: 'really poorly'
        },
        {
          id:'c_7',
          text: 'poorly'
        },
        {
          id:'c_8',
          text: 'average'
        },   
        {
          id:'c_9',
          text: 'well'
        },
        {
          id:'c_10',
          text: 'very well'
        }          
      ]
    },      

    {
      id: 'q_3',
      type: 'likert',
      required: true,
      body: 'How motivated to you feel?',
      choices: [
        {
          id:'c_11',
          text: 'not at all'
        },
        {
          id:'c_12',
          text: 'below average'
        },
        {
          id:'c_13',
          text: 'average'
        },   
        {
          id:'c_14',
          text: 'somewhat'
        },
        {
          id:'c_15',
          text: 'very!'
        }          
      ]
    },

    {
      id: 'q_4',
      type: 'yes_no',
      required: true,
      body: 'Bowel movement?',
      choices: [
        {
          id:'c_16',
          text: 'yes'
        },
        {
          id:'c_17',
          text: 'no'
        }
      ]      
    },

    {
      id: 'q_5',
      type: 'yes_no',
      required: true,
      body: 'Did you meditate?',
      choices: [
        {
          id:'c_18',
          text: 'yes'
        },
        {
          id:'c_19',
          text: 'no'
        }
      ]            
    }, 

    {
      id: 'q_6',
      type: 'open',
      required: false,
      body: 'If you meditated how long did you meditate for?'
    }, 

    {
      id: 'q_7',
      type: 'open',
      required: true,
      body: 'What did you have for breakfast?'
    }, 

    {
      id: 'q_8',
      type: 'open',
      required: false,
      body: 'Anything else to report this morning?'
    }            

  ]
}