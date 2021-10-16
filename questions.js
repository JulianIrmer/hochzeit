module.exports = [
    {
      type: 'input',
      name: 'year',
      message: "What year?"
    },
    {
      type: 'input',
      name: 'month',
      message: "What month?"
    },
    {
      type: 'input',
      name: 'day',
      message: "What day?"
    },
    {
      type: 'input',
      name: 'hour',
      message: "What hour?"
    },
    {
      type: 'input',
      name: 'bride',
      message: "Bride's name?"
    },
    {
      type: 'input',
      name: 'groom',
      message: "Groom's name?"
    },
    {
      type: 'input',
      name: 'bodyBackgroundColor',
      message: "What background color do you want?",
      default: 'rgb(211, 211, 211)'
    },
    {
      type: 'input',
      name: 'contentBackgroundColor',
      message: "What content background color do you want?",
      default: '#a08a71'
    },
    {
      type: 'input',
      name: 'box1backgroundColor',
      message: "First Box background color?",
      default: '#FAEBD7'
    },
    {
      type: 'input',
      name: 'box1fontColor',
      message: "First Box font color?",
      default: 'black'
    },
    {
      type: 'input',
      name: 'box2backgroundColor',
      message: "Second Box background color?",
      default: '#cdb8e0'
    },
    {
      type: 'input',
      name: 'box2fontColor',
      message: "Second Box font color?",
      default: 'black'
    },
    {
      type: 'list',
      name: 'boxPattern',
      message: "Box Pattern?",
      choices: [
            'doubleBubble', 
            'geometricLeaves', 
            'herrigbone', 
            'interlaced', 
            'moroccanFlower', 
            'niceSnow', 
            'pixelHeart'
        ],
        default: 'interlaced'
    },
    {
      type: 'list',
      name: 'headlineFont',
      message: "Headline Font?",
      choices: ['DancingScript', 'Biloxi', 'Amantic'],
      default: 'DancingScript'
    },
    {
      type: 'list',
      name: 'subheadlineFont',
      message: "Subheadline Font?",
      choices: ['DancingScript', 'Biloxi', 'Amantic'],
      default: 'Amantic'
    },
    {
      type: 'list',
      name: 'textFont',
      message: "Text Font?",
      choices: ['DancingScript', 'Biloxi', 'Amantic'],
      default: 'Amantic'
    },
    {
      type: 'input',
      name: 'weddingID',
      message: "Enter weddingID",
    }
]